<template>
  <div id="app">
    <navbar-component></navbar-component>
    <div class="back">
      <v-container class="signup">
        <v-row align="center" justify="center">
          <v-col class="col-md-5 col-xs-0">
            <v-card style="padding: 30px; opacity: 0.9">
              <v-card-title>
                <div class="text-center mb-5">
                  <h2>Create Account</h2>
                </div>
              </v-card-title>
              <v-card-body>
                <v-form v-model="validSignUp" ref="formSignUp">
                  <v-row>
                    <v-col class="col-xs-2">
                      <subtitle-1>First Name*</subtitle-1>
                      <v-text-field required :rules="firstRules" solo v-model="firstName" label="First Name"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-xs-2">
                      <subtitle-1>Last Name*</subtitle-1>
                      <v-text-field solo :rules="lastRules" v-model="lastName" label="Last Name" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-xs-2">
                      <subtitle-1>Email</subtitle-1>
                      <v-text-field solo v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-xs-2">
                      <subtitle-1>Password</subtitle-1>
                      <v-text-field solo v-model="password" type="password" :rules="passwordRules" label="Password" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-xs-2">
                      <subtitle-1>Confirm Password</subtitle-1>
                      <v-text-field solo v-model="confirmPassword" type="password" :rules="confirmPasswordRules" label="Confirm Password" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn class="ml-15 grey darken-3 white--text" @click="cancel">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-15 primary" @click="submit">Sign Up</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-body>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "./Navbar.vue";
import Footer from "./Footer.vue";
export default {
  data() {
    return {
      snackbar: false,
      error_message: "",
      color: "",
      validSignUp: false,
      firstName: "",
      firstRules: [(v) => !!v || "First name is required"],
      lastName: "",
      lastRules: [(v) => !!v || "Last name is required"],
      email: "",
      emailRules: [(v) => !!v || "Email is required", (v) => /.+@.+\..+/.test(v) || "Email is invalid"],
      password: "",
      passwordRules: [(v) => !!v || "Password is required", (v) => (v && v.length >= 6) || "Password must be at least 6 characters"],
      confirmPassword: "",
      confirmPasswordRules: [(v) => !!v || "Confirm password is required", (v) => (v && v.length >= 6) || "Confirm password must be at least 6 characters", (v) => v === this.password || "Confirm password does not match"],
    };
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  methods: {
    submit() {
      if (this.$refs.formSignUp.validate()) {
        this.$http
          .post(this.$api + "/register", {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.cancel();
            this.$router.push({
              name: "Sign In",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    cancel() {
      this.$refs.formSignUp.reset();
    },
  },
};
</script>
<style scoped>
.back {
  background-image: url(../assets/signUp.jpg);
  background-attachment: fixed;
  background-size: cover;
  position: center;
  background-repeat: no-repeat;
}

.v-text-field input {
  font-size: 1.2em;
}
</style>
