<template>
  <div>
    <navbar-component></navbar-component>
    <br />
    <h1 class="font-weight-black text-center">PAYMENT</h1>
    <v-row>
        <h2 class="font-weight-black">Shipping Info</h2>
        <v-col>
            <div class="mt-5" style="margin: 60px">
                <subtitle-1>Name</subtitle-1>
                <v-text-field solo name="name" label="Name"></v-text-field>
                <subtitle-1>Phone Number</subtitle-1>
                <v-text-field solo name="phoneNumber" label="Phone Number" type="password"></v-text-field>
        </div>
      </v-col>
    </v-row>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
