<template lang="pug">
  div
    h4 Tasks
    table
      tr(v-for="(task, index) of tasks" :key="index")
        td {{task.title}}
        td {{task.description}}
        td {{task.date}}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Tasks extends Vue {
  private tasks: Array<{ title: string; description: string; date: string }> = [
    {
      title: 'Task 1',
      description: 'Description of Task 1',
      date: '123',
    },
    {
      title: 'Task 2',
      description: 'Description of Task 2',
      date: '123',
    },
    {
      title: 'Task 3',
      description: 'Description of Task 3',
      date: '123',
    },
    {
      title: 'Task 4',
      description: 'Description of Task 4',
      date: '123',
    },
  ];
}
</script>

<style lang="less" scoped>
@import "../constants.less";

table {
  width: 100%;
  border-spacing: 0;
  line-height: 25px;
}
table tr:nth-child(2n) {
  background-color: @btn-dark-grey-color;
}
</style>
