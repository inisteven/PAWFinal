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
              <tr>
                <td>
                  <h5>Nama Product</h5>
                </td>
                <td>Size</td>
                <td>this.quantity</td>
                <td>Rp. xxxxxxxxxx</td>
              </tr>

              <tr>
                <td colspan="3" align="right">Subtotal</td>
                <td>Rp. xxxxxxxxxx</td>
              </tr>

              <tr>
                <td colspan="3" align="right" style="border: none">Shipping</td>
                <td style="border: none">Rp. xxxxxxxxxx</td>
              </tr>

              <tr>
                <td colspan="3" align="right" style="border: none">
                  <strong>Total :</strong>
                </td>
                <td style="border: none">Rp. xxxxxxxxxx</td>
              </tr>
            </tbody>
          </table>
          <v-row>
            <div class="col justify-content-start">
              <div class="col-8">
                <div class="blue-grey lighten-4">
                  <h6 class="black--text" style="padding: 6px">
                    Shipping Info
                    <router-link class="text-left black--text" text to="payment"
                      >Edit</router-link
                    >
                  </h6>
                </div>
                <div class="custom-file">
                  <h6>Nama</h6>
                  <h6>Alamat</h6>
                  <h6>Kecamatan</h6>
                  <h6>Nomor HP</h6>
                </div>
              </div>
            </div>

            <div class="col justify-content-end">
              <div class="col-8" style="margin-left: 160px">
                <div class="blue-grey lighten-4">
                  <h6 class="black--text" style="padding: 6px">
                    Bukti Transfer
                  </h6>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                  />
                  <label class="custom-file-label" for="customFile"
                    >Choose file</label
                  >
                </div>
              </div>
            </div>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div
      class="button"
      justify="center"
      align="center"
      style="margin-bottom: 100px"
    >
      <v-btn class="black white--text" text router to="/thankyou" dark
        >CONFRIM</v-btn
      >
    </div>
    <br />

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
