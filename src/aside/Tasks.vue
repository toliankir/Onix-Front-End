<template lang="pug">
  div.aside-tasks.aside-padding
    Task(@click.native="incrementCompletedTasks"
      :title="'Completed Tasks'"
      :count="completedTask")
    Task(:title="'Open Tasks'" :count="openTask")
</template>

<script>
import Task from '@/aside/Task.vue';

export default {
  name: 'Tasks',
  components: {
    Task
  },
  data() {
    return {
      openTask: 22,
      completedTask: 3,
      modalText: 'Are you sure you want to change the number of tasks?'
    };
  },
  methods: {
    incrementCompletedTasks() {
      if (!confirm(this.modalText)) {
        return;
      }
      if (this.openTask !== 0) {
        this.openTask = this.openTask - 1;
      }
      this.completedTask = this.completedTask + 1;
    },
  },
};
</script>

<style scoped>
.aside-tasks {
  margin: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;
}
</style>
