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
                <th scope="col"></th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <img
                    src="@/assets/Long cotton blend cardigan1.jpg"
                    alt="Image"
                    width="150px"
                  />
                </th>
                <td>
                  <div class="product-info">
                    <h5>Nama Product</h5>
                    <h6>Harga</h6>
                    <subtitle-2>Size</subtitle-2>
                  </div>
                </td>
                <td>
                  <v-btn text small @click="decrement">-</v-btn>
                  {{ this.quantity }}
                  <v-btn text small @click="increment">+</v-btn>
                </td>
                <td>@Harga*jumlah</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="deleteItem(item)"
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
                  <strong>Rp.xxxxxxxxxx </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="row justify-content-end">
            <div class="col-md-4">
              <v-btn
                class="black white--text"
                text
                router
                to="/confirmation"
                dark
                small
                >CHECKOUT</v-btn
              >
            </div>
          </div>
          <div class="continue">
            <router-link to="home" text class="black--text"
              ><v-icon>mdi-keyboard-backspace </v-icon> Continue
              Shopping</router-link
            >
          </div>
        </div>
      </v-col>
    </v-row>
    <footer-component></footer-component>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogHapus" persistent max-width="290">
          <v-card>
            <v-card-title class="heading 3">
              Yakin mau menghapus?
            </v-card-title>
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
    dialogHapus: false,
    quantity: 1,

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
  },

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
