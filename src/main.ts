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
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
