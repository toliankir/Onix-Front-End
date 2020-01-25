<template lang="pug">
div(@mousemove="blockMove(title)")
  p {{title}}
  TaskItem(
    v-for="(task, index) of tasks"
    :taskId="task.id"
    :key="task.id"
    @mousedown.native="mouseDown(task.id, $event)"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task, TaskStatus } from '@/types';
import TaskItem from '@/components/Kanban/TaskItem.vue';

@Component({
  components: {
    TaskItem,
  },
})
export default class KanbanTasksTable extends Vue {
  @Prop() tasks!: Task[];

  @Prop() title!: string;

  draggedElementId:number = -1;

  blockName:string = '';

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

div {
  width: 30%;
  position: relative;
}

p {
  font-weight: bold;
  border-bottom: 2px solid @nav-active-line-color;
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
