<template>
  <header>
    <b-nav class="navbar navbar-expand-md">
      <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <v-text-field v-model="search" hide-details prepend-icon="mdi-magnify" label="Search our item" single-line></v-text-field>
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <b-navbar-brand href="#">
          <img :src="image" class="d-inline-block align-top logo" alt="Logo" width="220px" />
        </b-navbar-brand>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <b-navbar-nav class="ml-auto" variant="dark">
            <div v-if="isLoggedIn" style="margin-top: 20px; margin-right: -45px">
              <v-btn v-model="username" text router to="/profile" small><v-icon>mdi-account</v-icon>Hi {{ user.first_name }}! </v-btn>

              <!--<v-menu transition="slide-y-transition" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="black--text" text dark v-bind="attrs" v-on="on" v-model="username" text> <v-icon>mdi-account</v-icon>Hi {{ user.first_name }}! </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn text router to="/profile"><v-icon>mdi-account-settings</v-icon>Edit Profile</v-btn>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <v-btn text router @click="logout"><v-icon>mdi-logout</v-icon>Logout</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>-->

              <v-btn text router @click="logout" small><v-icon>mdi-logout</v-icon>Logout</v-btn>
            </div>
            <div v-else>
              <v-btn height="65px" text router to="/signIn">Sign in</v-btn>
              <v-btn height="65px" text router to="/signUp">Sign Up</v-btn>
            </div>

            <div>
              <b-nav-item v-if="isLoggedIn" router to="/cart">
                <div>
                  <v-badge color="red" :content="jumlah">
                    <img :src="cart" class="align-top logo ml-10" alt="Logo" width="40px" />
                  </v-badge>
                </div>
              </b-nav-item>
              <b-nav-item v-else>
                <div>
                  <img :src="cart" class="align-top logo ml-10" alt="Logo" width="40px" /></div
              ></b-nav-item>
            </div>
          </b-navbar-nav>
        </ul>
      </div>
    </b-nav>

    <v-app-bar>
      <v-container>
        <v-row justify="center" align="center">
          <v-toolbar-items>
            <v-col>
              <v-btn height="65px" text router to="/home">Home</v-btn>
              <v-btn height="65px" text router to="/about-us">About Us</v-btn>
              <v-btn height="65px" text router to="/man">Man</v-btn>
              <v-btn height="65px" text router to="/woman">Woman</v-btn>
              <v-btn height="65px" text router to="/acc">Accessories</v-btn>
            </v-col>
          </v-toolbar-items>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-dialog v-model="dialogLogout" max-width="400px">
      <v-card>
        <v-card-title>Do you sure want to logout ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2" @click="cancelLogout" class="mr-3 mb-5">No</v-btn>
          <v-btn color="grey" @click="logoutConfirm" class="mr-3 mb-5">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </header>
</template>

<script>
import image from "../assets/logoHitam.png";
import cart from "../assets/cart2.png";
export default {
  data: function () {
    return {
      fields: { value: "id", text: "text" },
      dialogLogout: false,
      idLogin: "",
      isLoggedIn: false,
      username: "",
      $nama: "Benny",
      image: image,
      cart: cart,
      search: "",
      jumlah: 10, //SELECT (jumlah) from cart where id = idLogin AND isPay = 0
      items: [{ title: "Profile", to: "/profile" }],
    };
  },
  methods: {
    readData() {
      this.idLogin = localStorage.getItem("id");
      this.isLoggedIn = localStorage.getItem("isLoggedIn");
      var url = this.$api + "/user/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data.data;

          this.username = response.data.data.first_name;
          console.log(this.username);
          // this.first_name = response.data.data.first_name;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.loadSnackbar("red", true);
          // localStorage.removeItem('token')
        });
    },
    logout() {
      this.dialogLogout = true;
    },

    logoutConfirm() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      this.$router.push("/signIn");
      this.isLoggedIn = false;
    },
    cancelLogout() {
      this.dialogLogout = false;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
@import url(https://fonts.googleapis.com/css?family=Roboto);
/* * {
    margin: 0;
    padding: 0;
    border: 0 none;
    position: relative;
    outline: none;
} */
.navbar_main {
  position: relative;
  box-sizing: border-box;
  font-size: 1.2rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.4);
}
</style>
