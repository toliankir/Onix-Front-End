<template lang="pug">
div.tasks-tables(
  @mousedown="mousePress"
  @mouseup="mouseUp"
  @mouseleave="mouseUp"
  @mousemove="mouseMove")
  KanbanTasksTable(
    :tasks="todoTasks"
    :title="'Todo tasks'"
    )
  KanbanTasksTable(:tasks="inprogressTasks" :title="'Inprogress tasks'")
  KanbanTasksTable(:tasks="doneTasks" :title="'Done tasks'")
  div.dragable(
    v-bind:style="{left: dragableX + 'px', top: dragableY + 'px', display: showDraggable()}"
    ) this drag
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

  dragableX: number = 0;

  dragableY: number = 0;

  isDragged: boolean = false;

  dragElementId: number = -1;

  startDragBlcok: string = '';

  endDragBlcok: string = '';

  callbackFunc!:Function;

  mouseMove(event: MouseEvent) {
    this.dragableX = event.pageX - 10;
    this.dragableY = event.pageY - 20;
  }

  test = (): TaskStatus => {
    console.log(123, TaskStatus.todo);
    return TaskStatus.todo;
  }

  mousePress(event: MouseEvent) {
    this.isDragged = true;
    this.mouseMove(event);
  }

  showDraggable() {
    return this.isDragged ? 'block' : 'none';
  }

  mouseUp(event: MouseEvent) {
    this.isDragged = false;
  }

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

  taskStatusByTitle = (title: string) => {
    switch (title) {
      case 'Todo tasks':
        return TaskStatus.todo;
      case 'Inprogress tasks':
        return TaskStatus.inprogress;
      case 'Done tasks':
        return TaskStatus.done;
      default:
        return TaskStatus.todo;
    }
  }

  mounted() {
    this.$root.$on('dragDown', (dragElementId:number, startBlockName: string) => {
      this.dragElementId = dragElementId;
      this.startDragBlcok = startBlockName;
    });

    this.$root.$on('dragUp', (endBlockName: string) => {
      this.endDragBlcok = endBlockName;
      const task:Task | undefined = this.tasks.find(el => el.id === this.dragElementId.toString());
      if (task) {
        task.status = this.taskStatusByTitle(this.endDragBlcok);
      }
      console.log(this.startDragBlcok, this.endDragBlcok, this.dragElementId);
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

.dragable {
  position: fixed;
  display: none;
  user-select: none;
}
</style>
