import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  createModule, action, mutation, extractVuexModule, createProxy,
} from 'vuex-class-component';
import {
  Task, UserProfile, Comment,
} from '@/types';
import fetchRandomTasks from '@/service/fetchTasks';

Vue.use(Vuex);

const VuexModule = createModule();

class TestStore extends VuexModule {
  private taskFetched = false;

  private tasks: Task[] = [];

  private dateRange: any = null;

  private titleFilter: string = '';

  private currentUser = {
    name: 'Jean Gonzales',
    group: 'Product Owner',
    image: '1.jpg',
  };

  private imageNotify = 3;

  private articles = [
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
  ];

  get getDateRange(): any {
    return this.dateRange;
  }

  get getTitleFilter(): string {
    return this.titleFilter;
  }

  get getTasks(): Task[] {
    return this.tasks;
  }

  get getImageNotify(): number {
    return this.imageNotify;
  }

  get getUserProfile():UserProfile {
    return this.currentUser;
  }

  get getArticles():Comment[] {
    return this.articles;
  }

  get getCommentFiles(): string[] {
    const result: string[] = [];
    this.articles.forEach((article) => {
      article.images.forEach(img => result.push(img));
    });
    return result;
  }

  get getLastTaskId(): number {
    return parseInt(this.tasks[this.tasks.length - 1].id, 10);
  }

  @mutation setTitleFilter(filter: string) {
    this.titleFilter = filter;
  }

  @mutation setDateRange(range: any) {
    this.dateRange = range;
  }

  @mutation setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  @mutation setTasksFatched(status: boolean) {
    this.taskFetched = status;
  }

  @mutation changeTask(newTask: Task) {
    this.tasks = this.tasks.map((el) => {
      if (el.id === newTask.id) {
        return newTask;
      }
      return el;
    });
  }

  @mutation addTask(newTask: Task) {
    this.tasks.push(newTask);
  }

  @action async fetchTasks() {
    if (this.taskFetched) {
      return;
    }
    this.setTasksFatched(true);
    this.setTasks(await fetchRandomTasks(Math.trunc(Math.random() * 20)));
  }
}

const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(TestStore),
  },
  plugins: [createPersistedState()],
});

export default store;

const vxm = {
  user: createProxy(store, TestStore),
};
