<template lang="pug">
  form
    p.title Add new task
      p
        span Task title:
        input(
          placeholder="Task title. Required."
          :class="[taskTitleOk ? '' : 'input-warning']"
          @input="taskTitleCheck"
          v-model="taskTitle"
          )
      p
        span Task description:
        input(
          placeholder="Task description. Required."
          @input="taskDescriptionCheck"
          :class="[taskDescOk ? '' : 'input-warning']"
          v-model="taskDesc"
          )
      p.action
        button.btn(
          :class="[allRequiredDataEntered ? 'btn-yellow' : 'btn-grey']"
          @click.prevent="addTaskToArray") Add
        button.btn.btn-red(@click.prevent="$emit('close')") Close
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import randomTasks from '@/service/randomTasks';
import { Task, TaskStatus } from '@/types';

@Component
export default class AddTask extends Vue {
  tasks:Task[] = [];

  taskTitle = '';

  taskDesc = '';

  taskTitleOk = true;

  taskDescOk = true;

  taskTitleCheck() {
    this.taskTitleOk = this.taskTitle.length > 0;
  }

  taskDescriptionCheck() {
    this.taskDescOk = this.taskDesc.length > 0;
  }

  get allRequiredDataEntered() {
    return (this.taskTitle.length !== 0 && this.taskDesc.length !== 0);
  }

  async addTaskToArray() {
    if (!this.allRequiredDataEntered) {
      return;
    }
    randomTasks.addTask(this.taskTitle, this.taskDesc);
    this.$emit('close');
  }
}
</script>

<style lang="less" scoped>
form {
  & p {
    &.title {
      font-size: 14px;
      font-weight: bold;
    }
    &.action {
      text-align: center;
      display: flex;
    }
    & span {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 120px;
    }
  }
  & input {
    outline: none;
    &::placeholder {
      font-size: 12px;
    }
  }
}
</style>
