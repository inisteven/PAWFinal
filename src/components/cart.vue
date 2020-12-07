<template>
  <div id="detail">
    <navbar-component></navbar-component>
    <br />
    <h1 class="font-weight-black text-center">SHOOPING CART</h1>
    <v-row>
      <v-col>
        <div class="mt-5" style="margin: 60px">
          <table class="table center justify-center">
            <thead class="thead-light" :headers="headers">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Detail</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="index">
                <th>
                  <div v-if="item.kategori == 'woman'">
                    <img
                      :src="
                        'http://127.0.0.1:8000/products/' +
                        readDataWoman(item.id_productCart)
                      "
                      alt="Image"
                      width="190px"
                      height="260px"
                    />
                  </div>
                  <div v-if="item.kategori == 'man'">
                    <img
                      :src="
                        'http://127.0.0.1:8000/products/' +
                        readDataMan(item.id_productCart)
                      "
                      alt="Image"
                      width="190px"
                      height="260px"
                    />
                  </div>
                  <div v-if="item.kategori == 'acc'">
                    <img
                      :src="
                        'http://127.0.0.1:8000/products/' +
                        readDataAcc(item.id_productCart)
                      "
                      alt="Image"
                      width="180px"
                      height="260px"
                    />
                  </div>
                </th>
                <td>
                  <div class="product-info" v-if="item.kategori == 'woman'">
                    <h5>{{ woman.nama_produkW }}</h5>
                    <h6>{{ woman.harga_produkW }}</h6>
                    <subtitle-2>{{ item.size }}</subtitle-2>
                  </div>
                  <div class="product-info" v-if="item.kategori == 'man'">
                    <h5>{{ man.nama_produkM }}</h5>
                    <h6>{{ man.harga_produkM }}</h6>
                    <subtitle-2>{{ item.size }}</subtitle-2>
                  </div>
                  <div class="product-info" v-if="item.kategori == 'acc'">
                    <h5>{{ acc.nama_aksesoris }}</h5>
                    <h6>{{ acc.harga_aksesoris }}</h6>
                    <subtitle-2>{{ item.size }}</subtitle-2>
                  </div>
                </td>
                <td>
                  {{ item.jumlah }}
                </td>
                <td>Rp. {{ item.total_harga }}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="deleteDialog"
                    icon
                    slot="activator"
                    >X</v-icon
                  >
                </td>

              </tr>
              <tr>
                <td colspan="3" align="right">
                  <strong>Total Harga :</strong>
                </td>
                <td>
                  <strong>Rp. {{ totalHarga }} </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <template>
            <v-row justify="center">
              <v-dialog v-model="dialogHapus" persistent max-width="290">
                <v-card>
                  <v-card-title class="heading 3"> Remove from cart? </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogHapus = false"> No </v-btn>
                    <v-btn text @click="deleteItem(item)"> Yes </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
          <div class="row justify-content-end">
            <div class="col-md-4">
              <v-btn class="black white--text" @click="save" text router to="/payment" dark small
                >CHECKOUT</v-btn
              >
            </div>
          </div>
          <div class="continue">
            <router-link to="home" text class="black--text"
              ><v-icon>mdi-keyboard-backspace </v-icon> Continue Shopping</router-link
            >
          </div>
        </div>
      </v-col>
    </v-row>
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
    dialogHapus: false,
    quantity: 1,
    cart: [],
    woman: [],
    color: "",
    snackbar:"",
    error_message:"",
    idProductUpdate: 0,
    idCart: 0,
    jumlah: 0,
    man: [],
    acc: [],
    harga: [],
    headers: [
      {
        text: "Item",
        value: "fotoItem",
      },
      {
        text: "",
        value: "namaItem",
      },
      {
        text: "Quantity",
        value: "quantity",
      },
      {
        text: "Total",
        value: "total",
      },
      {
        text: "",
        value: "action",
      },
    ],
  }),
  methods: {
    readData() {
      var url = this.$api + "/cart/"+ localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.cart = response.data.data;
          // searchProduct(this.cart.id_productCart, this.cart.kategori);
          console.log(this.cart);
        });
    },
    readDataWoman(id) {
      var url = this.$api + "/woman/" + id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.woman = response.data.data;
          this.harga = this.cart[id].total_harga / this.woman.harga_produkW;
        });
      return this.woman.gambar_produkW;
    },
    readDataMan(id) {
      var url = this.$api + "/man/" + id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.man = response.data.data;
        });
      return this.man.gambar_produkM;
    },
    readDataAcc(id) {
      var url = this.$api + "/acc/" + id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.acc = response.data.data;
        });
      return this.acc.gambar_aksesoris;
    },
    deleteDialog(){
      this.dialogHapus = true;
    },
    deleteItem(item) {
      this.dialogHapus = true;
      this.idProductUpdate = item.id_productCart;
      this.idCart = item.id_cart;
      this.jumlah = item.jumlah;

      this.deleteCart(this.idCart);
      if(item.kategori == "man"){
        this.updateMan(this.idProductUpdate, item.jumlah);
      }
      this.readData();
    },
    updateMan(id_produk,jumlah){
        var url = this.$api + "/man/" + id_produk + "/" + jumlah;
        this.$http
          .put(
            url,
            // {
            //         headers:{
            //             'Authorization': 'Bearer ' + localStorage.getItem('token')
            //         }
            // }
          ).then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            console.log(this.error_message);
            this.error_message = "Something error...";
            this.snackbar = true;
            this.color ="red"
          });
    },
    deleteCart(idCart){
       var url = this.$api + "/cart/" + idCart;
      //data dihapus berdasarkan id
      this.$http
        .delete(
          url,
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
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error_message);
        });
    },
    total(index) {
      return this.cart[index].jumlah * this.harga;
    },
  },

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  mounted() {
    this.readData();
  },
  computed: {
    totalHarga: function () {
      var total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total = total + this.cart[i].total_harga;
      }
      return total;
    },
  },
};
</script>
