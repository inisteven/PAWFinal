<template>
  <div id="detail">
    <navbar-component></navbar-component>

    <v-container style="margin-top: 60px; margin-bottom: 150px">
      <v-row align="center" justify="center">
        <v-col class="sm-5 align-content-center d-flex justify-content-center">
          <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />

          <!--<v-img :src="require('@/assets/Long cotton blend cardigan1.jpg')" class="d-block w-100" alt="manPic"></v-img>-->
        </v-col>
        <v-col class="md-12">
          <h2>Nama product</h2>
          <v-divider></v-divider>
          <subtitle-1>ini penjeleasan product Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium quis soluta dolor id tempore consequatur natus dolorum? At modi necessitatibus nemo tempore architecto, earum ab qui officia in ut?</subtitle-1>
          <v-spacer></v-spacer>
          <br />

          <h3 class="red--text">Rp. 500.0000</h3>
          <br />
          <v-row class="md-6"
            ><v-col class="d-flex" cols="12" sm="4">
              <v-select v-model="pesan.size" :items="size" label="Size" solo></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="4">
              <v-text-field align="center" v-model="pesan.quantity" type="number " solo prepend-inner-icon="mdi-minus" @click:prepend="decrement" append-icon="mdi-plus" @click:append="increment"><v-icon left> mdi-pencil </v-icon></v-text-field>
            </v-col>
          </v-row>
          <v-btn class="black white--text" @click="pesanan" text router to="/cart"> ADD TO CART </v-btn>
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
    quantity: 0,
    name: "detail",
    pesan: {},
    size: ["S", "M", "L", "XL"],
  }),
  methods: {
    increment() {
      this.quantity++;
    },
    decrement() {
      this.quantity--;
    },
    pesan() {
      console.log(this.pesanan);
    },
  },

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
