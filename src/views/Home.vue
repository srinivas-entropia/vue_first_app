<template>
  <div class="home">
    <h3>{{msg}} </h3>
    <button @click="logout">Logout</button>
  </div>

 
      
</template>

<script>
console.log(process.env.VUE_APP_ROOT_API);
import firebase from 'firebase';

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    
    logout: function() {
      //console.log(this.msg);
      localStorage.setItem('userDetails', JSON.stringify(null));
      //console.log(JSON.parse(localStorage.getItem('userDetails')));
     // return false;
      firebase.auth().signOut().then(() => {
       
        this.$router.replace('login')
      })
    }
  },
  data() {
      return {
        msg: '',
        dashBoardData:'',
        
      }
    },
    created() {
      this.fetchData()
     
    },

    watch: {
      '$route': 'fetchData'
    },
    
  methods: {
      fetchData() { 
        axios.get('http://172.31.99.61:80/laravel-apps/laravel-api/public/api/dashboard-data/',{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET',
            'Access-Control-Allow-Origin': '*',
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          
          })
        .then((resp) => {
          console.log(resp);
         
        })
        .catch((err) => {
          console.log(err)
        })
      },
      
       
    },
  mounted() {
    console.log('App mounted!');
    if (localStorage.getItem('userDetails')) { 
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(this.userDetails){
        this.msg="Hello "+this.userDetails.email+", Welcome to Vue SPA APP";
      }else{
        this.msg="Hello Guest Welcome to Vue SPA APP";
      }
        
    }else{
       this.msg="Hello Guest Welcome to Vue SPA APP";
    }
    //var userdetails =  JSON.parse(localStorage.getItem('userDetails'));
   
    //console.log(this.userDetails.email);

  },
}
</script>