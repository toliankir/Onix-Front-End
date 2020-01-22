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
import randomTasks from '@/service/randomTasks';
import { Task } from '@/types';

@Component
export default class TaskDetailsView extends Vue {
  tasks: Task[] = [];

  @Prop() taskId!: string;

  get task(): Task | undefined {
    return this.tasks.find(el => el.id === this.taskId);
  }

  async created() {
    this.tasks = await randomTasks.getRandomTasks();
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

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
