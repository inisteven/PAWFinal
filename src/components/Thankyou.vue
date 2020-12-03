<template>
  <div id="app">
    <navbar-component></navbar-component>
    <div class="back">
      <h1>Thank you for shopping with LOGO</h1>
      <h1>You've made a great choice</h1>

      <v-btn class="black white--text" text router to="/home" dark
        >BACK TO STORE</v-btn
      >
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
  margin-left: 100px;
  margin-top: 100px;
  margin-bottom: 200px;
}
</style>
