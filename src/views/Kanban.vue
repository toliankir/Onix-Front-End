<template lang="pug">
div.tasks-tables(
  @mousedown="mousePress"
  @mouseup="mouseUp"
  @mouseleave="mouseUp"
  @mouseenter="resetDragVariables"
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
  div.dragable-wrapper(
    v-bind:style="{left: dragableX + 'px', top: dragableY + 'px', display: showDraggable()}"
    )
    div {{dragableTaskTitle}}
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
  TIMEDELAY_FOR_MODAL_OPEN = 250;

  tasks: Task[] = [];

  startTime = 0;

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
    this.dragableX = event.x - 120;
    this.dragableY = event.y - 110;
  }

  resetDragVariables() {
    this.startDragBlock = undefined;
    this.endDragBlock = undefined;
    this.dragElementId = -1;
  }

  mousePress(event: MouseEvent) {
    this.isDragged = true;
    this.startTime = Date.now();
    this.mouseMove(event);
  }

  showDraggable() {
    return this.isDragged && this.dragableTaskTitle !== '' ? 'block' : 'none';
  }

  mouseUp(event: MouseEvent) {
    this.isDragged = false;
    if (Date.now() - this.startTime < this.TIMEDELAY_FOR_MODAL_OPEN) {
      this.$root.$emit('showModal', 'TaskDetails', 'Task details', this.dragElementId.toString());
    }
    // this.dragElementId = -1;
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
@import "../constants.less";

.tasks-tables {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dragable-wrapper {
  position: fixed;
  display: none;
  padding: 100px;
  cursor: all-scroll;
  & div {
    user-select: none;
    padding: 5px;
    background-color: @nav-active-line-color;
    border-radius: 5px;
    opacity: 0.7;
  }
}
</style>
