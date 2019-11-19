<template>
  <aside>
    <Title />
    <Profile />
    <Tasks />
    <Menu />
  </aside>
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

<style scoped>
aside {
  width: 270px;
  min-width: 270px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
}
.aside-padding {
  padding-left: 30px;
}
</style>