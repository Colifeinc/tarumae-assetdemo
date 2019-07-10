<template>
  <div class="color-picker">
    <div class="form__field">
      <div class="form__label">
        <swatches v-model="color" inline background-color="rgba(0, 0, 0, 0)" @input="$emit('color-selected', color)"></swatches>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Swatches from 'vue-swatches'

// Import the styles too, globally
import "vue-swatches/dist/vue-swatches.min.css"


export default {
  components: { Swatches },
  name: 'ColorPicker',
  props: {
  },
  data () {
    return {
      color: '#1CA085'
    }
  },
  computed: {
  },
  mounted: function () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
