<template>
  <div class="hello">
    <div id="canvas-container"></div>
    
    <ul id="asset-list-panel">
      <li v-for="(item, index) in models">
        <AssetButton :name="item.name" 
          @asset-selected="viewer.switchTo(index)"/>
      </li>
    </ul>

    <div id="control-panel">
      <ColorPicker @color-selected="viewer.setColor(arguments[0])"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import AssetButton from './AssetButton.vue'
import ColorPicker from './ColorPicker.vue'
import ModelViewer from "../viewer"

export default {
  name: 'Index',
  components: {
    ColorPicker,
    AssetButton
  },
  props: {
  },
  data: function() {
    return {
      models: [
        { name: "KF-577JB-ZT", color: "#a31f52" },
        { name: "KF-835GC-ZT", color: "#57b6d9" },
        { name: "KG-177JB-W9", color: "#a31f52" },
        { name: "KG-367JB-ZW", color: "#cca770" },
      ],
      viewer: null,
    }
  },
  computed: {
    
  },
  mounted: function () {
    this.viewer = new ModelViewer(this.models);
    this.viewer.show();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#canvas-container {
  width: 100%;
  height: 100vh;
}

#asset-list-panel {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 10em;
  background-color: rgba(100, 100, 100, 0.3);
  z-index: 10;
}

#asset-list-panel li {
  list-style-type: none;
  padding: auto;
  margin-top: auto;
  margin-bottom: auto;
  height: 10em;
}

#control-panel {
  position: absolute;
  bottom: 0;
  left: 10em;
  padding: 20px;
  margin: 0px;
  z-index: 20;
}

</style>
