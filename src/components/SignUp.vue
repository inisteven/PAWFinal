<template>
  <div id="app">
    <navbar-component></navbar-component>
    <v-container class="signup">
      <v-layout row class="text-xs-center justify-center">
        <v-container style="position: center; top: 13%">
          <v-card xs4 rounded class="mx-auto" max-width="400" style="padding: 30px; margin: 40px; opacity: 0.9">
            <div class="text-center">
              <h2>Create Account</h2>
            </div>
            <br />
            <v-form>
              <subtitle-1>First Name*</subtitle-1>
              <v-text-field solo name="FirstName" label="First Name" required></v-text-field>

              <subtitle-1>Last Name*</subtitle-1>
              <v-text-field solo name="LastName" label="Last Name" required></v-text-field>

              <subtitle-1>Email</subtitle-1>
              <v-text-field solo name="Email" label="Email" required></v-text-field>

              <subtitle-1>Username</subtitle-1>
              <v-text-field solo name="Username" label="Username" required></v-text-field>

              <subtitle-1>Password</subtitle-1>
              <v-text-field solo name="Password" type="password" label="Password" required></v-text-field>

              <subtitle-1>Confirm Password</subtitle-1>
              <v-text-field solo name="confPass" type="password" label="Confirm Password" required></v-text-field>

              <v-card-actions>
                <v-btn primary>Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="blue lighten-3">Sign Up</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
    <footer-component></footer-component>
  </div>
</template>

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
<style>
  .signup {
    background-image: url(../assets/signUp.jpg);
    width: 5000px;
    background-attachment: fixed;
    background-size: cover;
    position: center;
    background-repeat: no-repeat;
}
</style>
