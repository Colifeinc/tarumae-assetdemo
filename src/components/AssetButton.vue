<template>
  <div class="asset-button">
    {{name}}
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
  background: silver;
  border: none;
  height: 100%;
  display: inline-block;
}

</style>
