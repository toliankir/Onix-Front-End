<template lang="pug">
  div.aside-tasks.aside-padding
    Task(@click.native="incrementCompletedTasks"
      :title="'Completed Tasks'"
      :count="completedTask")
    Task(:title="'Open Tasks'" :count="openTask")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Task from '@/aside/Task.vue';

@Component({
  components: {
    Task,
  },
})
export default class Tasks extends Vue {
  private openTask: number = 22;

  private completedTask: number = 3;

  private modalText: string = 'Are you sure you want to change the number of tasks?';

  incrementCompletedTasks() {
    if (!confirm(this.modalText)) {
      return;
    }
    if (this.openTask !== 0) {
      this.openTask = this.openTask - 1;
    }
    this.completedTask = this.completedTask + 1;
  }
}
</script>

<style scoped>
.aside-tasks {
  margin: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;
}
</style>
