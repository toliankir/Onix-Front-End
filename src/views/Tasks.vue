<template lang="pug">
  div
    Modal(
      v-if="showModal"
      @close="showModal = false"
      :header="'Input ERROR!'"
      :body="'Fill all needed inputs!!!'"
      :footer="'push for close ->'"
      )
    h4 Tasks
    Loader(v-if="this.tasks.length === 0")
    table(v-if="this.tasks.length !== 0")
      thead
        tr
          td Title
          td Description
          td(class="center-text") Time
          td(class="center-text") Action
      transition-group(name="list" tag="tbody")
        tr(
          v-for="(task, index) of tasks"
          :key="task.id"
          :ref="'test'")
          td(class="title") {{task.title}}
          td {{task.description}}
          td(class="center-text") {{timestampToDate(task.date)}}
          td(class="action center-text")
            i(@click="deleteTaskFromArray(task.id)" class="fas fa-trash-alt" title="Delete")
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
import Loader from '@/aside/Loader.vue';
import { randomTasks, getUnixTimeStamp } from '@/service/randomTasks';
import { Task } from '@/types';
import Modal from '@/components/Modal.vue';

@Component({
  components: {
    Loader, Modal,
  },
})
export default class Tasks extends Vue {
  $refs!: {
    test: HTMLElement[],
  }

  enlargeOnStart: boolean = true;

  taskTitle: string = '';

  taskDesc: string = '';

  showModal: boolean = false;

  taskTitleChange: boolean = false;

  taskDescChange: boolean = false;

  tasks:Task[] = [];

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

  timestampToDate = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp, 10) * 1000);
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
  }

  addTaskToArray() {
    console.log(this.$refs);
    if (!this.allRequiredDataEntered) {
      this.showModal = true;
      return;
    }
    const newTask: Task = {
      id: (parseInt(this.getLastTaskId(), 10) + 1).toString(),
      title: this.taskTitle,
      description: this.taskDesc,
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
      console.log('Tasks loaded');
    } catch (err) {
      console.log('Tasks error:', err);
    }
  }

  updated() {
    if (!this.enlargeOnStart || this.tasks.length === 0) {
      return;
    }
    this.enlargeOnStart = false;

    Object.values(this.$refs.test).forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('enlarge-animation');
      }, 200 * index);
    });
    setTimeout(() => {
      Object.values(this.$refs.test).forEach((el, index) => {
        el.classList.remove('enlarge-animation');
      });
    }, this.$refs.test.length * 200 + 1000);
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  // transition: all 1s;
  animation-name: taskblink;
  animation-duration: 1s;
}

.enlarge-animation td{
  animation-name: enlarge;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes taskblink {
  0% {color: @nav-active-line-color}
  33% {color:black}
  66% {color: @nav-active-line-color}
  100% {color:black}
}

@keyframes enlarge {
  0% {transform: scale(1)}
  100% {transform: scale(1.2)}
}

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
      position: relative;
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

.input-warning {
  &::before {
    position: absolute;
    left: -6px;
    content: '!';
    color: red;
    font-weight: bold;
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
