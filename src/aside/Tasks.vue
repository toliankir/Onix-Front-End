<template>
  <div class="aside-tasks aside-padding">
    <Task :title="'Completed Tasks'"  :count="3"/>
    <Task :title="'Open Tasks'" :count="22" />
  </div>
</template>

<script>
import Task from "@/aside/Task.vue";

export default {
  name: "Tasks",
  components: {
    Task
  }
};
</script>

<style scoped>
.aside-tasks {
  margin: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;
}
</style>