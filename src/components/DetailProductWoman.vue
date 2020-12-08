<template>
  <div id="detail">
    <navbar-component></navbar-component>

    <v-container style="margin-top: 60px; margin-bottom: 150px">
      <v-row align="center" justify="center">
        <v-col class="sm-5 align-content-center d-flex justify-content-center">
          <img
            :src="'http://127.0.0.1:8000/products/' + product.gambar_produkW"
            alt="Image"
            width="250px"
            height="360px"
          />
        </v-col>

        <v-col class="md-12">
          <h2>{{ product.nama_produkW }}</h2>
          <v-divider></v-divider>
          <subtitle-1>{{ product.deskripsi_produkW }}</subtitle-1>
          <v-spacer></v-spacer>
          <br />

          <h3 class="red--text">IDR {{ product.harga_produkW }}</h3>
          <v-spacer>Stok : {{ product.stok}}</v-spacer>
          <br />
          <v-form v-model="valid" ref="formStok">
            <v-row class="md-6"
              ><v-col class="d-flex" cols="12" sm="4">
                <v-select
                  v-model="size"
                  :items="sizeOption"
                  :rules="sizeRules"
                  label="Size"
                  solo
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="4">
                <v-text-field
                  align="center"
                  v-model="stok"
                  type="number"
                  :min="1"
                  :max="product.stok"
                  :rules="stokRules"
                  solo
                  prepend-inner-icon="mdi-minus"
                  @click:prepend-inner="decrement"
                  append-icon="mdi-plus"
                  @click:append="increment"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn class="black white--text" @click="pesanan" text> ADD TO CART </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {
  data: () => ({
    product: [],
    error_message: "",
    color: "",
    snackbar: false,
    quantity: 0,
    valid: false,
    name: "detail",
    pesan: new FormData(),
    total_harga: 0,
    id_produk: 0,
    id_user: localStorage.getItem("id"),
    sizeOption: ["S", "M", "L", "XL"],
    size: "",
    sizeRules: [(v) => !!v || "Select your size !"],
    stokProduk: 0,
    stok: 1,
    stokRules: [
      (v) => !!v || "Quantity is required !",
      (v) => v > 0 || "Input stock is invalid !",
    ],
  }),
  methods: {
    increment() {
      if (this.stok < this.stokProduk) {
        this.stok = parseInt(this.stok) + 1;
      }
    },
    decrement() {
      if (this.stok > 1) {
        this.stok = parseInt(this.stok) - 1;
      }
    },
    pesanan() {
      if(localStorage.getItem("isLoggedIn")){
        if (this.$refs.formStok.validate()) {
          if (this.stok > this.product.stok) {
            this.error_message = "Stock is not enough !";
            this.snackbar = true;
            this.color = "red";
          } else {
            this.getStatus(this.product.id_produkW,this.size);
          }
        }
      }else{
        this.error_message = "Login first for shopping !";
        this.snackbar = true;
        this.color = "red"
      }
    },
    getStatus(idProduk,size){
      var url = this.$api + "/cart-cek/" + idProduk + "/" + this.id_user +"/"+size+"/woman";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.cekStatus = response.data.data;
          this.add(idProduk,size);
        });
    },
    add(idProduk,size){
      if(this.cekStatus.length < 1){
        this.addToCart();
      }else{
        this.updateCart(idProduk,size);
      }
    },
    updateCart(idProduk,size){
        let newData = {
          id_productCart: idProduk,
          id_userCart: this.id_user,
          size: size,
          stok: this.stok,
        };
        var url = this.$api + "/cart-update/"+idProduk+"/"+this.id_user+"/"+size+"/woman/"+this.stok;
        this.$http
          .put(
            url,
            newData,
            {
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            }
          )
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.reduceStok();
            this.readData();
            this.$refs.formStok.reset();
            this.stok = 1;
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            console.log(this.error_message);
            this.error_message = "Something wrong..."
            this.color = "red";
            this.snackbar = true;
          });
    },
    addToCart() {
      this.total_harga = this.product.harga_produkW * this.stok;
      this.id_produk = this.product.id_produkW;
      this.pesan.append("id_productCart", this.id_produk);
      this.pesan.append("id_userCart", this.id_user);
      this.pesan.append("jumlah", this.stok);
      this.pesan.append("size", this.size);
      this.pesan.append("total_harga", this.total_harga);
      this.pesan.append("isPay", 0);
      this.pesan.append("kategori", "woman");
      this.pesan.append("nama_produk", this.product.nama_produkW);
      this.pesan.append("harga_produk", this.product.harga_produkW);
      this.pesan.append("image", this.product.gambar_produkW);

      var url = this.$api + "/cart";
      this.load = true;
      this.$http
        .post(url, this.pesan, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.reduceStok();
          this.readData();
          this.$refs.formStok.reset();
          this.stok = 1;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error_message);
          this.error_message = "Something wrong..."
          this.color = "red";
          this.snackbar = true;
        });
    },
    reduceStok() {
      let newStok = this.product.stok - this.stok;
      console.log(newStok);
      let newData = {
        nama_produkW: this.product.nama_produkW,
        harga_produkW: this.product.harga_produkW,
        deskripsi_produkW: this.product.deskripsi_produkW,
        stok: newStok,
      };
      var url = this.$api + "/woman/" + this.id_produk;
      this.load = true;
      this.$http
        .put(url, newData)
        .then((response) => {
          this.error_message = response.data.message;
          this.snackbar = false;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error_message);
          this.error_message = "Something wrong..."
          this.color = "red";
          this.snackbar = true;
        });
    },
    readData() {
      var url = this.$api + "/woman/" + this.$route.params.id_produkW;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.product = response.data.data;
          this.stokProduk = response.data.data.stok;
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
