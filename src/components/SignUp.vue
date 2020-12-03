<template>
  <div id="app">
    <navbar-component></navbar-component>
    <div class="back">
    <v-container class="signup">
          <v-row align="center" justify="center">
            <v-col class="col-md-5 col-xs-0">
              <v-card  style="padding: 30px; opacity: 0.9">
                <v-card-title>
                  <div class="text-center mb-5">
                    <h2>Create Account</h2>
                  </div>
                </v-card-title>
                <v-card-body>
                  <v-form>
                    <v-row>
                      <v-col class="col-xs-2">
                        <subtitle-1>First Name*</subtitle-1>
                        <v-text-field solo name="FirstName" label="First Name" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-xs-2">
                        <subtitle-1>Last Name*</subtitle-1>
                        <v-text-field solo name="LastName" label="Last Name" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-xs-2">
                        <subtitle-1>Email</subtitle-1>
                        <v-text-field solo name="Email" label="Email" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-xs-2">
                        <subtitle-1>Password</subtitle-1>
                        <v-text-field solo name="Password" type="password" label="Password" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-xs-2">
                        <subtitle-1>Confirm Password</subtitle-1>
                        <v-text-field solo name="confPass" type="password" label="Confirm Password" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-btn primary>Cancel</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn class="blue lighten-3">Sign Up</v-btn>
                    </v-card-actions>
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

.back{
  background-image: url(../assets/signUp.jpg);
      background-attachment: fixed;
    background-size: cover;
    position: center;
    background-repeat: no-repeat;
}
</style>
