<template>
  <div justify="center">
    <navbar-component></navbar-component>
    <v-container>
      <br />
      <h1 class="font-weight-black text-center">PAYMENT</h1>
      <br /><br />
      <h3 class="font-weight-black mt-5" style="margin-left: 200px">Shipping Info</h3>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <br />
          <v-container grid-list-md>
            <v-layout>
              <v-flex>
                <body-1>Name</body-1>

                <v-text-field
                  v-model="fullname"
                  label="Name"
                  solo-inverted
                  disabled
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <body-1>Phone Number</body-1>

                <v-text-field
                  v-model="phoneNumber"
                  label="Phone Number"
                  solo-inverted
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <br /><br />
            <v-layout>
              <v-flex>
                <body-1>Address</body-1>

                <v-textarea
                  v-model="address"
                  label="Address"
                  solo-inverted
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
            <br /><br />
            <v-layout>
              <v-flex>
                <body-1>City</body-1>
                <v-text-field
                  v-model="city"
                  label="City"
                  solo-inverted
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <body-1>State or Province</body-1>

                <v-text-field
                  v-model="state"
                  label="State or Province"
                  solo-inverted
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <body-1>Postal Code</body-1>
                <v-text-field
                  v-model="postalCode"
                  label="Postal Code"
                  solo-inverted
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-container justify="center" style="margin-left: 200px">
        <v-row justify="center">
          <v-col>
            <v-card-title bold>
              <h2 class="font-weight-black mt-5">Payment Menthod</h2>
            </v-card-title>
            <v-card-subtitle>
              <body-1 style="color: black">
                No. Rekening
                <h4 style="color: red">4589123124</h4>
                <br />
                Petunjuk Transfer ATM<br />
                1. Pilih TRANSFER<br />
                2. Masukkan 4589123124 dan pilih benar<br />
                3. Periksa kembali informasi yang tertera di layar sudah benar.<br />
                <br />
                Petunjuk Transfer mBanking<br />
                1. Pilih m-Transfer <br />
                2. Masukkan nomor rekening 4589123124 dan pilih benar<br />
                3. Periksa kembali informasi yang tertera di layar sudah benar.<br />
                4. Masukkan PIN m-Banking Anda dan pilih OK<br />
              </body-1>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
      <div class="my-2" align="center" justify="center">
        <v-btn class="black white--text" @click="save" router to="/confirmation"
          >OK</v-btn
        >
      </div>
      <br /><br />
    </v-container>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {
  data: () => ({
    load: false,
    user: [],
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    order: new FormData(),
  }),
  methods: {
    readData() {
      var url = this.$api + "/user/" + localStorage.getItem("id");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data.data;
          console.log(this.user);
        });
    },
    save() {
      this.order.append("id_user", localStorage.getItem("id"));
      this.order.append("address", this.address);
      this.order.append("city", this.city);
      this.order.append("province", this.state);
      this.order.append("postal_code", this.postalCode);
      this.order.append("phoneNumber", this.phoneNumber);
      this.order.append("total_harga", 0);
      this.order.append("bukti_tf", "-");

      var url = this.$api + "/order";
      this.load = true;
      this.$http
        .post(url, this.order)
        .then((response) => {
          this.error_message = response.data.message;
          this.snackbar = false;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
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
    fullname: function () {
      return this.user.first_name + " " + this.user.last_name;
    },
  },
};
</script>
