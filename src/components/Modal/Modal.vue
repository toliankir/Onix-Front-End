<template lang="pug">
  transition(name="modal")
    div.modal-mask
      div.modal-wrapper(@click="closeOnOutClick")
        div.modal-container()
          div.modal-header
            slot(name="header") {{component[1]}}
          div.modal-body
            AddTask(v-if="component[0]==='AddTask'" @close="$emit('close')")
            TaskDetails(
              v-if="component[0]==='TaskDetails'"
              :taskId="component[2]"
              @close="$emit('close')")
          div.modal-footer
            slot(name="footer")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AddTask from '@/components/Modal/AddTask.vue';
import TaskDetails from '@/components/Modal/TaskDetails/TaskDetails.vue';

@Component({
  components: {
    AddTask,
    TaskDetails,
  },
})
export default class Modal extends Vue {
@Prop() footer!: string;

@Prop() component!: string;

closeOnOutClick(event: any) {
  if (event.target.classList.contains('modal-wrapper')) {
    this.$emit('close');
  }
}
}
</script>

<style lang="less">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.input-warning {
  background-color: #ca5660;
}
</style>
