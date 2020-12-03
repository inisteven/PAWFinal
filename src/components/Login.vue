<template>
  <div id="app">
    <navbar-component></navbar-component>
    <div class="back">
      <v-container class="signup">
        <v-row align="center" justify="center">
          <v-col class="col-md-5 col-xs-0">
            <v-card style="padding: 16px; margin: 40px; opacity: 0.9">
              <v-card-title>
                <h2 class="text-center">Sign In</h2>
              </v-card-title>
              <v-card-body>
                <v-form>
                  <subtitle-1>Email</subtitle-1>
                  <v-text-field solo name="Email" label="Email"></v-text-field>
                  <subtitle-1>Password</subtitle-1>
                  <v-text-field
                    solo
                    name="Password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn primary>Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="blue lighten-3">Sign in</v-btn>
                  </v-card-actions>
                  <br />
                  <div class="text-center">
                    <subtitle-2 class="text-center"
                      >Don't have account?
                      <router-link to="signUp"
                        >Sign Up Here</router-link
                      ></subtitle-2
                    >
                  </div>
                </v-form>
              </v-card-body>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
<style>
.back {
  background-image: url(../assets/signIn.png);
  background-attachment: fixed;
  background-size: cover;
  position: center;
  background-repeat: no-repeat;
}
</style>
