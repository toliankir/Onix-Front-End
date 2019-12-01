import Vue from 'vue';
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Task } from '@/types';

Vue.use(Vuex);

interface State {
    tasks: Task[],
    imageNotify: number,
}

const getters: GetterTree<State, any> = {
  getTasks: state => state.tasks,
  getImageNotify: state => state.imageNotify,
};

const mutations: MutationTree<State> = {
  changeTest(state, payload) {
    state.tasks[0].date = payload;
  },
  setImageNotify(state, payload) {
    state.imageNotify = payload;
  },
};

const actions: ActionTree<State, any> = {

};

const state: State = {
  tasks: [
    { title: 'Task 1', description: 'Task 1 description', date: '1' },
    { title: 'Task 2', description: 'Task 2 description', date: '2' },
    { title: 'Task 3', description: 'Task 3 description', date: '3' },
    { title: 'Task 4', description: 'Task 4 description', date: '4' },
  ],
  imageNotify: 3,
};

export default new Vuex.Store({ state, getters, mutations });
