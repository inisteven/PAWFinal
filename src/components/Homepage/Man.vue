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
            id="my-product"
            v-for="item in filteredList"
            :key="item.nama_produkM"
            :current-page="currentPage"
            :per-page="perPage"
            class="col-sm-12 col-md-4"
          >
            <router-link :to="'/detailMan/' + item.id_produkM">
              <img
                :src="'http://127.0.0.1:8000/products/' + item.gambar_produkM"
                alt="Image"
                width="250px"
                height="360px"
              />
            </router-link>
            <h5>{{ item.nama_produkM }}</h5>
            <p>IDR {{ item.harga_produkM }}</p>
          </v-col>
        </v-row>

        <div class="text-xs-center">
          <pagination :data="items" @pagination-change-page="getResult"></pagination>
          <pagination
            v-if="pagination.last_page > 1"
            :pagination="pagination"
            @paginate="getItems()"
          >
          </pagination>

          <v-pagination
            :data="product"
            @input="handlePageChange"
            @pagination-change-page="getResult"
            v-model="pagination.current_page"
            :length="pagination.total"
            circle
          ></v-pagination>
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
        current_page: 1,
        total: 0,
      },
      current_page: 1,
      perPage: 3,
      created() {
        let uri = "api/man";
        this.$http.get(uri).then((response) => {
          this.products = response.data.data;
        });
        this.getResult();
      },
    };
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  methods: {
    getItems() {
      this.$http.get("api/items?page=" + this.pagination.current_page).then((response) => {
        this.products = response.data.data;
        this.pagination = response.data.meta;
      });
    },
    getResult(page) {
      let uri = "/api/man?page= " + page;
      this.$http
        .get(uri)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          this.product = data;
        });
    },
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
    onPageChange() {
      this.readData();
    },
  },
  computed: {
    filteredList() {
      return this.products.filter((product) => {
        return product.nama_produkM.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    rows() {
      return this.products.length;
    },
  },
  pages() {
    return this.pagination.rowsPerPage
      ? Math.ceil(this.items.length / this.pagination.rowsPerPage)
      : 0;
  },
  mounted() {
    this.readData();
  },
};
</script>
