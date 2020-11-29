<template>
  <div id="detail">
    <navbar-component></navbar-component>
    <br />
    <h1 class="font-weight-black text-center">SHOOPING CART</h1>
    <v-row>
      <v-col>
        <div class="mt-5" style="margin: 60px">
          <table class="table center">
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
                  <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="150px" />
                </th>
                <td>
                  <div class="product-info">
                    <h5>Nama Product</h5>
                    <h6>Harga</h6>
                    <subtitle-2>Size</subtitle-2>
                  </div>
                </td>
                <td>Quantity dengan edit</td>
                <td>@Harga</td>
                <td>
                  <v-icon small class="mr-2" @click="deleteItem(item)" icon slot="activator">X</v-icon>
                </td>
              </tr>
            </tbody>
            <v-divider></v-divider>
          </table>
        </div>
      </v-col>
    </v-row>
    <footer-component></footer-component>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogHapus" persistent max-width="290">
          <v-card>
            <v-card-title class="heading 3"> Yakin mau menghapus? </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialogHapus = false"> Tidak </v-btn>
              <v-btn color="red darken-1" text @click="hapus"> Ya </v-btn>
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
  },

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
