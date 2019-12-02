import Vue from 'vue';
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Task, UserProfile } from '@/types';

Vue.use(Vuex);

interface State {
    tasks: Task[],
    imageNotify: number,
    currentUser: UserProfile,
}

const getters: GetterTree<State, any> = {
  getTasks: state => state.tasks,
  getImageNotify: state => state.imageNotify,
  getUserProfile: state => state.currentUser,
};

const mutations: MutationTree<State> = {
  changeTest(state, payload) {
    state.tasks[0].date = payload;
  },
  setTasks(state, payload) {
    state.tasks = payload;
  },
  setUserProfile(state, payload) {
    state.currentUser = payload;
  },
  setImageNotify(state, payload) {
    state.imageNotify = payload;
  },
};

const actions: ActionTree<State, any> = {
  fetchTasks(store) {
    const tasks = [
      { title: 'Task 1', description: 'Task 1 description', date: '1' },
      { title: 'Task 2', description: 'Task 2 description', date: '2' },
      { title: 'Task 3', description: 'Task 3 description', date: '3' },
      { title: 'Task 4', description: 'Task 4 description', date: '4' },
    ];
    setTimeout(() => store.commit('setTasks', tasks), Math.random() * 1000);
  },
  fetchCurrentUser(store) {
    const userProfile = {
      name: 'Jean Gonzales',
      group: 'Product Owner',
      image: '1.jpg',
    };
    setTimeout(() => store.commit('setUserProfile', userProfile), Math.random() * 1000);
  },
};

const state: State = {
  tasks: [],
  currentUser: {
    name: '...',
    image: '',
    group: '...',
  },
  imageNotify: 3,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
