<template lang="pug">
div(@mousemove="blockMove(title)")
  p {{title}}
  ul
    li(
      v-for="(task, index) of tasks"
      @mousedown="mouseDown(task.id, $event)"
      )
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

  draggedElementId:number = -1;

  blockName:string = '';

  test = (id: string) => {
    console.log(id);
  }

  blockMove(blockName: string) {
    this.$root.$emit('dragUp', this.title);
  }

  mouseDown(elementId:string, event: MouseEvent) {
    this.draggedElementId = parseInt(elementId, 10);
    this.$root.$emit('dragDown', this.draggedElementId, this.title);
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
