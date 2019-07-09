<template>
  <div class="hello">
    <div id="canvas-container"></div>

    <ul id="asset-list-panel">
      <li v-for="item in models">
        <AssetButton :name="item.name"/>
      </li>
    </ul>

  </div>
</template>

<script>
/* eslint-disable */

import AssetButton from './AssetButton.vue'
import initViewer from '../viewer';

export default {
  name: 'HelloWorld',
  components: {
    AssetButton
  },
  props: {
  },
  data: function() {
    return {
      models: [
        { name: "KF-577JB-ZT" },
        { name: "KF-835GC-ZT" },
        { name: "KG-177JB-W9" },
        { name: "KG-367JB-ZW" },
      ]
    }
  },
  computed: {
    
  },
  mounted: function () {
    initViewer(this.models);
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
  padding: 20px;
  margin: 0;
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: rgba(100, 100, 100, 0.3);
}

#asset-list-panel li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

</style>
