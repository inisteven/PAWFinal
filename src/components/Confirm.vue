<template>
  <div id="detail">
    <navbar-component></navbar-component>
    <br />
    <h1 class="font-weight-black text-center">CONFIRMATION</h1>
    <v-row>
      <v-col>
        <div class="mt-5" style="margin: 60px">
          <table class="table center justify-center">
            <thead class="thead-light" :headers="headers">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Size</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="index">
                <td>
                  {{ item.nama_produk }}
                </td>
                <td>{{ item.size }}</td>
                <td>{{ item.jumlah }}</td>
                <td>Rp. {{ item.total_harga }}</td>
              </tr>

              <tr>
                <td colspan="3" align="right">Subtotal</td>
                <td>Rp. {{ subtotal() }}</td>
              </tr>

              <tr>
                <td colspan="3" align="right" style="border: none">Shipping</td>
                <td style="border: none">Rp. {{ ongkir }}</td>
              </tr>

              <tr>
                <td colspan="3" align="right" style="border: none">
                  <strong>Total :</strong>
                </td>
                <td style="border: none">Rp. {{ totalHarga }}</td>
              </tr>
            </tbody>
          </table>
          <v-row>
            <div class="col justify-content-start">
              <div class="col-8">
                <div class="blue-grey lighten-4">
                  <h6 class="black--text" style="padding: 6px">
                    Shipping Info
                    <router-link class="text-left black--text" text to="/payment"
                      >Edit</router-link
                    >
                  </h6>
                </div>
                <div class="custom-file">
                  <h6>{{ fullname }}</h6>
                  <h6>{{ order.address }}</h6>
                  <h6>{{ order.city }}</h6>
                  <h6>{{ order.province }}</h6>
                  <h6>{{ order.phoneNumber }}</h6>
                </div>
              </div>
            </div>

            <div class="col justify-content-end">
              <div class="col-8" style="margin-left: 160px">
                <div class="blue-grey lighten-4">
                  <h6 class="black--text" style="padding: 6px">Bukti Transfer</h6>
                </div>
                <div>
                  <img :src="imagePathCreate" width="200px" alt="">
                </div>
                <div >
                  <label>Choose file</label>
                  <input 
                    ref:fileInput
                    type="file"
                    :rules="imageRules"
                    required
                    @change="getImage"/>
                </div>
              </div>
            </div>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div class="button" justify="center" align="center" style="margin-bottom: 100px">
      <v-btn class="black white--text" text @click="save" dark>CONFIRM</v-btn>
    </div>
    <br />

    <footer-component></footer-component>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogHapus" persistent max-width="290">
          <v-card>
            <v-card-title class="heading 3"> Yakin mau menghapus? </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialogHapus = false"> Tidak </v-btn>
              <v-btn text @click="hapus"> Ya </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {
  data: () => ({
    total: 0,
    dialogHapus: false,
    quantity: 1,
    ongkir: 50000,
    cart: [],
    woman: [],
    imagePathCreate: "",
    fileInput: "",
    imageTF: null,
    imageRules: [(v) => !!v || "Image is required !"],
    jumlah: 0,
    total_harga: 0,
    man: [],
    acc: [],
    harga: [],
    user: [],
    order: [],
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
    getImage(e){
      let image = e.target.files[0];
      this.imageTF = image;
      let uploadImg = new FileReader();
      uploadImg.readAsDataURL(image);
       uploadImg.onload = (e) => {
        this.imagePathCreate = e.target.result;
      };
    },
    save() {
      let image = new FormData();
      image.append("image",this.imageTF);
      var url = this.$api + "/order/upload-image/" + this.order.id_order;
      this.$http
        .post(url, image)
        .then((response) => {
          console.log(response.data.message);
          this.updateCart();
          this.$router.push("/thankyou");
        });
    },
    updateCart(){
      let newData = {
        isPay : 1,
      }
      var url = this.$api + "/cart-update-pay/" + localStorage.getItem('id');
      this.$http.put(url,newData)
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
    readUser() {
      var url = this.$api + "/order/search/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.order = response.data.data;
        });
    },
    deleteItem(item) {
      this.dialogHapus = true;
      this.itemTemp = item;
    },
    hapus() {
      var index = this.todos.indexOf(this.itemTemp);
      this.todos.splice(index, 1);

      this.dialogHapus = false;
    },
    increment() {
      this.quantity++;
    },
    decrement() {
      this.quantity--;
    },
    subtotal(){
      var totalH=0;
      for(let i=0;i<this.cart.length;i++){
        totalH=totalH+this.cart[i].total_harga;
      }
      this.total=totalH;
      return totalH;
    },
  },
  computed: {
    totalHarga: function(){
      return this.total + 50000;
    },
    fullname: function (){
      return this.user.first_name + " " + this.user.last_name;
    },
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  mounted() {
    this.readData();
    this.readUser();
    this.readDataUser();
  },
};
</script>
