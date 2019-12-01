import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Tasks from '@/views/Tasks.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      component: Home,
    },
    {
      name: 'tasks',
      path: '/tasks',
      component: Tasks,
    },
  ],
});
