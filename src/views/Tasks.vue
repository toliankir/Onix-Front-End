<template lang="pug">
  div
    h4 Tasks
    table
      tr(v-for="(task, index) of this.getTasks" :key="index")
        td {{task.title}}
        td {{task.description}}
        td {{task.date}}
    button Change
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { Task } from '@/types';

@Component
export default class Tasks extends Vue {
  @Getter getTasks!: Task[];

  @Mutation('changeTest') changeTest: any;
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
