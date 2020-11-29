<template>
  <div id="app">
    <navbar-component></navbar-component>
    <v-container class="login">
      <v-layout row class="text-xs-center justify-center">
        <v-container style="position: center; top: 13%">
          <v-card xs4 class="mx-auto" max-width="400" style="padding: 16px; margin: 40px; opacity: 0.9">
            <div class="text-center">
              <h2>Sign In</h2>
            </div>
            <br />
            <v-form>
              <subtitle-1>Email</subtitle-1>
              <v-text-field solo name="Email" label="Email"></v-text-field>
              <subtitle-1>Password</subtitle-1>
              <v-text-field solo name="Password" label="Password" type="password"></v-text-field>
              <v-card-actions>
                <v-btn primary>Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="blue lighten-3">Sign in</v-btn>
              </v-card-actions>
              <br />
              <div class="text-center">
                <subtitle-2 class="text-center">Don't have account? <router-link to="signUp">Sign Up Here</router-link></subtitle-2>
              </div>
            </v-form>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
    <footer-component></footer-component>
  </div>
</template>

<style>
.login {
  background-image: url(../assets/signIn.png);
  width: 5000px;
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
    components: {
      'navbar-component' : Header,
      'footer-component' : Footer,
    }
}
</script>
