import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(VCalendar);

Vue.filter('humanDate', (value: any) => {
  if (!value) return '';
  const date = new Date(parseInt(value, 10) * 1000);
  return `${
    date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
});

Vue.filter('periodDate', (value: any) => {
  if (!value) return '';
  const timePeriod = parseInt(value, 10);
  if (timePeriod <= 0) {
    return 'expired';
  }
  const secInDay = 86400;
  const secInHour = 3600;
  const secInMin = 60;
  const days = Math.trunc(timePeriod / secInDay);
  const hours = Math.trunc((timePeriod - (days * secInDay)) / secInHour);
  const mins = Math.trunc((timePeriod - (days * secInDay) - (hours * secInHour)) / secInMin);
  const secs = Math.trunc((timePeriod - (days * secInDay) - (hours * secInHour)
    - (mins * secInMin)));
  return `${days > 1 ? `${days} days` : ''} ${days === 1 ? `${days} day` : ''} ${
    hours.toString().padStart(2, '0')}:${
    mins.toString().padStart(2, '0')}:${
    secs.toString().padStart(2, '0')}`;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
