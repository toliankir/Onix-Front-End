<template lang="pug">
  nav
    router-link(to="/tasks") Tasks
    a(href="#") Kanban
    a(href="#") Activity
    a(href="#") Calendar
    a(href="#") Files
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {}
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
nav a:hover {
  color: #000000;
  border-bottom: 2px solid @nav-active-line-color;
}
</style>
