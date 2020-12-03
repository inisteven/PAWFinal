<template>
  <v-main class="list">
    <navbar-component></navbar-component>
    <div>
      <v-img
        :src="require('@/assets/manPage.png')"
        class="d-block w-100"
        alt="manPic"
      ></v-img>
      <v-row align="center" justify="center"> </v-row>
    </div>

    <template>
      <v-container>
        <v-row class="text-center">
          <v-col
            v-for="item in filteredList"
            :key="item.nama_produkM"
            class="col-sm-12 col-md-4"
          >
            <b-card
              id="my-card"
              img-src="http://127.0.0.1:8000/products/IMG_1606926083.jpeg"
              style="max-width: 300px"
              class="my-5"
              img-top
            >
              <b-text
                ><strong>{{ item.nama_produkM }}</strong></b-text
              >
              <p>IDR {{ item.harga_produkM }}</p>
            </b-card>
          </v-col>
        </v-row>
        <div class="text-xs-center my-5">
          <v-pagination v-model="page" :length="4" circle></v-pagination>
        </div>
      </v-container>
    </template>
    <template> </template>
    <footer-component></footer-component>
  </v-main>
</template>

<script>
import Header from "../Navbar.vue";
import Footer from "../Footer.vue";
export default {
  // name:"Man",
  data() {
    return {
      products: [],
      filter: {},
      search: "",
    };
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  methods: {
    readData() {
      var url = this.$api + "/man";
      this.$http
        .get(
          url
          //{ headers: {
          //     'Authorization': 'Bearer ' + localStorage.getItem('token')
          // }}
        )
        .then((response) => {
          this.products = response.data.data;
        });
    },
  },
  computed: {
    filteredList() {
      return this.products.filter((product) => {
        return product.nama_produkM
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
