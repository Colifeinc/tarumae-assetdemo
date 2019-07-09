
import Tarumae, { Vec3, Color3 } from "tarumae-viewer"

function initViewer(models) {
  const renderer = new Tarumae.Renderer({
    enableShadow: true,
    shadowQuality: {
      scale: 2,
      viewDepth: 2,
      resolution: 4096,
    },
    bloomEffect: {
      threshold: 0.25,
      gamma: 1.6,
    },
    postprocess: {
      gamma: 1.0,
    },
  });

  const scene = renderer.createScene();


  
  const ground = {
    mesh: new Tarumae.Shapes.PlaneMesh(3, 3),
    mat: {
      color: [1, 1, 1],
      //tex: "../static/textures/bg-gray-gradient.jpg"
    },
    angle: [0, 30, 0],
  };
  scene.load(ground);

  const holder = new Tarumae.SceneObject();
  scene.add(holder);

  scene.onkeydown = function(key) {
    if (key >= Tarumae.Viewer.Keys.D1
      && key <= Tarumae.Viewer.Keys.D9) {
      switchTo(key - Tarumae.Viewer.Keys.D1);
    }
  };

  let firstObject = true;
  let currentIndex = -1;

  for (const [i, mod] of models.entries()) {
      
    scene.createObjectFromURL("../models/" + mod.name + ".toba", obj => {
      mod.obj = obj;
      obj.location.x = 5;
      obj.visible = false;
      ground.add(obj);

      if (firstObject) {
        switchTo(i);
        firstObject = false;
      }
    });
  }

  function switchTo(idx) {
    if (idx === currentIndex) return;
      
    if (currentIndex !== -1) {
      const mod = models[currentIndex];
      if (mod) {
        const prevObj = models[currentIndex].obj;
        scene.animate({}, t => {
          prevObj.location.x = -3 * t;
          prevObj.opacity = 1 - t;
        }, _ => prevObj.visible = false);
      }
    }

    currentIndex = idx;

    const mod = models[currentIndex];
    if (mod && mod.obj) {
      const nextObj = mod.obj;
      if (mod.color) {
        if (!nextObj.mat) nextObj.mat = {}
        nextObj.mat.color = mod.color;
      }
      if (mod.scale) {
        nextObj.scale.set(mod.scale[0], mod.scale[1], mod.scale[2]);
      }
      window.obj = nextObj;
      if (window.refmap) window.setObjectRefmap(window.obj);
          
      nextObj.visible = true;
      scene.animate({ effect: "fadein", duration: 0.5 }, t => {
        nextObj.location.x = 3 * (1 - t);
        nextObj.opacity = t;
      });
      scene.animate({ effect: "fadeout" }, t => {
        // nextObj.angle.y = -(1 - t) * 500 + 25;
      });
    }
  }

  scene.mainCamera.location.set(0, 0.95, 2);
  scene.mainCamera.angle.set(-15, 0, 0);
    
  // light sources

  const lights = new Tarumae.SceneObject();

  const light1 = new Tarumae.PointLight();
  light1.location.set(-3, 4, 2);
  light1.mat.emission = 3;
  lights.add(light1);
      
  const light2 = new Tarumae.PointLight();
  light2.location.set(2, 3, 5);
  light2.mat.emission = 3;
  lights.add(light2);

  const light3 = new Tarumae.PointLight();
  light3.location.set(2, 4, -5);
  light3.mat.emission = 2;
  lights.add(light3);

  const light4 = new Tarumae.PointLight();
  light4.location.set(-3, 6, -4);
  light4.mat.emission = 2;
  lights.add(light4);

  scene.add(lights);

  scene.sun.mat.color = [0.45, 0.45, 0.45];

  // new Tarumae.TouchController(scene);
  const objController = new Tarumae.ObjectViewController(scene, {
    enableVerticalRotation: true,
    minVerticalRotateAngle: -10,
    maxVerticalRotateAngle: 50,
  });
  objController.object = ground;

  const cubebox = new Tarumae.ImageCubeBox(renderer, [
    "../textures/office-cubemap/px.jpg",
    "../textures/office-cubemap/nx.jpg",
    "../textures/office-cubemap/py.jpg",
    "../textures/office-cubemap/ny.jpg",
    "../textures/office-cubemap/pz.jpg",
    "../textures/office-cubemap/nz.jpg",
  ]);
      
  window.setObjectRefmap = (obj) => {
    obj.eachChild(c => c.meshes[0]._refmap = window.refmap);
  };

  cubebox.on('load', _ => {
    window.refmap = cubebox.cubemap;
    if (window.obj) {
      window.setObjectRefmap(window.obj);
      ground.meshes[0]._refmap = window.refmap;
    }
  });

  scene.show();
}

export default initViewer;