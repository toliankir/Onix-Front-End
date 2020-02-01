import Vue from 'vue';
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex';
import {
  Task, UserProfile, TaskStatus, Comment,
} from '@/types';
import db from '@/firestore';

Vue.use(Vuex);
interface State {
    tasks: Task[],
    imageNotify: number,
    currentUser: UserProfile,
    articles: Comment[],
}

const getters: GetterTree<State, any> = {
  getTasks: state => state.tasks,
  getImageNotify: state => state.imageNotify,
  getUserProfile: state => state.currentUser,
  getArticles: state => state.articles,
  getCommentFiles: (state): string[] => {
    const result: string[] = [];
    state.articles.forEach((article) => {
      article.images.forEach(img => result.push(img));
    });
    return result;
  },
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
          expdate: '',
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
  articles: [
    {
      data: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
      comments: [],
      images: [],
      date: '22:12',
      icon: { type: 'ok', color: 'green' },
    },
    {
      data: 'Emelee Simchenko commented on Account for teams and personal in bottom style',
      comments: [
        'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
      ],
      images: [],
      date: '7:32 PM',
      icon: { type: 'comment', color: 'yellow' },
    },
    {
      data: 'Driaka Samak uploaded 4 files on An option to search in current projects or in all projects',
      comments: [],
      images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
      date: '6:02 PM',
      icon: { type: 'download', color: 'blue' },
    },
  ],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
