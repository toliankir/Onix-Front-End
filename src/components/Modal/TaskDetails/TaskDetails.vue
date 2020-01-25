<template lang="pug">
  div
    TaskDetailsView(v-if="viewMode" :taskId="taskId" @editMode="viewMode=false")
    TaskDetailsEdit(v-else :taskId="taskId" @close="$emit('close')")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TaskDetailsView from '@/components/Modal/TaskDetails/TaskDetailsView.vue';
import TaskDetailsEdit from '@/components/Modal/TaskDetails/TaskDetailsEdit.vue';

@Component({
  components: {
    TaskDetailsView,
    TaskDetailsEdit,
  },
})
export default class TaskDetails extends Vue {
  viewMode = true;

  @Prop() taskId!: string;
}
</script>

<style lang="less" scoped>

</style>
