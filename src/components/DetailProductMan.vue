<template>
  <div id="detail">
    <navbar-component></navbar-component>

    <v-container style="margin-top: 60px; margin-bottom: 150px">
      <v-row align="center" justify="center">
      <v-col class="sm-5 align-content-center d-flex justify-content-center">
                  <img :src="'http://127.0.0.1:8000/products/' + product.gambar_produkM" alt="Image" width="250px" />


          <!--<v-img :src="require('@/assets/Long cotton blend cardigan1.jpg')" class="d-block w-100" alt="manPic"></v-img>-->
        </v-col>

          <!--<v-img :src="require('@/assets/Long cotton blend cardigan1.jpg')" class="d-block w-100" alt="manPic"></v-img>-->
        
        <v-col class="md-12">
          <h2>{{product.nama_produkM}}</h2>
          <v-divider></v-divider>
          <subtitle-1
            >{{product.deskripsi_produkM}}</subtitle-1
          >
          <v-spacer></v-spacer>
          <br />

          <h3 class="red--text">IDR {{ product.harga_produkM }}</h3>
          <br />
          <v-row class="md-6"
            ><v-col class="d-flex" cols="12" sm="4">
              <v-select
                v-model="pesan.size"
                :items="size"
                label="Size"
                solo
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                align="center"
                v-model="pesan.quantity"
                type="number "
                solo
                prepend-inner-icon="mdi-minus"
                @click:prepend="decrement"
                append-icon="mdi-plus"
                @click:append="increment"
                ><v-icon left> mdi-pencil </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <v-btn
            class="black white--text"
            @click="pesanan"
            text
            router
            to="/cart"
          >
            ADD TO CART
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {
  data: () => ({
    product: {},
    quantity: 0,
    name: "detail",
    pesan: {},
    id_produkM: localStorage.getItem('id_produkM'),
    size: ["S", "M", "L", "XL"],
  }),
  methods: {
    increment() {
      this.quantity++;
    },
    decrement() {
      this.quantity--;
    },
    pesanan() {
      console.log(this.pesanan);

    },
    readData() {
      var url = this.$api + "/man/" +this.$route.params.id_produkM;
      this.$http
        .get(
          url,
          { headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }}
        )
        .then((response) => {
          this.product = response.data.data;
          this.pagination.current = response.data.current_page;
          this.pagination.total = response.data.last_page;
        });
    },
    onPageChange(){
      this.readData();
    }
  },

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  mounted() {
    this.readData();
  },
};
</script>
