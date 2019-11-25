<template lang="pug">
  nav.aside-nav.aside-padding
    p MENU
    a(href="#") Home
    a(href="#") My Tasks
    a(href="#") Notifications
      span {{notify_count}}
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      notify_count: 3
    }
  },
  mounted(){
    this.$root.$on("set-notify-counter", (data) => {
      this.notify_count = data;
    });
  }
}
</script>

<style scoped>
.aside-nav {
  display: flex;
  flex-direction: column;
}
.aside-nav p {
  margin: 8px 0;
  color: #9b9b9b;
  font-size: 12px;
  line-height: 22px;
}
.aside-nav a {
  margin: 8px 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  text-decoration: none;
}
.aside-nav a span {
  display: inline-block;
  margin-left: 9px;
  font-size: 13px;
  line-height: 20px;
  color: #000000;
  background-color: #ffc200;
  height: 20px;
  width: 20px;
  text-indent: -1px;
  text-align: center;
  border-radius: 50%;
}
</style>