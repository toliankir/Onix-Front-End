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
  KanbanTasksTable(
    :tasks="inprogressTasks"
    :title="'Inprogress tasks'"
    )
  KanbanTasksTable(
    :tasks="doneTasks"
    :title="'Done tasks'"
    )
  div.dragable(
    v-bind:style="{left: dragableX + 'px', top: dragableY + 'px', display: showDraggable()}"
    ) {{dragableTaskTitle}}
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

  startDragBlock: TaskStatus | undefined = undefined;

  endDragBlock: TaskStatus | undefined = undefined;

  callbackFunc!:Function;

  mouseMove(event: MouseEvent) {
    if (!this.isDragged) {
      return;
    }
    this.dragableX = event.x - 30;
    this.dragableY = event.y - 10;
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

  get dragableTaskTitle(): string {
    const task = this.tasks.find(el => el.id === this.dragElementId.toString());
    return task ? task.title : '';
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

  async created() {
    this.tasks = await randomTasks.getRandomTasks();
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
      this.startDragBlock = this.taskStatusByTitle(startBlockName);
    });

    this.$root.$on('dragUp', (endBlockName: string) => {
      this.endDragBlock = this.taskStatusByTitle(endBlockName);
      if (this.dragElementId === -1 || this.isDragged || !this.startDragBlock
          || (this.startDragBlock === TaskStatus.done && this.endDragBlock === TaskStatus.todo)) {
        this.startDragBlock = undefined;
        this.endDragBlock = undefined;
        this.dragElementId = -1;
        return;
      }
      const task:Task | undefined = this.tasks.find(el => el.id === this.dragElementId.toString());
      if (task && this.endDragBlock) {
        task.status = this.endDragBlock;
      }
      this.startDragBlock = undefined;
      this.endDragBlock = undefined;
      this.dragElementId = -1;
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
