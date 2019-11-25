<template lang="pug">
  div.task
    p.task-count {{count}}
    p.task-description {{title}}
</template>

<script>
export default {
  name: "Task",
  props: {
    count: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.task {
  width: 49%;
}
.task .task-count {
  user-select: none;
  color: #ffffff;
  font-size: 20px;
  margin: 0;
}
.task .task-description {
  color: #9b9b9b;
  margin: 0;
  font-size: 12px;
}
</style>