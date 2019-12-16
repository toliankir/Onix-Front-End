<template lang="pug">
  div
    h4 Tasks
    Loader(v-if="this.tasks.length === 0")
    table(v-else)
      thead
        tr
          td Title
          td Description
          td(class="center-text") Time
          td(class="center-text") Action
      tbody
        tr(v-for="(task, index) of tasks" :key="index")
          td(class="title") {{task.title}}
          td {{task.description}}
          td(class="center-text") {{task.date}}
          td(class="action center-text")
            i(@click="deleteTaskFromArray(task.id)" class="fas fa-trash-alt" title="Delete")
    form
      p.title Add new task
      p
        span Task title:
        input(placeholder="Task title. Required." v-model="taskTitle")
      p
        span Task description:
        input(placeholder="Task description. Required." v-model="taskDescription")
      p.action
        button(
          class="btn"
          :class="[allRequiredDataEntered ? 'btn-yellow' : 'btn-grey']"
          @click.prevent="addTaskToArray") Add
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Loader from '@/aside/Loader.vue';
import { randomTasks, getUnixTimeStamp } from '@/service/randomTasks';
import { Task } from '@/types';

@Component({
  components: {
    Loader,
  },
})
export default class Tasks extends Vue {
  public taskTitle: string = '';

  public taskDescription: string = '';

  private tasks:Task[] = [];

  get allRequiredDataEntered() {
    return (this.taskTitle.length !== 0 && this.taskDescription.length !== 0);
  }

  addTaskToArray() {
    if (!this.allRequiredDataEntered) {
      return;
    }
    const newTask: Task = {
      id: (parseInt(this.getLastTaskId(), 10) + 1).toString(),
      title: this.taskTitle,
      description: this.taskDescription,
      date: getUnixTimeStamp(),
    };
    this.tasks.push(newTask);
  }

  getLastTaskId(): string {
    return this.tasks[this.tasks.length - 1].id;
  }

  deleteTaskFromArray(id: string) {
    this.tasks = this.tasks.filter((task: Task) => (task.id !== id));
  }

  async created() {
    try {
      this.tasks = await randomTasks.getRandomTasks(Math.floor(Math.random() * 10));
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

form {
  & p {
    &.title {
      font-size: 14px;
      font-weight: bold;
    }
    &.action {
      text-align: center;
    }
    & span {
      font-size: 14px;
      display: inline-block;
      width: 120px;
    }
  }
  & input {
    &::placeholder {
      font-size: 12px;
    }
  }
}

table {
  width: 100%;
  border-spacing: 0;
  line-height: 25px;

  & tr:nth-child(2n) {
    background-color: @btn-dark-grey-color;
  }

  & thead td {
    font-size: 13px;
    font-weight: bold;
    border-bottom: 2px solid @nav-active-line-color;
  }

  & .center-text {
    text-align: center;
  }

  & tbody td {
    font-size: 12px;
    &.title {
      font-weight: bold;
    }
    &.action {
      & i {
        color: @nav-active-line-color;
        font-weight: 400;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
