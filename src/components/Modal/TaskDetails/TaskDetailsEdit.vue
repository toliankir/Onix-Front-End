<template lang="pug">
  div EditMode {{taskTitle}}
    textarea(
      v-model="taskTitle"
      :class="[titleOk ? '' : 'input-warning']"
      @input="checkTitle"
    )
    textarea(
      v-model="taskDescription"
      :class="[descriptionOk ? '' : 'input-warning']"
      @input="checkDescription"
      )
    v-calendar
    p.action
      button.btn(
        @click.prevent="saveTask"
        :class="[(descriptionOk && titleOk) ? 'btn-yellow' : 'btn-grey']"
        ) Save
      button.btn.btn-red(@click.prevent="$emit('close')") Close
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import randomTasks from '@/service/randomTasks';
import { Task } from '@/types';

@Component
export default class TaskDetailsEdit extends Vue {
  tasks: Task[] = [];

  taskTitle = '';

  taskDescription = '';

  titleOk = true;

  descriptionOk = true;

  @Prop() taskId!: string;

  saveTask() {
    const task = this.tasks.find(el => el.id === this.taskId);
    if (task) {
      task.title = this.taskTitle;
      task.description = this.taskDescription;
      this.$emit('close');
    }
  }

  checkTitle() {
    this.titleOk = this.taskTitle.length > 0;
  }

  checkDescription() {
    this.descriptionOk = this.taskDescription.length > 0;
  }

  async created() {
    this.tasks = await randomTasks.getRandomTasks();
    const task = this.tasks.find(el => el.id === this.taskId);
    if (task) {
      this.taskTitle = task.title;
      this.taskDescription = task.description;
    }
  }
}
</script>

<style lang="less" scoped>
.action {
  display: flex;
}

textarea {
  width: 340px;
  font-size: 13px;
  resize: vertical;
}
</style>
