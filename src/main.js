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
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import 'popper.js';
import 'bootstrap';
//import './assets/sb-admin-2.min'
import './assets/app.scss';
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret
} from '@fortawesome/free-solid-svg-icons'

import {
  FontAwesomeBrandsIcon
} from '@fortawesome/free-brands-svg-icons'
//import { FontAwesomeRegularIcon } from' @fortawesome/free-regular-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)

//Vue.component('font-awesome-icon', FontAwesomeIcon)

firebase.initializeApp(config);






let appServer = process.env.VUE_APP_BACKEND_SERVER;
console.log("appServer " + appServer);
var currentUser = "";
if (appServer == "Firebase") {
  console.log("checking authentication for firebase user");
  currentUser = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      /* eslint-disable no-new */
      app = new Vue({
        router,
        // mode: 'History',
        render: h => h(App)
      }).$mount('#app');
    }
  });
} else if (appServer == "Laravel") {
  console.log("checking authentication for laravel user");
  //currentUser = JSON.parse(localStorage.getItem('userDetails'));
  //if(currentUser==''){
  //if (!app) {
  /* eslint-disable no-new */
  app = new Vue({
    router,
    // mode: 'History',
    render: h => h(App)
  }).$mount('#app');
  // }
  //}
}