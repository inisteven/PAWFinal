<template>
  <div>
    <navbar-component></navbar-component>
    <div class="back">
      <!-- <img src="@/assets/LandingPage.jpg" class="d-block w-100" alt="..." /> -->
      <v-row align="center" justify="center"> </v-row>
      <!-- <v-spacer></v-spacer> -->
      <hr style="height: 220pt; visibility: hidden" />
      <div align="center">
        <h1 class="black--text font-weight-bold v-input">Cool Style, Cool Life</h1>
        <h3 class="black--text v-input2">Find your true style here</h3>
        <br />
        <div class="my-2" align="center" justify="center">
          <v-btn depressed class="black white--text" href="#section2">SHOP NOW</v-btn>
        </div>
      </div>
      <hr style="height: 220pt; visibility: hidden" />
    </div>
    <v-container class="lighten-5 mb-6 categori" id="section2">
      <v-row>
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
      <v-row>
        <h1 class="mt-10 mb-10 display-1 font-weight-bold" align="center">Hot Item</h1>
      </v-row>
      <v-row>
        <v-col>
          <router-link :to="'/detailMan/' + man.id_produkM">
                <img :src="this.$url+man.gambar_produkM" alt="Image" width="250px" />
          </router-link>
          <h5>{{man.nama_produkM}}</h5>
          <p>IDR {{ man.harga_produkM }}</p>
        </v-col>
        <v-col>
          <router-link :to="'/detailWoman/' + woman.id_produkW">
                <img :src="this.$url+woman.gambar_produkW" alt="Image" width="250px" />
          </router-link>
          <h5>{{woman.nama_produkW}}</h5>
          <p>IDR {{ woman.harga_produkW }}</p>
        </v-col>
        <v-col>
          <router-link :to="'/detailAcc/' + acc.id_aksesoris">
                <img :src="this.$url+acc.gambar_aksesoris" alt="Image" width="250px" />
          </router-link>
          <h5>{{acc.nama_aksesoris}}</h5>
          <p>IDR {{ acc.harga_aksesoris}}</p>
        </v-col>
      </v-row>
    </v-container>
    <!-- <br /><br />
    <div class="hot-item">
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-bold mb-4"></h1>
      </v-col>
      <template>
        

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
    </div> -->
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
      man:{
        id_produkM: '',
        harga_produkM: '',
        deskripsi_produkM: '',
        gambar_produkM: '',
        stok: '',
      },
      woman:{
        id_produkW: '',
        harga_produkW: '',
        deskripsi_produkW: '',
        gambar_produkW: '',
        stok: '',
      },
      acc:{
        id_aksesoris: '',
        harga_aksesoris: '',
        deskripsi_aksesoris: '',
        gambar_aksesoris: '',
        stok: '',
      },
      jumbotron: { backgroundImage: `url(${require("@/assets/LandingPage.jpg")})` },
    };
  },
  methods:{
    getRandomMan(){
      var url = this.$api + "/man-random";
      this.$http.get(url)
        .then((response) => {
          this.man = response.data.data;
          console.log(this.man.id_produkM);
        });
    },
    getRandomWoman(){
      var url = this.$api + "/woman-random";
      this.$http
        .get(
          url
        )
        .then((response) => {
          this.woman = response.data.data;
        });
    },
    getRandomAcc(){
      var url = this.$api + "/acc-random";
      this.$http
        .get(
          url
        )
        .then((response) => {
          this.acc = response.data.data;
        });
    }
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  mounted(){
    this.getRandomMan();
    this.getRandomWoman();
    this.getRandomAcc();
  }
};
</script>

<style scoped>
.back {
  background-image: url(../assets/LandingPage.jpg);
  background-attachment: fixed;
  background-size: cover;
  position: center;
  background-repeat: no-repeat;
}
html {
  scroll-behavior: smooth;
}
.v-input {
  font-size: 4.2em;
  justify-content: center;
}
.v-input2 {
  font-size: 2.2em;
  justify-content: center;
}
</style>
