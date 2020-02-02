<template lang="pug">
div
  FilterBar
  div.tasks-tables(
    @mousedown="mousePress"
    @mouseup="mouseUp"
    @mouseleave="mouseUp"
    @mouseenter="resetDragVariables"
    @mousemove="mouseMove"
    )
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
    div.dragable-wrapper(:style="dragableStyle")
      TaskItem.drag-width(:taskId="dragElementId.toString()")
</template>

<script lang="ts">
import { Action, Getter, Mutation } from 'vuex-class';
import { Vue, Component } from 'vue-property-decorator';
import { Task, TaskStatus } from '@/types';
import KanbanTasksTable from '@/components/Kanban/KanbanTasksTable.vue';
import TaskItem from '@/components/Kanban/TaskItem.vue';
import FilterBar from '@/components/Kanban/FilterBar.vue';

@Component({
  components: {
    KanbanTasksTable,
    TaskItem,
    FilterBar,
  },
})
export default class Kanban extends Vue {
  TIMEDELAY_FOR_MODAL_OPEN = 350;

  startTime = 0;

  dragableX: number = 0;

  dragableY: number = 0;

  isDragged: boolean = false;

  dragElementId: number = -1;

  startDragBlock: TaskStatus | undefined = undefined;

  endDragBlock: TaskStatus | undefined = undefined;

  darggedElemet:any = {};

  @Action fetchTasks: any;

  @Mutation changeTask: any;

  @Getter getTasks!: Task[];

  get dragableStyle():any {
    return {
      left: `${this.dragableX}px`,
      top: `${this.dragableY}px`,
      display: this.isDragged && this.dragableTaskTitle !== '' ? 'block' : 'none',
      width: `${this.darggedElemet.width + 200}px`,
    };
  }

  mouseMove(event: any) {
    if (!this.isDragged) {
      return;
    }
    this.dragableX = event.x - 100 - this.darggedElemet.offsetX;
    this.dragableY = event.y - 100 - this.darggedElemet.offsetY;
  }

  getTaskItem = (item: any):any => {
    let taskItem = item;
    while (!taskItem.classList.contains('task-item')) {
      taskItem = taskItem.parentElement;
    }
    return taskItem;
  }

  resetDragVariables() {
    this.startDragBlock = undefined;
    this.endDragBlock = undefined;
    this.dragElementId = -1;
  }

  mousePress(event: any) {
    this.isDragged = true;
    this.startTime = Date.now();
    this.mouseMove(event);
  }

  mouseUp(event: MouseEvent) {
    this.isDragged = false;
    if (Date.now() - this.startTime < this.TIMEDELAY_FOR_MODAL_OPEN && this.dragElementId > -1) {
      this.$root.$emit('showModal', 'TaskDetails', 'Task details', this.dragElementId.toString());
    }
  }

  get dragableTaskTitle(): string {
    const task = this.getTasks.find(el => el.id === this.dragElementId.toString());
    return task ? task.title : '';
  }

  get doneTasks():Task[] {
    return this.getTasks.filter(el => el.status === TaskStatus.done) || [];
  }

  get todoTasks():Task[] {
    return this.getTasks.filter(el => el.status === TaskStatus.todo) || [];
  }

  get inprogressTasks():Task[] {
    return this.getTasks.filter(el => el.status === TaskStatus.inprogress) || [];
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
    this.fetchTasks();
    this.$root.$on('dragDown', (dragElementId:number, startBlockName: string, element: any) => {
      this.darggedElemet = element;
      this.dragElementId = dragElementId;
      this.startDragBlock = this.taskStatusByTitle(startBlockName);
    });

    this.$root.$on('dragUp', (endBlockName: string) => {
      this.endDragBlock = this.taskStatusByTitle(endBlockName);
      if (this.dragElementId === -1 || this.isDragged || !this.startDragBlock
          || (this.startDragBlock === TaskStatus.done && this.endDragBlock === TaskStatus.todo)) {
        this.resetDragVariables();
        return;
      }
      const task = this.getTasks.find(el => el.id === this.dragElementId.toString());
      if (!task) {
        this.resetDragVariables();
        return;
      }
      this.changeTask({
        ...task,
        status: this.endDragBlock,
      });
      // task.id = this.taskStatusByTitle(this.endDragBlock);
      this.resetDragVariables();
    });
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

.tasks-tables {
  width: 100%;
  @media @sm {
    width: calc(100vw - 70px);
    overflow: hidden;
  }
  justify-content: space-between;
  display: flex;
}

.dragable-wrapper {
  position: fixed;
  display: none;
  padding: 100px;
  cursor: all-scroll;
  & .drag-width {
    user-select: none;
    padding: 5px;
    border-radius: 5px;
    opacity: 0.7;
  }
}
</style>
