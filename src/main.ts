import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

Vue.filter('humanDate', (value: any) => {
  if (!value) return '';
  const date = new Date(parseInt(value, 10) * 1000);
  return `${
    date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
