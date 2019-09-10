import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
import About from '@/views/About';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//Checking user authentication and redirecting to by defult url
router.beforeEach((to, from, next) => {
  let appServer = process.env.VUE_APP_BACKEND_SERVER;
  console.log("appServer "+appServer);
  var currentUser = "";
  if(appServer=="Firebase"){
    console.log("checking authentication for firebase user");
    currentUser = firebase.auth().currentUser;
  }else if(appServer=="Laravel"){
    console.log("checking authentication for laravel user");
     currentUser = JSON.parse(localStorage.getItem('userDetails'));
  }
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;