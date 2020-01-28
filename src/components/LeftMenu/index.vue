<template lang="pug">
  aside
    Title
    Profile(v-if="this.getUserProfile.name !== '...'" :userProfile="this.getUserProfile")
    Loader(v-else)
    div.aside-tasks.aside-padding
      Task(@click.native="incrementCompletedTasks"
        :title="'Completed Tasks'"
        :count="completedTask")
      Task(@click.native="redirectToTasks"
        :title="'Open Tasks'" :count="openTask")
    Menu
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Title from '@/components/LeftMenu/Title.vue';
import Loader from '@/components/Loader.vue';
import Profile from '@/components/LeftMenu/Profile.vue';
import Task from '@/components/LeftMenu/Task.vue';
import Menu from '@/components/LeftMenu/Menu.vue';
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

export default class LeftMenu extends Vue {
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
      this.openTask -= 1;
    }
    this.completedTask += 1;
  }

  redirectToTasks() {
    if (this.openTask === 0) {
      console.log('No open tasks!');
      return;
    }
    this.$router.push('/tasks').catch((err) => {});
  }
}
</script>

<style lang="less" scoped>
@import "../../constants.less";

aside {
  width: 270px;
  min-width: 270px;
  background-color: @aside-background-color;
  display: flex;
  @media screen and (max-width: 800px) {
    display: none;
  }
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
