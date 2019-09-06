import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from 'firebase';

Vue.config.productionTip = false;

let app = '';
//configuration firebase created with srinivas-gundali@entropia.com
const config = {
  apiKey: "AIzaSyBJGOMf9UwwkIeuvwlgk2YE91rrSgTqiOA",
  authDomain: "vue-project-b5233.firebaseapp.com",
  databaseURL: "https://vue-project-b5233.firebaseio.com",
  projectId: "vue-project-b5233",
  storageBucket: "",
  messagingSenderId: "1005033467904",
  appId: "1:1005033467904:web:78ab9e3d3160d252d8e8e5"
};
import jQuery from  'jquery';
window.$=window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap'; 
import './assets/app.scss';
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

 