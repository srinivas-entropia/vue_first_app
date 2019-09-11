<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->

    <div class="sidebar-brand-icon rotate-n-15">
      <i class="fas fa-laugh-wink"></i>
    </div>
    <div class="sidebar-brand-text mx-3">
      <router-link
        class="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >SB Admin</router-link>
    </div>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" to="/">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </router-link>
      <!--<a class="nav-link" href="index.html">
          <i class="fas fa-fw fa-tachometer-alt"></i>
      <span>Dashboard</span></a>-->
    </li>
  </ul>

  <!--<div id="nav">
      
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/sign-up">Signup</router-link> |
  </div>-->
</template>
<script>
export default {
  name: "header-component",

  data() {
    return {
      userStatus: JSON.parse(localStorage.getItem("userDetails"))
    };
  }

  // if(JSON.parse(localStorage.getItem('userDetails')))
};
</script>