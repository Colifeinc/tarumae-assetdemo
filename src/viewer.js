
import Tarumae, { Vec3, Color3 } from "tarumae-viewer"
import { hexToRgb } from "./utility"

export default class ModelViewer {
  constructor(models) {
    this.models = models;
    this.firstObject = true;
    this.currentIndex = -1;

    this.init();
  }

  init() {
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
    this.renderer = renderer;
  
    const scene = renderer.createScene();
    this.scene = scene;
    window._scene = scene;
    
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
        this.switchTo(key - Tarumae.Viewer.Keys.D1);
      }
    };
  
    const models = this.models;
    for (const [i, mod] of models.entries()) {
        
      scene.createObjectFromURL("../models/" + mod.name + ".toba", obj => {
        mod.obj = obj;
        // obj.location.x = 5;
        obj.visible = false;
        ground.add(obj);
  
        if (this.firstObject) {
          this.switchTo(i);
          this.firstObject = false;
        }
      });
    }
  
    scene.mainCamera.location.set(-0.05, 0.95, 2);
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
          
    cubebox.on('load', _ => {
      window.refmap = cubebox.cubemap;
      if (window.obj) {
        this.setObjectRefmap(window.obj);
        ground.meshes[0]._refmap = window.refmap;
      }
    });
  }

  setObjectRefmap (obj) {
    obj.eachChild(c => c.meshes[0]._refmap = window.refmap);
  }
  
  show() {
    this.scene.show();
  }

  switchTo(idx) {
    if (idx === this.currentIndex) return;
      
    if (this.currentIndex !== -1) {
      const mod = this.models[this.currentIndex];
      if (mod) {
        const prevObj = this.models[this.currentIndex].obj;
        this.scene.animate({ duration: 0.2 }, t => {
          const s = (0.9 - t);
          prevObj.scale.set(s, s, s);
          // prevObj.opacity = 1 - t;
        }, _ => prevObj.visible = false);
      }
    }
  
    this.currentIndex = idx;
  
    const mod = this.models[this.currentIndex];
    if (mod && mod.obj) {
      const nextObj = mod.obj;
      
      // if (mod.scale) {
      //   nextObj.scale.set(mod.scale[0], mod.scale[1], mod.scale[2]);
      // }
      window.obj = nextObj;

      if (mod.color && !mod.shown) {
        this.setColor(mod.color);
        mod.shown = true;
      }

      if (window.refmap) this.setObjectRefmap(window.obj);
          
      nextObj.visible = true;
      this.scene.animate({ effect: "fadein", duration: 0.2 }, t => {
        const s = t;
        obj.scale.set(s, s, s);
        // nextObj.opacity = t;
      });
      this.scene.animate({ effect: "fadeout" }, t => {
        // nextObj.angle.y = -(1 - t) * 500 + 25;
      });
    }
  }

  setColor(color) {
    const c = hexToRgb(color);
    const c3 = new Color3(c.r / 255, c.g / 255, c.b / 255);

    window.obj.eachChild(o => {
      if (o.mat.name === "cloth" || o.mat.name.endsWith("_change")) {
        o.mat.color = c3;
      }
    });

    this.scene.requireUpdateFrame();
  }
}
