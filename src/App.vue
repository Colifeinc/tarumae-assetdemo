<template>
  <div id="app">
    <div class="logo-panel">
      <img src="../public/itoki-logo.svg"/><br/>
      POWERED BY
      <img src="../public/logo.svg" style="max-width: 10em"/>
    </div>    
    
    <Index/>
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {
  padding: 0;
  margin: 0;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  padding: 0;
  margin: 0;
}

.logo-panel {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  text-align: right;
  padding: 20px;
}

</style>
