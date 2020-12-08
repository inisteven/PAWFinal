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
            class="col-sm-12 col-md-4"
          >
            <router-link :to="'/detailMan/' + item.id_produkM">
              <img
                :src="'http://paw.olehstyle.xyz/products/' + item.gambar_produkM"
                alt="Image"
                width="250px"
                height="360px"
              />
            </router-link>
            <h5>{{ item.nama_produkM }}</h5>
            <p>IDR {{ item.harga_produkM }}</p>
          </v-col>
        </v-row>
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
    readData() {
      var url = this.$api + "/man";
      this.$http
        .get(
          url
          // ,{ headers: {
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
        return product.nama_produkM.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
