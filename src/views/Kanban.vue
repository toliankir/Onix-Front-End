<template lang="pug">
div.tasks-tables
  KanbanTasksTable(:tasks="todoTasks" :title="'Todo tasks'")
  KanbanTasksTable(:tasks="inprogressTasks" :title="'Inprogress tasks'")
  KanbanTasksTable(:tasks="doneTasks" :title="'Done tasks'")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Task, TaskStatus } from '@/types';
import randomTasks from '@/service/randomTasks';
import KanbanTasksTable from '@/components/KanbanTasksTable.vue';

@Component({
  components: {
    KanbanTasksTable,
  },
})
export default class Kanban extends Vue {
  tasks: Task[] = [];

  callbackFunc!:Function;

  get doneTasks():Task[] {
    if (!this.tasks) {
      return [];
    }
    return this.tasks.filter(el => el.status === TaskStatus.done) || [];
  }

  get todoTasks():Task[] {
    if (!this.tasks) {
      return [];
    }
    return this.tasks.filter(el => el.status === TaskStatus.todo) || [];
  }

  get inprogressTasks():Task[] {
    if (!this.tasks) {
      return [];
    }
    return this.tasks.filter(el => el.status === TaskStatus.inprogress) || [];
  }

  destroyed() {
    randomTasks.unsubscribe(this.callbackFunc);
  }

  async created() {
    this.tasks = await randomTasks.getRandomTasks();
    this.callbackFunc = randomTasks.onTaskChange(async () => {
      this.tasks = await randomTasks.getRandomTasks();
    });
  }
}
</script>

<style lang="less" scoped>
.tasks-tables {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
