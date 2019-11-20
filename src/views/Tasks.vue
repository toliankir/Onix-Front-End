<template>
  <div>
    <h4>Tasks</h4>
    <table>
      <tr v-for="(task, index) of tasks" :key="index">
        <td>{{task.title}}</td>
        <td>{{task.description}}</td>
        <td>{{task.date}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          title: "Task 1",
          description: "Description of Task 1",
          date: "123"
        },
        {
          title: "Task 2",
          description: "Description of Task 2",
          date: "123"
        },
        {
          title: "Task 3",
          description: "Description of Task 3",
          date: "123"
        },
        {
          title: "Task 4",
          description: "Description of Task 4",
          date: "123"
        }
      ]
    };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
  line-height: 25px;
}
table tr:nth-child(2n) {
  background-color: #b4b4b4;
}
</style>