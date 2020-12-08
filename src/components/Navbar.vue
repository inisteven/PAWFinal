<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light">
      <div class="navbar-collapse w-100 order-1 order-md-0" v-show="isHidden">
        <!-- <strong>Choose whatever you want</strong> -->
      </div>
      <div class="mx-auto order-0">
        <b-navbar-brand href="#">
          <img
            :src="image"
            class="d-inline-block align-top logo justify-center"
            alt="Logo"
            width="220px"
          />
        </b-navbar-brand>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-collapse2"
          @click="isHidden = !isHidden"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div
        class="navbar-collapse collapse w-100 order-3 dual-collapse2"
        v-show="isHidden"
      >
        <ul class="navbar-nav ml-auto">
          <b-navbar-nav class="ml-auto" variant="dark">
            <div v-if="isLoggedIn" style="margin-top: 20px; margin-right: -45px">
              <v-btn v-model="username" text router to="/profile" small
                ><v-icon>mdi-account</v-icon>Hi {{ user.first_name }}!
              </v-btn>

              <v-btn text router @click="logout" small
                ><v-icon>mdi-logout</v-icon>Logout</v-btn
              >
            </div>
            <div v-else v-show="isHidden">
              <v-btn height="65px" text router to="/signIn">Sign in</v-btn>
              <v-btn height="65px" text router to="/signUp">Sign Up</v-btn>
            </div>

            <div v-show="isHidden">
              <b-nav-item v-if="isLoggedIn && jumlah>0" router to="/cart">
                <div>
                  <v-badge color="red" :content="jumlah">
                    <img
                      :src="cart"
                      class="align-top logo ml-10"
                      alt="Logo"
                      width="40px"
                    />
                  </v-badge>
                </div>
              </b-nav-item>
              <b-nav-item v-else>
                <div>
                  <router-link to="/cart">
                  <img
                    :src="cart"
                    class="align-top logo ml-10"
                    alt="Logo"
                    width="40px"
                  />
                  </router-link>
                </div>
                  
              </b-nav-item>
            </div>
          </b-navbar-nav>
        </ul>
      </div>
    </nav>
    <nav
      class="navbar navbar-light navbar-expand-md justify-content-md-center justify-content-start"
    >
      <a class="nav-link" href="#_"><i class="fa fa-search mr-1"></i></a>
      <div
        class="navbar-collapse collapse dual-collapse2 justify-content-between align-items-center w-100"
        id="collapsingNavbar2"
      >
        <ul class="navbar-nav mx-auto text-md-center text-left">
          <li class="nav-item">
            <v-btn text router to="/home">Home</v-btn>
          </li>
          <li class="nav-item">
            <v-btn text router to="/about-us">About Us</v-btn>
          </li>
          <li class="nav-item my-auto">
            <v-btn text router to="/man">Man</v-btn>
          </li>
          <li class="nav-item">
            <v-btn text router to="/woman">Woman</v-btn>
          </li>
          <li class="nav-item">
            <v-btn text router to="/acc">Accessories</v-btn>
          </li>
        </ul>
        <div class="sembunyi" v-show="!isHidden">
          <v-divider></v-divider>
          <ul class="navbar-nav mx-auto text-md-center text-left">
            <div v-if="isLoggedIn">
              <li class="nav-item">
                <v-btn text router to="/cart">Cart</v-btn>
              </li>
              <li class="nav-item">
                <v-btn text router to="/profile">Edit Profile</v-btn>
              </li>
              <li class="nav-item my-auto">
                <v-btn text @click="logout">Sign Out</v-btn>
              </li>
            </div>
            <div v-else>
              <li class="nav-item">
                <v-btn text router to="/signIn">Sign In</v-btn>
              </li>
              <li class="nav-item">
                <v-btn text router to="/signUp">Sign Up</v-btn>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>

    <v-dialog v-model="dialogLogout" max-width="400px">
      <v-card>
        <v-card-title>Do you sure want to logout ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2" @click="cancelLogout" class="mr-3 mb-5">No</v-btn>
          <v-btn color="grey" @click="logoutConfirm" class="mr-3 mb-5">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </header>
</template>

<script>
import image from "../assets/logoHitam.png";
import cart from "../assets/cart2.png";
export default {
  data: function () {
    return {
      nCarts: [],
      fields: { value: "id", text: "text" },
      isHidden: true,
      dialogLogout: false,
      idLogin: "",
      isLoggedIn: false,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        no_telp: '',
      },
      username: "",
      image: image,
      cart: cart,
      search: "",
      jumlah: 0, //SELECT (jumlah) from cart where id = idLogin AND isPay = 0
      items: [{ title: "Profile", to: "/profile" }],
    };
  },
  methods: {
    readDataCart() {
      var url = this.$api + "/cart/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        })
        .then((response) => {
          this.nCarts = response.data.data;
          this.getJumlah();
          // searchProduct(this.cart.id_productCart, this.cart.kategori);
        });
    },
    getJumlah(){
      for(let i=0 ; i<this.nCarts.length;i++){
        this.jumlah += parseFloat(this.nCarts[i].jumlah);
      }
    },
    readData() {
      this.idLogin = localStorage.getItem("id");
      this.isLoggedIn = localStorage.getItem("isLoggedIn");
      var url = this.$api + "/user/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data.data;

          this.username = response.data.data.first_name;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.loadSnackbar("red", true);
          // localStorage.removeItem('token')
        });
    },
    logout() {
      this.dialogLogout = true;
    },

    logoutConfirm() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/signIn");
      this.isLoggedIn = false;
    },
    cancelLogout() {
      this.dialogLogout = false;
    },
  },
  mounted() {
    this.readData();
    this.readDataCart();
  },
};
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
@import url(https://fonts.googleapis.com/css?family=Roboto);
/* * {
    margin: 0;
    padding: 0;
    border: 0 none;
    position: relative;
    outline: none;
} */
.navbar_main {
  position: relative;
  box-sizing: border-box;
  font-size: 1.2rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.4);
}
</style>
