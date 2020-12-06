<template>
  <div id="detail">
    <navbar-component></navbar-component>

    <v-container style="margin-top: 60px; margin-bottom: 150px">
      <v-row align="center" justify="center">
        <v-col class="sm-5 align-content-center d-flex justify-content-center">
          <img
            :src="'http://127.0.0.1:8000/products/' + product.gambar_produkM"
            alt="Image"
            width="250px"
            height="360px"
          />
        </v-col>

        <v-col class="md-12">
          <h2>{{ product.nama_produkM }}</h2>
          <v-divider></v-divider>
          <subtitle-1>{{ product.deskripsi_produkM }}</subtitle-1>
          <v-spacer></v-spacer>
          <br />

          <h3 class="red--text">IDR {{ product.harga_produkM }}</h3>
          <br />
          <v-row class="md-6"
            ><v-col class="d-flex" cols="12" sm="4">
              <v-select v-model="pesan.size" :items="size" label="Size" solo></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field
                align="center"
                v-model="pesan.quantity"
                type="number"
                :min="1"
                :max="product.stok"
                :rules="stokRules"
                solo
                prepend-inner-icon="mdi-minus"
                @click:prepend="decrement"
                append-icon="mdi-plus"
                @click:append="increment"
                ><v-icon left> mdi-pencil </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <v-btn class="black white--text" @click="pesanan" text router to="/cart">
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
    id_produkM: localStorage.getItem("id_produkM"),
    size: ["S", "M", "L", "XL"],
    stokRules: [
      (v) => !!v || "Quantity is required!",
      (v) => v < 1 || "Input harus lebih dari 0",
      (v) => v > this.stok || "Stok tidak cukup",
    ],
  }),
  methods: {
    increment() {
      this.pesan.quantity++;
    },
    decrement() {
      this.quantity--;
    },
    pesanan() {
      console.log(this.pesanan);
    },
    readData() {
      var url = this.$api + "/man/" + this.$route.params.id_produkM;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.product = response.data.data;
          this.pagination.current = response.data.current_page;
          this.pagination.total = response.data.last_page;
        });
    },
    onPageChange() {
      this.readData();
    },
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
