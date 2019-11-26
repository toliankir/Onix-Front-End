<template lang="pug">
  aside
    Title
    Profile
    Tasks
    Menu
</template>

<script>
import Title from "@/aside/Title.vue";
import Profile from "@/aside/Profile.vue";
import Tasks from "@/aside/Tasks.vue";
import Menu from "@/aside/Menu.vue";

export default {
  name: "Aside",
  components: {
    Title,
    Profile,
    Tasks,
    Menu
  }
};
</script>

<style lang="less" scoped>
@import "../constants.less";
aside {
  width: 270px;
  min-width: 270px;
  background-color: @aside-background-color;
  display: flex;
  flex-direction: column;
}
.aside-padding {
  padding-left: 30px;
}
</style>