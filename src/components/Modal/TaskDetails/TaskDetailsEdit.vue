<template lang="pug">
  div
    span EditMode
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
    v-date-picker(v-model="date")
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
import { dateToTimestamp } from '@/service/helper';

@Component
export default class TaskDetailsEdit extends Vue {
  tasks: Task[] = [];

  taskTitle = '';

  taskDescription = '';

  date: any = null;

  titleOk = true;

  descriptionOk = true;

  @Prop() taskId!: string;

  saveTask() {
    const task = this.tasks.find(el => el.id === this.taskId);
    if (task) {
      task.title = this.taskTitle;
      task.description = this.taskDescription;
      task.expdate = dateToTimestamp(this.date).toString();
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
      this.date = new Date(parseInt(task.expdate, 10) * 1000);
    }
  }
}
</script>

<style lang="less" scoped>
div {
  & span {
    font-weight: bold;
  }
}

.action {
  display: flex;
}

textarea {
  width: 340px;
  font-size: 13px;
  resize: vertical;
}
</style>
