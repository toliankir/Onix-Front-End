<template lang="pug">
  div
    h4 Tasks
    Loader(v-if="this.tasks.length === 0")
    table(v-if="this.tasks.length !== 0")
      thead
        tr
          td Title
          td Description
          td.center-text Time
          td.center-text Status
          td.center-text Action
      transition-group(name="list" tag="tbody")
        tr(
          v-for="(task, index) of tasks"
          :key="task.id"
          :ref="'refTasks'")
          td(
            class="title"
            @click="showModalDetails(task.id)"
            ) {{task.title}}
          td {{task.description}}
          td(class="center-text") {{task.date|humanDate}}
          td.status
            span {{task.status}}
            i.fas.fa-sync(@click="changeStatus(task.id)")
          td(class="action center-text")
            i(@click="deleteTaskFromArray(index)" class="fas fa-trash-alt" title="Delete")
    form
      button.btn.btn-yellow(@click.prevent="showModalAdd") Add
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Loader from '@/aside/Loader.vue';
import randomTasks from '@/service/randomTasks';
import { Task, TaskStatus } from '@/types';
import { getUnixTimeStamp } from '@/service/helper';

@Component({
  components: {
    Loader,
  },
})
export default class Tasks extends Vue {
  $refs!: {
    refTasks: HTMLElement[],
  }

  enlargeOnStart: boolean = true;

  tasks:Task[] = [];

  changeStatus(id: string) {
    const task = this.tasks.find(el => el.id === id);
    if (!task) {
      return;
    }
    switch (task.status) {
      case TaskStatus.todo:
        task.status = TaskStatus.inprogress;
        break;
      case TaskStatus.inprogress:
        task.status = TaskStatus.done;
        break;
      case TaskStatus.done:
        task.status = TaskStatus.todo;
        break;
      default:
        task.status = TaskStatus.todo;
        break;
    }
  }

  deleteTaskFromArray(id: number) {
    this.tasks.splice(id, 1);
  }

  async created() {
    this.tasks = await randomTasks.getRandomTasks();
  }

  showModalAdd() {
    this.$root.$emit('showModal', 'AddTask', 'Add task');
  }

  showModalDetails(taskId: string) {
    this.$root.$emit('showModal', 'TaskDetails', 'Task details', taskId);
  }

  runStartupAnimation() {
    if (!this.enlargeOnStart || this.tasks.length === 0) {
      return;
    }
    this.enlargeOnStart = false;
    Object.values(this.$refs.refTasks).forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('enlarge-animation');
      }, 200 * index);
    });
    setTimeout(() => {
      Object.values(this.$refs.refTasks).forEach((el, index) => {
        el.classList.remove('enlarge-animation');
      });
    }, this.$refs.refTasks.length * 200 + 1000);
  }

  mounted() {
    this.runStartupAnimation();
  }

  updated() {
    this.runStartupAnimation();
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

table {
  width: 100%;
  border-spacing: 0;
  line-height: 25px;
  margin-bottom: 10px;

  & tr:nth-child(2n) {
    background-color: @btn-dark-grey-color;
  }

  & thead td {
    font-size: 13px;
    font-weight: bold;
    border-bottom: 2px solid @nav-active-line-color;
  }

  .status {
    width: 100px;
    margin: 0;
    & i {
      cursor: pointer;
      float: right;
      line-height: 25px;
    }
  }

  & .center-text {
    text-align: center;
  }

  & tbody td {
    font-size: 12px;
    &.title {
      font-weight: bold;
      user-select: none;
      cursor: pointer;
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
