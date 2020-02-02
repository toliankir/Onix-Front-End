<template lang="pug">
  div
    div.wrapper(v-if="task")
      p Title
      span {{task.title}}
      p Description
      span {{task.description}}
    p.action
      button.btn.btn-grey(@click="$emit('editMode')") Edit
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Task } from '@/types';

@Component
export default class TaskDetailsView extends Vue {
  @Getter getTasks!: Task[];

  @Prop() taskId!: string;

  get task(): Task | undefined {
    return this.getTasks.find(el => el.id === this.taskId);
  }
}
</script>

<style lang="less" scoped>
@import "../../../constants.less";

.wrapper {
  & p {
    border-bottom: 1px solid @nav-active-line-color;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
  }

  & span {
    font-size: 13px;
  }
}
</style>
