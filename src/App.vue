<template lang="pug">
  div#app
    Aside
    Content
</template>

<script>
import Aside from "@/aside";
import Content from "@/content";

export default {
  name: "app",
  components: {
    Aside,
    Content
  }
};
</script>

<style lang="less">
@import "./constants.less"; 

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
}

.dots {
  position: absolute;
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9b9b9b;
}
.dots::before {
  position: absolute;
  left: -6px;
  top: 0;
  display: block;
  content: "";
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-color: inherit;
}
.dots::after {
  position: absolute;
  left: 6px;
  top: 0;
  display: block;
  content: "";
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-color: inherit;
}
.margin-v-15 {
  margin: 0 15px;
}

.btn {
  height: 30px;
  min-width: 30px;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 15px;
  outline: none;
  font-size: 14px;
  padding: 0 15px;
}
.btn > img {
  height: 60%;
  margin-right: 8px;
}
.btn-grey {
  background-color: #eaeaea;
  color: #000000;
}
.btn-yellow {
  background-color: #fff8dd;
  color: #ffc200;
}
</style>
