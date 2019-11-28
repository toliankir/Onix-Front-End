<template lang="pug">
  nav.aside-nav.aside-padding
    p MENU
    router-link(to="/") Home
    a(href="#") My Tasks
    a(href="#") Notifications
      span {{this.notifyCount}}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Menu extends Vue {
  notifyCount: Number = 3;

  mounted() {
    this.$root.$on('set-notify-counter', (data: Number) => {
      this.notifyCount = data;
    });
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

.aside-nav {
  display: flex;
  flex-direction: column;
}
.aside-nav p {
  margin: 8px 0;
  color: @aside-secondary-text-color;
  font-size: 12px;
  line-height: 22px;
}
.aside-nav a {
  margin: 8px 0;
  color: @aside-main-text-main-color;
  font-size: 14px;
  line-height: 22px;
  text-decoration: none;
}
.aside-nav a span {
  display: inline-block;
  margin-left: 9px;
  font-size: 13px;
  line-height: 20px;
  color: @aside-background-color;
  background-color: @nav-active-line-color;
  height: 20px;
  width: 20px;
  text-indent: -1px;
  text-align: center;
  border-radius: 50%;
}
</style>
