import Vue from 'vue';
import Router from 'vue-router';
import Activity from '@/views/Home.vue';
import Tasks from '@/views/Tasks.vue';
import NotFound from '@/views/NotFound.vue';
import UnderConstruction from '@/views/UnderConstruction.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
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
      component: UnderConstruction,
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
      component: UnderConstruction,
      props: { linkDescription: 'Files' },
    },
    {
      name: 'notFound',
      path: '*',
      component: NotFound,
    },
  ],
});
