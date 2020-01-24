<template>
  <div class="asset-button" v-on:click="$emit('asset-selected')">
    <img :src="'../previews/256/' + name + '.png'"/>
    <div class="title">{{name}}</div>
  </div>
</template>


<script>
/* eslint-disable */

export default {
  name: 'AssetButton',
  props: {
    name: "",
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.asset-button {
  text-align: center;
  padding: auto;
  cursor: pointer;
}

.asset-button:hover {
  background-color: #a0a0a0;
}

.asset-button img {
  padding: 10px;
  vertical-align: middle;
  max-width: 7em;
  max-height: 7em;
}

.asset-button .title {
  width: 100%;
  color: #888;
}

</style>
