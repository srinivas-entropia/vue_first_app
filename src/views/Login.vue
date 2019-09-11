<template>
  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Login!</h1>
                  </div>
                  <div v-if="errors.length" class="alert alert-danger">
                    <b>Please correct the following error(s):</b>
                    <ul>
                      <li class="alert alert-danger" v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <input style="width:100%" v-model="email" type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address...">
                    </div>
                    <div class="form-group">
                      <input style="width:100%" v-model="password" type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password">
                    </div>
                    
                    <a  @click="login" href="#" class="btn btn-primary btn-user btn-block">
                      Login
                    </a>
                    <hr>
                    
                  </form>
                  
                  
                  <div class="text-center">
                    <p><router-link to="/sign-up">Create an Account!</router-link></p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <!-- <div class="login">
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
  </div> -->
</template>

<script>

//console.log(globalReadOnlyProperty);
  import firebase from 'firebase';
  import axios from 'axios';
  import router from '../router'
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
                this.$router.replace('login');
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
            var bodyFormData = new FormData();
            bodyFormData.set('email', this.email);
            bodyFormData.set('password', this.password);
            if (!this.email) {
              this.errors.push('email required.');
            }
            if (!this.password) {
              this.errors.push('password required.');
            }
            axios({
            method: 'post',
            url: process.env.VUE_APP_ROOT_API+'login',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                var responseData= response.data.data;
                if(responseData.status == 'success'){
                  alert("Welcome "+responseData.result.email+", You are successfully logged in.");
                  localStorage.setItem('userDetails', JSON.stringify(responseData.result));
                  router.replace('home');
                }else{
                  alert("Invalid Credentials");
                  router.replace('login');
                }
                
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                router.replace('login');
            });
            
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