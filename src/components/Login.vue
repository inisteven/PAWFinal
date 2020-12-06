<template>
  <div id="app">
    <navbar-component></navbar-component>
    <div class="back">
      <v-container class="login">
        <v-row align="center" justify="center">
          <v-col class="col-md-5 col-xs-0">
            <v-card style="padding: 30px; opacity: 0.9">
              <v-card-title>
                  <h2 class="text-center">Sign In</h2>
              </v-card-title>
              <v-card-body>
                <v-form v-model="validSignIn" ref="formSignIn">
                  <v-row>
                    <v-col class="col-xs-2">
                      <v-text-field
                        required
                        solo
                        type="email"
                        v-model="email"  
                        :rules="emailRules"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-xs-2">
                      <!-- <subtitle-1>Password</subtitle-1> -->
                      <v-text-field 
                        required
                        solo
                        type="password"
                        min="8"
                        v-model="password"  
                        :rules="passwordRules"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn class="ml-15 grey darken-3 white--text" @click="cancel">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-15 primary" @click="submit">Sign In</v-btn>
                  </v-card-actions>
                  <br/>
                    <div class="text-center">
                      <subtitle-2 class="text-center">Don't have account? <router-link to="signUp">Sign Up Here</router-link></subtitle-2>
                    </div>
                </v-form>
              </v-card-body>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>{{ error_message }}</v-snackbar>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "./Navbar.vue";
import Footer from "./Footer.vue";
export default {
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
<style scoped>
.back {
  background-image: url(../assets/signIn.png);
  background-attachment: fixed;
  background-size: cover;
  position: center;
  background-repeat: no-repeat;
}
</style>

<script>
import Header from './Navbar.vue';
import Footer from './Footer.vue';
export default {
    data(){
      return{
        snackbar : false,
        error_message: '',
        color: '',
        validSignIn: false,
        
        email: '',
        emailRules:[
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email is invalid'
        ],
        password: '',
        passwordRules:[
          (v)=> !!v || 'Password is required',
          (v)=> (v && v.length >=6) || 'Password must be at least 6 characters'
        ],
      }
    },
    components: {
      'navbar-component' : Header,
      'footer-component' : Footer,
    },
    methods:{
      cancel(){
        this.$refs.formSignIn.reset()
      },
      submit(){
        if(this.$refs.formSignIn.validate()){
            this.$http.post(this.$api + '/login', {
                email: this.email,
                password: this.password
            }).then(response=>{
                localStorage.setItem('token', response.data.access_token); //menyimpan auth token
                localStorage.setItem('isLoggedIn', true);
                this.error_message = response.data.message;
                if(response.data.status == "success"){
                  this.cancel();
                  localStorage.setItem('id', response.data.user.id);
                  this.loadSnackbar("green",true)
                  this.$router.push({
                      name: 'Homepage'
                  })
                }
                this.loadSnackbar("red",true)
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.loadSnackbar("red",true)
                localStorage.removeItem('token')
                this.load = false
            })
        }
      },
      loadSnackbar(color,bool){
        this.color = color;
        this.snackbar = bool;
      }
    }
}
</script>
