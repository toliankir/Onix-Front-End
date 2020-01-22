<template lang="pug">
  div
    div(v-if="task")
      p {{task.title}}
      p {{task.description}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import randomTasks from '@/service/randomTasks';
import { Task } from '@/types';

@Component
export default class TaskDetailsVuew extends Vue {
  tasks: Task[] = [];

  @Prop() taskId!: string;

  get task(): Task | undefined {
    return this.tasks.find(el => el.id === this.taskId);
  }

  async created() {
    this.tasks = await randomTasks.getRandomTasks();
  }
}
</script>

<style lang="less" scoped>

</style>
