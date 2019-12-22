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
    transition
      table(v-if="this.tasks.length !== 0")
        thead
          tr
            td Title
            td Description
            td(class="center-text") Time
            td(class="center-text") Action
        tbody
          tr(
            v-for="(task, index) of tasks"
            :style="{'--delay': (index * 0.25) + 's'}"
            :key="index"
            class="enlarge-animation"
            :ref="'test'")
            td(class="title") {{task.title}}
            td {{task.description}}
            td(class="center-text") {{task.date}}
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

  // updated() {
  //   Object.values(this.$refs.test).forEach((el, index) => {
  //     setTimeout(() => {
  //       el.classList.add('enlarge-animation');
  //     }, 500 * index);
  //   });
  //   setTimeout(() => {
  //     Object.values(this.$refs.test).forEach((el, index) => {
  //       el.classList.remove('enlarge-animation');
  //     });
  //   }, this.$refs.test.length * 500 + 2000);
  // }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

.enlarge-animation td{
  animation-name: enlarge;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: var(--delay);
}

@keyframes enlarge {
  0% {font-size: 12px}
  100% {font-size: 18px;}
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
