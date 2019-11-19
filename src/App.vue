<template>
  <div id="app">
    <Aside />
  </div>
</template>

<script>
import Aside from "@/aside";
export default {
  name: "app",
  components: {
    Aside
  }
};
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  min-height: 100vh;
  display: flex;
}
</style>
