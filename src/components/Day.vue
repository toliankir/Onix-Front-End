<template lang="pug">
td(:class="[isMonthCurrent ? 'currentmonth' : 'othermonth' ]" width=1)
  p.date {{date|humanDate}}
  p.task(v-for="(task, index) of getDayTasks" :key="index") {{task.title}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Task } from '@/types';

@Component
export default class Day extends Vue {
  @Prop() date!: number;

  @Prop() month!: number;

  @Action fetchTasks: any;

  @Getter getTasks!: Task[];

  get isMonthCurrent(): boolean {
    return (new Date(this.date * 1000)).getMonth() + 1 === this.month;
  }

  get getDayTasks(): Task[] {
    return this.getTasks.filter(el => parseInt(el.date, 10) >= this.date
      && parseInt(el.date, 10) < this.date + 86400);
  }

  created() {
    this.fetchTasks();
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

  td {
    vertical-align: top;
    border-radius: 5px;
      box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.1);
  }

  .date {
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    margin: 5px 0;
  }

  .task {
    font-size: 12px;
    margin: 2px;
  }

  .currentmonth {
    background-color: @task-item-blue;
  }

  .othermonth {
    background-color: @task-item-grey;
  }
</style>
