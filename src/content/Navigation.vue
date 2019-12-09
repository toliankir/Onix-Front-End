<template lang="pug">
  nav
    router-link(to="/tasks") Tasks
    router-link(to="/kanban") Kanban
    router-link(to="/activity") Activity
    router-link(to="/calendar") Calendar
    router-link(to="/files") Files
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  link: string = '';

  mounted() {
    this.link = this.$router.currentRoute.name ? this.$router.currentRoute.name : '';
  }

  setLink() {
    this.link = this.$router.currentRoute.name ? this.$router.currentRoute.name : '';
  }

  routeCompare(compareRouter: string) {
    return this.link === compareRouter;
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

nav {
  padding-left: 2.5rem;
}
nav a {
  color: #5a5a5a;
  font-size: 16px;
  text-decoration: none;
  margin-right: 30px;
  border-bottom: 2px solid white;
  display: inline-block;
  padding-bottom: 14px;
}
.router-link-active {
  color: #000000;
  border-bottom: 2px solid @nav-active-line-color;
}
nav a:hover {
  color: #000000;
  border-bottom: 2px solid @nav-active-line-color;
}
</style>
