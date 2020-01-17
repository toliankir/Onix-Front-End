<template lang="pug">
table
  thead
    tr
      td(colspan=2) {{title}}
  tbody
    tr(v-for="(task, index) of tasks")
      td {{task.title}}
      td.date {{task.date|humanDate}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task } from '@/types';
import { timestampToDate } from '@/service/helper';

@Component
export default class KanbanTasksTable extends Vue {
  @Prop() tasks!: Task[];

  @Prop() title!: string;
}
</script>

<style lang="less" scoped>
@import "../constants.less";

table {
  width: 30%;
}

thead td {
  font-weight: bold;
  border-bottom: 2px solid @nav-active-line-color;
}

tbody td {
  font-size: 12px;
  &.date {
    font-size: 10px;
    text-align: center;
  }
}
</style>
