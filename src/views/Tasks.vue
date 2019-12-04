<template lang="pug">
  div
    h4 Tasks
    Loader(v-if="this.getTasks.length === 0")
    table(v-else)
      tr(v-for="(task, index) of this.getTasks" :key="index")
        td {{task.title}}
        td {{task.description}}
        td {{task.date}}
    form
      span Task title:
      input(v-model="title")
      span Task description:
      input
      button(@click.prevent="test") Change
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Mutation, Action } from 'vuex-class';
import Loader from '@/aside/Loader.vue';
import { Task } from '@/types';
import db from '@/firestore';

@Component({
  components: {
    Loader,
  },
})
export default class Tasks extends Vue {
  @Getter getTasks!: Task[];

  @Mutation('changeTest') changeTest: any;

  @Action('fetchTasks') fetchTasks: any;

  private taskTitle: string = '';

  private taskDescription: string = '';

  get title(): string {
    return this.taskTitle;
  }

  set title(value: string) {
    console.log(value);
    this.taskTitle = value;
    console.log(this.taskTitle);
  }

  test() {
    console.log(this.taskTitle);
    // console.log('123');
    // db.collection('test').add({
    //   test: 'abc',
    // });
  }

  mounted() {
    this.fetchTasks();
    db.collection('test').onSnapshot((data) => {
      data.forEach((el) => {
        console.log(el.data().test);
      });
    });
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
