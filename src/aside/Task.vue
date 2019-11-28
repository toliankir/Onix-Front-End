<template lang="pug">
  div.task
    p.task-count {{count}}
    p.task-description {{title}}
</template>

<script>
export default {
  name: 'Task',
  props: {
    count: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
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
