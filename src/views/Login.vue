<template>
  <div class="login">
    <h3>Sign In</h3>
    
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li style="color:red" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Login</button>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>

//console.log(globalReadOnlyProperty);
  import firebase from 'firebase';
  
  export default {
    name: 'login',
    data() {
      return {
        email: null,
        password: null,
        errors:[],
      }
    },
    
    methods: {
      login: function() {
       
       // return false;
       //checking backend server and authenticating 
       //console.log(app.config.appServer);
       let appServer = process.env.VUE_APP_BACKEND_SERVER;
        if(appServer=="Firebase"){
          if (this.email && this.password) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
              (user) => {
                console.log(user.user.email);
                alert("Welcome "+user.user.email+", You are successfully logged in.");
                localStorage.setItem('userDetails', JSON.stringify(user.user));
                this.$router.replace('home')
              },
              (err) => {
                alert('Oops. ' + err.message)
              }
            );
          }
          //validating user here and pushing error message to error array for displyaing error messages in login form
          if (!this.email) {
            this.errors.push('email required.');
          }
          if (!this.password) {
            this.errors.push('password required.');
          }
        }else if(appServer=="Laravel"){
          if (!this.email) {
            this.errors.push('email required.');
          }
          if (!this.password) {
            this.errors.push('password required.');
          }
        }

        
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>