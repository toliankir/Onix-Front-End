<template lang="pug">
  div
    span EditMode
    div(v-if="editedTask")
      textarea(
        v-model="editedTask.title"
        :class="[titleOk ? '' : 'input-warning']"
        @input="checkInput"
      )
      textarea(
        v-model="editedTask.description"
        :class="[descriptionOk ? '' : 'input-warning']"
        @input="checkInput"
        )
      v-date-picker(v-model="expDate")
      p.action
        button.btn(
          @click.prevent="saveTask"
          :class="[(descriptionOk && titleOk) ? 'btn-yellow' : 'btn-grey']"
          ) Save
        button.btn.btn-red(@click.prevent="$emit('close')") Close
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// import randomTasks from '@/service/randomTasks';
import { Getter, Mutation } from 'vuex-class';
import { Task } from '@/types';
import { dateToTimestamp, timestampToDate } from '@/service/helper';

@Component
export default class TaskDetailsEdit extends Vue {
  expDate: Date = new Date();

  titleOk = true;

  descriptionOk = true;

  @Getter getTasks!: Task[];

  @Mutation changeTask: any;

  @Prop() taskId!: string;

  editedTask: Task| null = null;

  saveTask() {
    if (!this.editedTask) {
      return;
    }
    this.changeTask({
      ...this.editedTask,
      expdate: dateToTimestamp(this.expDate.toString()),
    });
    this.$emit('close');
  }

  mounted() {
    const task = this.getTasks.find(el => el.id === this.taskId);
    if (task) {
      this.expDate = new Date(parseInt(task.expdate, 10) * 1000);
      this.editedTask = { ...task };
    }
  }

  checkInput() {
    if (!this.editedTask) {
      return;
    }
    this.titleOk = this.editedTask.title.length > 0;
    this.descriptionOk = this.editedTask.description.length > 0;
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
