<template lang="pug">
  div
    h3 TaskDetails
    TaskDetailsView(:taskId="taskId")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TaskDetailsView from '@/components/TaskDetailsView.vue';

@Component({
  components: {
    TaskDetailsView,
  },
})
export default class TaskDetails extends Vue {
  @Prop() taskId!: string;
}
</script>

<style lang="less" scoped>

</style>
