<template lang="pug">
div.task-item(:class="itemColorClass")
  div.task-container(v-if="task")
   p.title {{task.id}} - {{task.title}}
   p.start-time created: {{task.date|humanDate}}
   p.exp-time exp: {{task.expdate|humanDate}}
   p.remain-time(:class="timeColorClass") remain: {{timeRemain|periodDate}}
   p.text {{task.description}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Task, TaskStatus } from '@/types';
import { getUnixTimeStamp } from '@/service/helper';

@Component
export default class TaskItem extends Vue {
  @Prop() taskId!: string;

  @Action fetchTasks: any;

  @Getter getTasks!: Task[];

  get task():Task | undefined {
    return this.getTasks.find(el => el.id === this.taskId);
  }

  get timeColorClass(): any {
    if (!this.timeRemain) {
      return 'grey-remain';
    }
    if (this.timeRemain < 1) {
      return 'red-remain';
    }
    if (this.timeRemain < 86400) {
      return 'yellow-remain';
    }
    return 'grey-remain';
  }

  get itemColorClass(): any {
    if (!this.task) {
      return 'grey-border';
    }
    if (this.task.status === TaskStatus.todo) {
      return 'red-border';
    }
    if (this.task.status === TaskStatus.inprogress) {
      return 'yellow-border';
    }
    if (this.task.status === TaskStatus.done) {
      return 'grey-border';
    }
    return 'grey-border';
  }

  get timeRemain(): number {
    if (!this.task) {
      return 0;
    }
    return parseInt(this.task.expdate, 10) - parseInt(getUnixTimeStamp(), 10);
  }

  async created() {
    this.fetchTasks();
  }
}
</script>

<style lang="less" scoped>
@import "../../constants.less";

div.task-item {
  position: relative;
  border-radius: 5px;
  user-select: none;
  margin-bottom: 10px;
  width: 100%;
  min-width: 200px;
  box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.1);
  padding: 5px;
  & p {
   margin: 0;
  }
  & .title {
    font-size: 13px;
    font-weight: bold;
  }
  & .start-time {
    font-size: 11px;
  }
  & .exp-time {
    font-size: 11px;
  }
  & .remain-time {
    background-color: @task-item-grey;
    border-radius: 5px;
    padding: 2px 3px;
    font-size: 11px;
    &::after {
      width: 10px;
      height: 10px;
      top: 3px;
      margin-left: 3px;
      border-radius: 50%;
      position: absolute;
      content: '';
    }
  }
  & .yellow-remain {
    &::after {
      background-color: @task-item-yellow;
    }
  }
  .red-remain {
    &::after {
      background-color: @task-item-red;
    }
  }
  .grey-remain {
    &::after {
      background-color: none;
    }
  }
  & .text {
      margin-top: 5px;
      font-size: 13px;
      background-color: rgba(255, 255, 255, 0.3);
      padding: 2px;
  }
}

.red-border {
  background-color: @task-item-red;
}

.yellow-border {
  background-color: @task-item-yellow;
}

.grey-border {
  background-color: @task-item-grey;
}
</style>
