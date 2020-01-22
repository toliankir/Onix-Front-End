<template lang="pug">
  transition(name="modal")
    div.modal-mask
      div.modal-wrapper
        div.modal-container
          div.modal-header
            slot(name="header") {{header}}
          div.modal-body
            //- slot(name="body") {{body}}
            AddTask(v-if="component[0]==='AddTask'")
            TaskDetails(
              v-if="component[0]==='TaskDetails'"
              :taskId="component[1]"
              )
          div.modal-footer
            slot(name="footer") {{footer}}
              button.modal-default-button(@click="$emit('close')") Close
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AddTask from '@/components/AddTask.vue';
import TaskDetails from '@/components/TaskDetails.vue';

@Component({
  components: {
    AddTask,
    TaskDetails,
  },
})
export default class Modal extends Vue {
@Prop() header!: string;

@Prop() body!: string;

@Prop() footer!: string;

@Prop() component!: string;
}
</script>

<style scoped>
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
  width: 300px;
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
</style>
