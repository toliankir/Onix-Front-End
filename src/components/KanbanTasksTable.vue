<template lang="pug">
table
  tr
    td {{title}}
  tr(v-for="(task, index) of tasks")
    td {{task.title}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task } from '@/types';

@Component
export default class KanbanTasksTable extends Vue {
  @Prop() tasks!: Task[];

  @Prop() title!: string;
}
</script>

<style lang="less" scoped>

</style>
