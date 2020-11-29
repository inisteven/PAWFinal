<template>
  <div>
    <navbar-component></navbar-component>
    <div>
      <v-img :src="require('@/assets/womanPage.png')" class="d-block w-100" alt="manPic" ></v-img>
      <v-row align="center" justify="center"> </v-row>
    </div>

    <template>
      <v-container>
        <v-row class="text-center">
          <v-col ols="12" sm="4">
            <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
            <h5>Long cotton blend cardigan</h5>
            <p>IDR 50.0000</p>
          </v-col>
          <v-col ols="12" sm="4">
            <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
            <h5>Long cotton blend cardigan</h5>
            <p>IDR 50.0000</p>
          </v-col>
          <v-col ols="12" sm="4">
            <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
            <h5>Long cotton blend cardigan</h5>
            <p>IDR 50.0000</p></v-col
          >
          <v-col ols="12" sm="4">
            <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
            <h5>Long cotton blend cardigan</h5>
            <p>IDR 50.0000</p>
          </v-col>
          <v-col ols="12" sm="4">
            <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
            <h5>Long cotton blend cardigan</h5>
            <p>IDR 50.0000</p>
          </v-col>
          <v-col ols="12" sm="4">
            <img src="@/assets/Long cotton blend cardigan1.jpg" alt="Image" width="250px" />
            <h5>Long cotton blend cardigan</h5>
            <p>IDR 50.0000</p>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination v-model="page" :length="4" circle></v-pagination>
        </div>
      </v-container>
    </template>
    <footer-component></footer-component>
  </div>
</template>
<script>
  import Header from '../Navbar.vue';
  import Footer from '../Footer.vue';
  export default {
      name:"Woman",
      components:{
        'navbar-component' : Header,
        'footer-component' : Footer,
      }
  }
</script>
