import Vue from 'vue';
import Router from 'vue-router';
import Activity from '@/views/Home.vue';
import Tasks from '@/views/Tasks.vue';
import Kanban from '@/views/Kanban.vue';
import Files from '@/views/Files.vue';
import NotFound from '@/views/NotFound.vue';
import UnderConstruction from '@/views/UnderConstruction.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/tasks',
    },
    {
      name: 'tasks',
      path: '/tasks',
      component: Tasks,
    },
    {
      name: 'activity',
      path: '/activity',
      component: Activity,
    },
    {
      name: 'kanban',
      path: '/kanban',
      component: Kanban,
      props: { linkDescription: 'Kanban' },
    },
    {
      name: 'calendar',
      path: '/calendar',
      component: UnderConstruction,
      props: { linkDescription: 'Calendar' },
    },
    {
      name: 'files',
      path: '/files',
      component: Files,
      props: { linkDescription: 'Files' },
    },
    {
      name: 'notFound',
      path: '*',
      component: NotFound,
    },
  ],
});
