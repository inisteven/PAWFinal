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
            <div v-if="!isLoggedIn">
              <v-btn height="65px" text router to="/signIn">Sign in</v-btn>
              <v-btn height="65px" text router to="/signUp">Sign Up</v-btn>
              <ejs-dropdownlist :dataSource='option' placeholder="Hello">

              </ejs-dropdownlist>
            </div>
            <div v-else>
              
              <b-nav-item router to="/cart"> <img :src="cart" class="align-top logo" alt="Logo" width="60px"  /> </b-nav-item>
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
  </header>
</template>

<script>

import image from "../assets/logoHitam.png";
import cart from "../assets/cart.png";
export default {
  data: function () {
    return {
      option:["Profile","Logout"],
      // option:[
      //   {id: "profle", text: "Profile",to: ""},
      //   {id: "logout",text: "Logout",to: ""},
      // ],
      fields: { value:'id' , text:"text"},
      isLoggedIn: this.$localStorage.getItem('isLoggedIn'),
      image: image,
      cart: cart,
      test: 'benny',
      search: "",
    };
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
