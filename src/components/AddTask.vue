<template lang="pug">
  form
    p.title Add new task
      p
        span(
          :class="[(this.taskTitle.length === 0 && this.taskTitleChange) ? 'input-warning' : '']"
          ) Task title:
        input(placeholder="Task title. Required." v-model="taskTitle")
      p
        span(
          :class="[(this.taskDesc.length === 0 && this.taskDescChange) ? 'input-warning' : '']"
        ) Task description:
        input(placeholder="Task description. Required." v-model="taskDesc")
      p.action
        button(
          class="btn"
          :class="[allRequiredDataEntered ? 'btn-yellow' : 'btn-grey']"
          @click.prevent="addTaskToArray") Add
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import randomTasks from '@/service/randomTasks';
import { Task, TaskStatus } from '@/types';
import { getUnixTimeStamp } from '@/service/helper';

@Component
export default class AddTask extends Vue {
  tasks:Task[] = [];

  taskTitle: string = '';

  taskDesc: string = '';

  taskTitleChange: boolean = false;

  taskDescChange: boolean = false;

  @Watch('taskTitle')
  onTaskTitleChanged(value: string, oldValue: string) {
    this.taskTitleChange = true;
  }

  @Watch('taskDescription')
  onTaskDescriptionChanged(value: string, oldValue: string) {
    this.taskDescChange = true;
  }

  get allRequiredDataEntered() {
    return (this.taskTitle.length !== 0 && this.taskDesc.length !== 0);
  }

  async addTaskToArray() {
    if (!this.allRequiredDataEntered) {
      return;
    }
    randomTasks.addTask(this.taskTitle, this.taskDesc);
  }
}
</script>

<style lang="less" scoped>

</style>
