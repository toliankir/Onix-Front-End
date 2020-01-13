<template lang="pug">
div
  KanbanTasksTable(:tasks="todoTasks" :title="'Todo tasks'")
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
  tasks!: Task[];

  get doneTasks():Task[] {
    return this.tasks.filter(el => el.status === TaskStatus.done) || [];
  }

  get todoTasks():Task[] {
    return this.tasks.filter(el => el.status === TaskStatus.todo) || [];
  }

  get inprogressTasks():Task[] {
    return this.tasks.filter(el => el.status === TaskStatus.inprogress) || [];
  }

  async created() {
    if (!randomTasks.getRandomTasks()) {
      try {
        await randomTasks.fetchRandomTasks(Math.floor(Math.random() * 10));
      } catch (err) {
        console.log('Tasks error:', err);
      }
    }
    this.tasks = randomTasks.getRandomTasks();
  }
}
</script>

<style lang="less" scoped>
</style>
