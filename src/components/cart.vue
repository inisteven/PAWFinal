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
                    <img
                      :src="
                        'http://127.0.0.1:8000/products/' + item.image
                      "
                      alt="Image"
                      width="190px"
                      height="260px"
                    />
                </th>
                <td>
                    <h5>{{ item.nama_produk }}</h5>
                    <h6>{{ item.harga_produk }}</h6>
                    <subtitle-2>{{ item.size }}</subtitle-2>
                </td>
                <td>
                  {{ item.jumlah }}
                </td>
                <td>Rp. {{ item.total_harga }}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="deleteDialog(item.id_cart)"
                    icon
                    slot="activator"
                    >X</v-icon
                  >
                </td>
              <template>
            <v-row justify="center">
              <v-dialog v-model="dialogHapus" persistent max-width="290">
                <v-card>
                  <v-card-title class="heading 3"> Remove from cart? </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogHapus = false"> No </v-btn>
                    <v-btn text @click="deleteItem"> Yes </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
              </tr>
              <tr>
                <td colspan="3" align="right">
                  <strong>Total Harga :</strong>
                </td>
                <td>
                  <strong>IDR {{ total_harga }} </strong>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="row justify-content-end">
            <div class="col-md-4">
              <v-btn class="black white--text"  @click="cekCheckOut" text dark small
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
    idHapus:0,
    woman: [],
    color: "",
    snackbar:"",
    error_message:"",
    idProductUpdate: 0,
    idCart: 0,
    jumlah: 0,
    total_harga : 0,
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
    cekCheckOut(){
      if(this.cart.length < 1){
        this.error_message = "Shopping first for check out";
        this.snackbar = true;
        this.color = "red";
      }else{
        this.$router.push('/payment');
      }
    },
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
          this.total_harga = response.data.total;
          console.log(this.total_harga);
        });
    },
    deleteDialog(id_hapus){
      this.idHapus = id_hapus;
      this.dialogHapus = true;
    },
    deleteItem() {
      this.dialogHapus = true;
      this.deleteCart(this.idHapus);
      this.load = false;
      this.dialogHapus = false;
    },
    deleteCart(idCart){
      console.log(idCart);
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
          this.readData();
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
};
</script>
