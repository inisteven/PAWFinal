<template>
  <v-main class="list">
    <navbar-component></navbar-component>
    <div>
      <v-img :src="require('@/assets/manPage.png')" class="d-block w-100" alt="manPic"></v-img>
      <v-row align="center" justify="center"> </v-row>
    </div>

    <template>
      <v-container>
        <v-row class="text-center">
          <v-col v-for="item in filteredList" :key="item.nama_produkM" class="col-sm-12 col-md-4">
            <router-link :to="'/detail/' + item.id_produkM">
              <img :src="'http://127.0.0.1:8000/products/' + item.gambar_produkM" alt="Image" width="250px" />
            </router-link>
            <h5>{{ item.nama_produkM }}</h5>
            <p>IDR {{ item.harga_produkM }}</p>
          </v-col>
        </v-row>
        <div class="text-xs-center my-5">
          <v-pagination v-model="pagination.current" :length="pagination.total" @input="onPageChange" circle></v-pagination>
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
      pagination: {
        current: 1,
        total: 0,
      },
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
          this.pagination.current = response.data.current_page;
          this.pagination.total = response.data.last_page;
        });
    },
    onPageChange(){
      this.readData();
    }
  },
  computed: {
    filteredList() {
      return this.products.filter((product) => {
        return product.nama_produkM.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
