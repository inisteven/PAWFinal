<template>
  <div>
    <navbar-component></navbar-component>
    <div>
      <img src="@/assets/LandingPage.jpg" class="d-block w-100" alt="..." />
      <v-row align="center" justify="center"> </v-row>
    </div>

    <v-spacer></v-spacer>
    <br />

    <v-container class="lighten-5 mb-6 categori">
      <v-row style="height: 150px">
        <v-col>
          <router-link to="/man">
            <img src="@/assets/manHome.png" alt="Image" width="350px" />
          </router-link>
        </v-col>
        <v-col>
          <router-link to="/woman">
            <img src="@/assets/womanHome.png" alt="Image" width="350px" />
          </router-link>
        </v-col>
        <v-col>
          <router-link to="/acc">
            <img src="@/assets/accessoriesHome.png" alt="Image" width="350px" />
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <br /><br />
    <div class="hot-item">
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-bold mb-4"></h1>
      </v-col>
      <template>
        <h1 class="display-1 font-weight-bold" align="center">Hot Item</h1>

        <v-container>
          <v-row class="text-center">
            <v-col ols="12" sm="4">
              <router-link to="/detail">
                <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
              </router-link>
              <h5>Long cotton blend cardigan</h5>
              <p>IDR 50.0000</p>
            </v-col>
            <v-col ols="12" sm="4">
              <router-link to="/detail">
                <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
              </router-link>
              <h5>Long cotton blend cardigan</h5>
              <p>IDR 50.0000</p>
            </v-col>
            <v-col ols="12" sm="4">
              <router-link to="/detail">
                <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
              </router-link>
              <h5>Long cotton blend cardigan</h5>
              <p>IDR 50.0000</p></v-col
            >
          </v-row>
        </v-container>
      </template>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<script>
import Header from "./Navbar.vue";
import Footer from "./Footer.vue";
export default {
  name: "Homepage",
  data: function () {
    return {
      jumbotron: { backgroundImage: `url(${require("@/assets/LandingPage.jpg")})` },
    };
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
