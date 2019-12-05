<template lang="pug">
  div
    h4 Tasks
    Loader(v-if="this.getTasks.length === 0")
    table(v-else)
      tr(v-for="(task, index) of this.getTasks" :key="index")
        td {{task.title}}
        td {{task.description}}
        td {{task.date}}
        td
          button(@click="deleteTask(task.id)") Delete
    form
      span Task title:
      input(v-model="taskTitle")
      span Task description:
      input(v-model="taskDescription")
      button(@click.prevent="addTask") Add
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

  @Mutation('setTasks') setTasks: any;

  @Action('fetchTasksFirestore') fetchTasks: any;

  private unsubscribeFirebase!: any;

  public taskTitle: string = '';

  public taskDescription: string = '';

  addTask() {
    const task: Task = {
      id: '',
      title: this.taskTitle,
      description: this.taskDescription,
      date: '',
    };
    db.collection('test').add(task);
  }

  deleteTask = (taskId: string) => {
    console.log(taskId);
    db.collection('test').doc(taskId).delete();
  }

  mounted() {
    this.unsubscribeFirebase = db.collection('test').onSnapshot((data: any) => {
      const tasks: Task[] = [];
      data.forEach((el: any) => {
        tasks.push({
          id: el.id,
          title: el.data().title,
          description: el.data().description,
          date: '',
        });
      });
      this.setTasks(tasks);
    });
  }

  destroyed() {
    this.unsubscribeFirebase();
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
