<template>
    <div>
        <navbar-component></navbar-component>
        <br />
        <h1 class="font-weight-black text-center">PAYMENT</h1>
        <br><br>
        <h2 class="font-weight-black mt-5" style="margin-left: 150px">Shipping Info</h2> 
            <v-row>
                <br>
                <v-container grid-list-md align="center" justify="center">
                    <v-layout>
                        <v-flex>
                            <v-text-field
                                v-model="name"
                                label="Name"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="phoneNumber"
                                label="Phone Number"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <br><br>
                    <v-layout>
                        <v-flex>
                            <v-text-field
                                v-model="address"
                                label="Address"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <br><br>
                    <v-layout>
                        <v-flex>
                            <v-text-field
                                v-model="city"
                                label="City"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="state"
                                label="State or Province"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="postalCode"
                                label="Postal Code"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-row>
            <v-col>
                <v-card-title bold style="margin-left: 200px;">
                    <h2 class="font-weight-black mt-5">Payment Menthod</h2>
                </v-card-title>
                <v-card-subtitle>
                    <h4 style="color: black; margin-left: 300px; margin-right: 300px">
                        No. Rekening
                        <h4 style="color: red;">4589123124</h4><br>
                        Petunjuk Transfer ATM<br>
                        1. Pilih TRANSFER<br>
                        2. Masukkan  4589123124 dan pilih benar<br>
                        3. Periksa kembali informasi yang tertera di layar sudah benar.<br> 
                        <br>
                        Petunjuk Transfer mBanking<br>
                        1. Pilih m-Transfer <br>
                        2. Masukkan nomor rekening 4589123124 dan pilih benar<br>
                        3. Periksa kembali informasi yang tertera di layar sudah benar.<br> 
                        4. Masukkan PIN m-Banking Anda dan pilih OK<br>
                    </h4>
                </v-card-subtitle>
            </v-col>
            <div class="my-2" align="center" justify="center">
                <v-btn depressed large color="primary">OK</v-btn>
            </div>
            <br><br>
        <footer-component></footer-component>
    </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {

  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
