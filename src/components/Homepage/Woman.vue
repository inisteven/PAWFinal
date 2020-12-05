<template>
  <div>
    <navbar-component></navbar-component>
    <div>
      <v-img :src="require('@/assets/womanPage.png')" class="d-block w-100" alt="manPic"></v-img>
      <v-row align="center" justify="center"> </v-row>
    </div>

    <template>
      <v-container>
        <v-row class="text-center">
          <v-col v-for="item in filteredList" :key="item.nama_produkW" class="col-sm-12 col-md-4">
            <router-link :to="'/detailWoman/' + item.id_produkW">
              <img :src="'http://127.0.0.1:8000/products/' + item.gambar_produkW" alt="Image" width="250px" />
            </router-link>
            <h5>{{ item.nama_produkW }}</h5>
            <p>IDR {{ item.harga_produkW }}</p>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination v-model="page" :length="4" circle></v-pagination>
        </div>
      </v-container>
    </template>
    <footer-component></footer-component>
  </div>
</template>
<script>
import Header from "../Navbar.vue";
import Footer from "../Footer.vue";
export default {
  name: "Woman",
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
      var url = this.$api + "/woman";
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
        return product.nama_produkW.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
