import Vue from 'vue';
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Task, UserProfile, TaskStatus } from '@/types';
import db from '@/firestore';

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
    console.log('Fetch tasks from firebase');
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
  fetchTasksFirestore(store) {
    db.collection('test').onSnapshot((data: any) => {
      const tasks: Task[] = [];
      data.forEach((el: any) => {
        tasks.push({
          id: el.id,
          title: el.data().title,
          description: el.data().description,
          date: '',
          status: TaskStatus.todo,
        });
      });
      store.commit('setTasks', tasks);
    });
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
