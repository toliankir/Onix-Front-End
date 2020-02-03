<template lang="pug">
td(:class="[isMonthCurrent ? 'currentmonth' : 'othermonth' ]" width=1)
  p.date {{date|humanDate}}
  div.task(v-for="(task, index) of getDayTasks" :key="index")
    p(@click="$emit('showComment', task.id)") {{task.title}}
    div.comment(:style="{'display' : task.id == comment ? 'block' : 'none'}")
      i.fas.fa-times(@click="$emit('showComment', -1)")
      TaskItem(:taskId="task.id")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import TaskItem from '@/components/Kanban/TaskItem.vue';
import { Task } from '@/types';

@Component({
  components: {
    TaskItem,
  },
})
export default class Day extends Vue {
  @Prop() date!: number;

  @Prop() month!: number;

  @Action fetchTasks: any;

  @Getter getTasks!: Task[];

  @Prop() comment!: number;

  showComment(id: number) {
    this.comment = id;
  }

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
    & p {
      font-size: 12px;
      margin: 2px;
      padding-left: 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      &::before {
        position: absolute;
        left: 2px;
        font-size: 14px;
        font-weight: bold;
        top: -3px;
        content: '-';
      }
    }

    & .comment {
      bottom: 100%;
      left: -100px;
      display: none;
      position: absolute;
      z-index: 999;
      & i {
        text-align: right;
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 9999;
        cursor: pointer;
      }
    }

  }

  .currentmonth {
    background-color: @task-item-yellow;
  }

  .othermonth {
    background-color: @task-item-grey;
  }
</style>
