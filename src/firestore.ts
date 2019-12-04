import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyACt5zA0pZTx--qb9ZSBeUSliWCvIh_Bmk',
  authDomain: 'vuefire-98eba.firebaseapp.com',
  databaseURL: 'https://vuefire-98eba.firebaseio.com',
  projectId: 'vuefire-98eba',
  storageBucket: 'vuefire-98eba.appspot.com',
  messagingSenderId: '611074059259',
  appId: '1:611074059259:web:28a548232c720d870ab95e',
  measurementId: 'G-PL9YZHG3GC',
};

const db = firebase.initializeApp(firebaseConfig).firestore();
export default db;
