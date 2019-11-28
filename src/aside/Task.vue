<template lang="pug">
  div.task
    p.task-count {{this.count}}
    p.task-description {{this.title}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Task extends Vue {
@Prop() private count!: Number;

@Prop() private title!: String;
}
</script>

<style lang="less" scoped>
@import "../constants.less";

.task {
  width: 49%;
}
.task .task-count {
  user-select: none;
  color: @aside-main-text-main-color;
  font-size: 20px;
  margin: 0;
}
.task .task-description {
  color: @aside-secondary-text-color;
  margin: 0;
  font-size: 12px;
}
</style>
