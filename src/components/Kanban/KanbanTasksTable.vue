<template lang="pug">
div(@mousemove="blockMove(title)")
  p {{title}} {{this.filterdTasks.length}}/{{this.tasks.length}}
  div.filter-bar
    span.search Search:
    input(v-model="titleFilter")
    v-date-picker(
      mode="range"
      v-model="dateRange"
      :popover="{placement: 'bottom', visibility: 'click'}")
       i.far.fa-calendar-alt.calendar-icon
  TaskItem(
    v-for="(task, index) of filterdTasks"
    :taskId="task.id"
    :key="task.id"
    @mousedown.native="mouseDown(task.id, $event)"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task, TaskStatus } from '@/types';
import TaskItem from '@/components/Kanban/TaskItem.vue';
import { dateToTimestamp } from '@/service/helper';

@Component({
  components: {
    TaskItem,
  },
})
export default class KanbanTasksTable extends Vue {
  @Prop() tasks!: Task[];

  @Prop() title!: string;

  draggedElementId:number = -1;

  dateRange: any = null;

  blockName = '';

  titleFilter = '';

  get filterdTasks(): Task[] {
    if (!this.tasks) {
      return [];
    }
    return this.tasks.filter((el) => {
      if (el.title.indexOf(this.titleFilter) !== -1
        && this.minRange < parseInt(el.date, 10) && this.maxRange > parseInt(el.date, 10)) {
        return true;
      }
      return false;
    });
  }

  get maxRange(): number {
    if (!this.dateRange) {
      return Infinity;
    }
    return dateToTimestamp(this.dateRange.end);
  }

  get minRange(): number {
    if (!this.dateRange) {
      return 0;
    }
    return dateToTimestamp(this.dateRange.start);
  }

  blockMove(blockName: string) {
    this.$root.$emit('dragUp', this.title);
  }

  getTaskItem = (item: any):any => {
    let taskItem = item;
    while (!taskItem.classList.contains('task-item')) {
      taskItem = taskItem.parentElement;
    }
    return taskItem;
  }

  getYOffset = (item: any):number => {
    let taskItem = item;
    let offset = 0;
    while (!taskItem.classList.contains('task-item')) {
      offset += taskItem.offsetTop;
      taskItem = taskItem.parentElement;
    }
    return offset;
  }

  mouseDown(elementId:string, event: any) {
    const viewportOffset = this.getTaskItem(event.target).getBoundingClientRect();
    this.draggedElementId = parseInt(elementId, 10);
    this.$root.$emit('dragDown', this.draggedElementId, this.title,
      {
        width: this.getTaskItem(event.target).offsetWidth,
        offsetX: event.clientX - viewportOffset.left,
        offsetY: event.clientY - viewportOffset.top,
      });
  }
}
</script>

<style lang="less" scoped>
@import "../../constants.less";

.filter-bar {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  width: 100%;
  & input {
    flex-grow: 1;
    width: 100%;
    border: 1px solid @nav-active-line-color;
    border-radius: 5px;
    padding: 1px 3px;
    outline: none;
  }
  & .calendar-icon {
    font-size: 22px;
    color: @nav-active-line-color;
    margin: 0 10px;
    cursor: pointer;
    }
  &>.search {
    margin-right: 3px;
    font-weight: bold;
    @media @sm {
      display: none;
    }
  }
}

div {
  width: 30%;
  position: relative;
}

p {
  font-weight: bold;
  border-bottom: 2px solid @nav-active-line-color;
  margin: 5px 0;
}

ul {
  list-style: none;
  padding: 0 5px;
}

span {
  user-select: none;
  font-size: 12px;
  &.date {
    font-size: 10px;
    margin-left: 5px;
    text-align: center;
  }
}
</style>
