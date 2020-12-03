<template>
  <div justify="center">
    <navbar-component></navbar-component>
    <h1 class="font-weight-black">EDIT PROFILE</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="inputFoto">
            <h3>Upload Picture</h3>
            <v-spacer></v-spacer><br />
            <form method="POST" enctype="multipart/form-data">
              <div v-if="imageThumbnail">
                <img
                  :src="imageThumbnail"
                  height="130"
                  width="130"
                  class="img-flued img-rounded"
                />
              </div>

              <br />
              <input
                accept="image/png, image/jpeg, image/jpg"
                type="file"
                @change="pilihImage"
                class="form-control"
                outlined
              />
              <v-btn class="green white--text" small @click="uploadImage"
                >Upload</v-btn
              >
            </form>
          </div>
        </div>

        <!--FORM-->
        <div class="col-md-8">
          <v-row>
            <v-col>
              <br />
              <v-container grid-list-md>
                <h3>Account Information</h3>
                <v-layout>
                  <v-flex>
                    <body-1>First Name</body-1>

                    <v-text-field
                      v-model="firstName"
                      solo-inverted
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <body-1>Last Name</body-1>

                    <v-text-field
                      v-model="lastName"
                      solo-inverted
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <br /><br />
                <v-layout>
                  <v-flex>
                    <body-1>Email</body-1>
                    <v-text-field
                      v-model="email"
                      solo-inverted
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <br /><br />

                <h3>Change Password</h3>
                <v-layout>
                  <v-flex>
                    <body-1>Current Password</body-1>

                    <v-text-field
                      v-model="currPass"
                      type="password"
                      solo-inverted
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <body-1>New Password*</body-1>
                    <v-text-field
                      v-model="newPass"
                      type="password"
                      solo-inverted
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <br /><br />
                <v-layout>
                  <v-flex>
                    <body-1>Confirm New Password*</body-1>
                    <v-text-field
                      v-model="confNewPass"
                      type="password"
                      solo-inverted
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <br /><br />
              </v-container>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="btn justify-content-right">
        <v-btn>Save</v-btn>
        <v-btn>Save</v-btn>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {
  image: "",
  imageThumbnail: null,
  methods: {
    //read data product

    pilihImage(e) {
      this.image = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (e) => {
        this.imageThumbnail = e.target.result;
      };
    },
    uploadImage() {
      let data = new FormData();

      data.set("image", this.image);

      this.$http.post("/image", data).then((response) => {
        this.error_message = response.data.message;
        console.log(response);
      });
    },
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
};
</script>
