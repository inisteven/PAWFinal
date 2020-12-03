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
              <v-card>
              <v-container grid-list-md>
                
                  <v-card-body>
                <h3>Account Information</h3>
                <v-layout>
                  <v-form v-model="validFormName" ref="formName">
                    <v-flex>
                      <body-1>First Name</body-1>
                      <v-text-field
                        :rules="firstRules"
                        v-model="first_name"
                        solo-inverted
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <body-1>Last Name</body-1>
                      <v-text-field
                        :rules="lastRules"
                        v-model="last_name"
                        solo-inverted
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-form>
                </v-layout>
                <v-layout >
                  <v-flex>
                    <body-1>Email</body-1>
                    <v-text-field
                      v-model="email"
                      solo-inverted
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-checkbox
                  v-model="checkbox"
                  label="Change Password ?"
                ></v-checkbox>

              <div v-show="checkbox">
                <h3>Change Password</h3>
                <v-form v-model="validFormPassword" ref="formPassword">
                  <v-layout>
                    <v-flex>
                      <body-1>Current Password</body-1>
                      <v-text-field
                        v-model="oldPassword"
                        type="password"
                        :rules="passwordRules"
                        solo-inverted
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <body-1>New Password*</body-1>
                      <v-text-field
                        v-model="newPassword"
                        :rules="passwordRules"
                        type="password"
                        solo-inverted
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex>
                      <body-1>Confirm New Password*</body-1>
                      <v-text-field
                        v-model="newConfirmPassword"
                        :rules="confirmPasswordRules"
                        type="password"
                        solo-inverted
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
                <br /><br />
              </div>
                </v-card-body>
              
              </v-container>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="btn justify-content-right">
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="save">Save</v-btn>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "@/components/Navbar.vue";
import Footer from "./Footer.vue";
export default {
  data(){
    return{
      validFormName: false,
      validFormPassword: false,
      checkbox: false,
      image: "",
      user:'',
      snackbar: '',
      color: '',
      error_message: '',
      imageThumbnail: null,
      email:'',
      first_name:'',
      firstRules:[
        (v) => !!v || 'First name is required',
      ],
      last_name: '',
      lastRules:[
            (v) => !!v || 'Last name is required',
      ],
      oldPassword: '',
      newPassword: '',
      passwordRules:[
        (v)=> !!v || 'Password is required',
        (v)=> (v && v.length >=6) || 'Password must be at least 6 characters'
      ],
      newConfirmPassword: '',
      confirmPasswordRules:[
            (v)=> !!v || 'Confirm password is required',
            (v)=> (v && v.length >=6) || 'Confirm password must be at least 6 characters',
            (v)=> v===this.password || 'Confirm password does not match'
      ],
    }
  },
  methods: {
    //read data product
    readData(){
      var url = this.$api + "/user/" + localStorage.getItem('id');
      this.$http.get(url,{
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }}
        )
        .then((response) => {
          this.user = response.data.data;
        }).catch(error => {
            this.error_message = error.response.data.message;
            this.loadSnackbar("red",true)
            // localStorage.removeItem('token')
        })
    },
    loadSnackbar(color,bool){
      this.color = color;
      this.snackbar = bool;
    },
    pilihImage(e) {
      this.image = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (e) => {
        this.imageThumbnail = e.target.result;
      };
    },
    updateData(){
      let dataUser = {
              first_name: this.first_name,
              last_name: this.last_name,
          }

          var url = this.$api+ '/user/' + localStorage.getItem('id');
          this.load = true;
          this.$http.put(url, dataUser, {
              headers: {
                  'Authorization' : 'Bearer ' + localStorage.getItem('token')
              }
          }).then(response => {
              this.error_message = response.data.message;
              this.snackbar = true;
              this.color="green"
              this.readData();
          }).catch(error => {
              this.error_message = error.response.data.message;
              this.snackbar = true;
              this.load = false;
              this.color="red"
          })
    },
    updatePasswordAndData(){
      let dataUser = {
          first_name: this.first_name,
          last_name: this.last_name,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
      }

      var url = this.$api+ '/user-password/' + localStorage.getItem('id');
      this.load = true;
      this.$http.put(url, dataUser, {
          headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
      }).then(response => {
          this.error_message = response.data.message;
          this.snackbar = true;
          this.color="green"
          this.readData();
          this.clearData();
      }).catch(error => {
          this.error_message = error.response.data.message;
          this.snackbar = true;
          this.load = false;
          this.color="red"
      })
    },
    uploadImage() {
      let image = new FormData();
      image.append('image',this.image);
      var url = this.$api + '/user/upload-image/'+ localStorage.getItem('id');
      this.$http.post(url, image,{
              headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
      }).then(response=>{
          this.error_message=response.data.message;
          this.color="green"
          this.snackbar=true;
      }).catch(error=>{
          this.error_message = error.response.data.message;
          this.color="red"
          this.snackbar=true;
      })
    },
    resetForm(){
      this.$refs.formName.reset();
      this.$refs.formPassword.reset();
    },
    save(){
      console.log(this.checkbox);
      if(this.checkbox){
        if(this.$refs.formPassword.validate() && this.$refs.formName.validate()){
          this.updatePasswordAndData();
        }
      }else{
        if(this.$refs.formName.validate()){
          this.updateData();
        }
      }
    },
    cancel(){
      this.resetForm();
    }
  },
  components: {
    "navbar-component": Header,
    "footer-component": Footer,
  },
  mounted(){
    this.readData();
  }
};
</script>
