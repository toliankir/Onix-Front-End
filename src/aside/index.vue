<template lang="pug">
  aside
    Title
    Profile(v-if="this.getUserProfile.name !== '...'" :userProfile="this.getUserProfile")
    Loader(v-else)
    div.aside-tasks.aside-padding
      Task(@click.native="incrementCompletedTasks"
        :title="'Completed Tasks'"
        :count="completedTask")
      Task(:title="'Open Tasks'" :count="openTask")
    Menu
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Title from '@/aside/Title.vue';
import Loader from '@/aside/Loader.vue';
import Profile from '@/aside/Profile.vue';
import Task from '@/aside/Task.vue';
import Menu from '@/aside/Menu.vue';
import { UserProfile } from '@/types';

@Component({
  components: {
    Title,
    Profile,
    Loader,
    Task,
    Menu,
  },
})

export default class Aside extends Vue {
  @Getter getUserProfile!: UserProfile;

  @Action('fetchCurrentUser') fetchCurrentUser: any;

  mounted() {
    this.fetchCurrentUser();
  }

  private openTask: number = 22;

  private completedTask: number = 3;

  private modalText: string = 'Are you sure you want to change the number of tasks?';

  incrementCompletedTasks() {
    if (!confirm(this.modalText)) {  // eslint-disable-line
      return;
    }
    if (this.openTask !== 0) {
      this.openTask = this.openTask - 1;
    }
    this.completedTask = this.completedTask + 1;
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";
.red {
  color: red;
}
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
.aside-tasks {
  margin: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;
}
</style>
