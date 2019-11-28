<template lang="pug">
  aside
    Title
    Profile
    Tasks
    Menu
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/aside/Title.vue';
import Profile from '@/aside/Profile.vue';
import Tasks from '@/aside/Tasks.vue';
import Menu from '@/aside/Menu.vue';

@Component({
  components: {
    Title,
    Profile,
    Tasks,
    Menu,
  },
})

export default class Aside extends Vue {}
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
