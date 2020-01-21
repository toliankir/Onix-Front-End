<template lang="pug">
div(
  @mouseup="blockMouseUp(title)"
  )
  p {{title}}
  p {{draggedElementId}}
  ul
    li(
      v-for="(task, index) of tasks"
      @mousedown="mouseDown(task.id)")
      span {{task.title}}
      span {{task.date|humanDate}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task, TaskStatus } from '@/types';

@Component
export default class KanbanTasksTable extends Vue {
  @Prop() tasks!: Task[];

  @Prop() title!: string;

  @Prop() test!: TaskStatus;

  draggedElementId:number = -1;

  blockName:string = '';

  dragElement(elementId: string) {
    this.draggedElementId = parseInt(elementId, 10);
  }

  blockMouseUp = (blockName: string) => {
    this.sendUpEvent();
  }

  mouseDown(elementId:string, event: MouseEvent) {
    this.draggedElementId = parseInt(elementId, 10);
    this.$root.$emit('dragDown', this.draggedElementId, this.title);
  }

  sendUpEvent() {
    this.$root.$emit('dragUp', this.title);
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

div {
  width: 30%;
}

p {
  font-weight: bold;
  border-bottom: 2px solid @nav-active-line-color;
}

span {
  user-select: none;
  font-size: 12px;
  &.date {
    font-size: 10px;
    text-align: center;
  }
}
</style>
