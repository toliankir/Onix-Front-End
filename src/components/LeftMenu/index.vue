<template lang="pug">
  aside(:class="{'small-display-show': show}")
    Title
    Profile(v-if="this.getUserProfile.name !== '...'" :userProfile="this.getUserProfile")
    Loader(v-else)
    div.aside-tasks.aside-padding
      Task(@click.native="incrementCompletedTasks"
        :title="'Completed Tasks'"
        :count="completedTask")
      Task(@click.native="redirectToTasks"
        :title="'Open Tasks'" :count="openTask")
    Menu(@hide="$emit('hide')")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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

  @Prop() show!: boolean;

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
  @media @md {
    width: 200px;
    min-width: 200px;
  }
  background-color: @aside-background-color;
  display: flex;
  flex-direction: column;
  @media @sm {
    display: none;
  }
}

.small-display-show {
  @media @sm {
    position: absolute;
    z-index: 999;
    height: 100vh;
    width: 80vw;
    display: block;
  }
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
