<template lang="pug">
div.task-item
  div.task-container(v-if="task")
   p.title {{task.title}}
   p.start-time created: {{task.date|humanDate}}
   p.exp-time exp: {{task.expdate|humanDate}}
   p.text {{task.description}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task } from '@/types';
import randomTasks from '@/service/randomTasks';

@Component
export default class TaskItem extends Vue {
  @Prop() taskId!: string;

  tasks:Task[] = [];

  get task():Task | undefined {
    return this.tasks.find(el => el.id === this.taskId);
  }

  async fetchTasck() {
    if (!randomTasks.getFetching) {
      this.tasks = await randomTasks.getRandomTasks();
      return;
    }
    setTimeout(async () => {
      this.fetchTasck();
    }, 500);
  }

  async created() {
    this.fetchTasck();
  }
}
</script>

<style lang="less" scoped>
@import "../../constants.less";

div.task-item {
  position: relative;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  background-color: @task-item-yellow;
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
  & .text {
      margin-top: 5px;
      font-size: 13px;
      background-color: rgba(255, 255, 255, 0.3);
      padding: 2px;
  }
}
</style>
