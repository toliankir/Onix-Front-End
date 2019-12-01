<template lang="pug">
  div
    h4 Tasks
    Loader(v-if="this.getTasks.length === 0")
    table(v-else)
      tr(v-for="(task, index) of this.getTasks" :key="index")
        td {{task.title}}
        td {{task.description}}
        td {{task.date}}
    button Change
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Mutation, Action } from 'vuex-class';
import Loader from '@/aside/Loader.vue';
import { Task } from '@/types';

@Component({
  components: {
    Loader,
  },
})
export default class Tasks extends Vue {
  @Getter getTasks!: Task[];

  @Mutation('changeTest') changeTest: any;

  @Action('fetchTasks') fetchTasks: any;

  mounted() {
    this.fetchTasks();
  }
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
