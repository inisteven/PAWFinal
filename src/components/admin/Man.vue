<template>
  <v-main class="list">
    <div v-show="tambah">
      <body-1 class="grey--text">Category</body-1>
      <h1 class="font-weight-medium mb-5 font-weight-black">Man's Products</h1>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="light-blue darken-3 rounded" small dark @click="Tambah">
            Add Product
          </v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="products" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn small class="mr-2" @click="editHandler(item)">Edit</v-btn>
            <v-btn small @click="deleteHandler(item.id_produkM)">Delete</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <div v-show="!tambah">
      <v-card class="m-5">
        <v-card-body>
          <v-container>
            <h3 class="text-h3 font-weight-medium mb-5">{{ titleForm }}</h3>
            <v-form v-model="valid" ref="form">
              <v-row>
                <v-col class="col-12">
                  <p>Product Name</p>
                  <v-text-field
                    :rules="nameRules"
                    v-model="form.name"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-md-6 col-sm-12">
                  <p>Price</p>
                  <v-text-field
                    :rules="priceRules"
                    prefix="Rp. "
                    v-model="form.price"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col class="col-md-6 col-sm-12">
                  <p>Stock</p>
                  <v-text-field
                    :rules="stokRules"
                    suffix="Pcs"
                    v-model="form.stok"
                    outlined
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-12">
                  <p>Product Description</p>
                  <v-textarea
                    :rules="descRules"
                    v-model="form.description"
                    :no-resize="false"
                    :outlined="true"
                    :rows="4"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-md-4 col-sm-12">
                  <div v-if="this.inputType == 'Ubah'">
                    <img :src="imagePathEdit" width="200px" />
                  </div>
                  <div v-if="this.inputType == 'Tambah'">
                    <img :src="imagePathCreate" width="400px" />
                  </div>
                </v-col>
                <v-col class="col-md-8 col-sm-12">
                  <p>Product Picture</p>
                  <input
                    ref:fileInput
                    type="file"
                    :rules="imageRules"
                    required
                    @change="getImage"
                  />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn class="mr-5" depressed color="error" @click="cancel">
                  Cancel
                </v-btn>
                <v-btn depressed color="primary" @click="setForm"> Save </v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card-body>
      </v-card>
    </div>

    <v-dialog v-model="dialogConfirm" persisten max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text> Do you sure want to delete this product ? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "Man",
  data() {
    return {
      imagePathEdit: "",
      imagePathCreate: "",
      titleForm: "",
      fileInput: "",
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      valid: "false",
      color: "",
      search: "",
      tambah: true,
      nameRules: [(v) => !!v || "Name is required !"],
      priceRules: [(v) => !!v || "Price is required !"],
      descRules: [(v) => !!v || "Description is required !"],
      stokRules: [(v) => !!v || "Stock is required !"],
      imageRules: [(v) => !!v || "Image is required !"],
      dialogConfirm: false,
      dialogDelete: false,
      headers: [
        {
          text: "Product Name",
          align: "start",
          sortable: true,
          value: "nama_produkM",
        },
        { text: "Price", value: "harga_produkM" },
        { text: "Description", value: "deskripsi_produkM" },
        { text: "Stok", value: "stok" },
        { text: "Actions", value: "actions" },
      ],
      product: new FormData(),
      products: [],
      form: {
        name: null,
        price: null,
        stok: null,
        description: null,
        image: null,
      },
      deleteId: "",
      editId: "",
    };
  },
  methods: {
    readData() {
      var url = this.$api + "/man";
      this.$http
        .get(
          url
          //{ headers: {
          //     'Authorization': 'Bearer ' + localStorage.getItem('token')
          // }}
        )
        .then((response) => {
          this.products = response.data.data;
        });
    },
    getImage(e) {
      let image = e.target.files[0];
      this.form.image = image;
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        if (this.inputType == "Ubah") this.imagePathEdit = e.target.result;
        this.imagePathCreate = e.target.result;
      };

      if (this.inputType == "Ubah") this.uploadImage();
    },
    uploadImage() {
      let image = new FormData();
      image.append("gambar_produkM", this.form.image);
      var url = this.$api + "/man/upload-image/" + this.editId;
      this.imagePathEdit = this.imagePathCreate;
      this.$http
        .post(
          url,
          image
          // {
          //         headers:{
          //             'Authorization': 'Bearer ' + localStorage.getItem('token')
          //         }
          // }
        )
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    setForm() {
      if (this.inputType === "Tambah") {
        this.save();
      } else {
        this.update();
      }
    },
    Tambah() {
      this.tambah = false;
      this.titleForm = "Add Product";
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_produkM;
      this.form.name = item.nama_produkM;
      this.form.price = item.harga_produkM;
      this.form.stok = item.stok;
      this.form.description = item.deskripsi_produkM;
      this.form.image = item.gambar_produkM;
      this.imagePathEdit = this.$url + "products/" + item.gambar_produkM;
      this.dialog = true;
      this.tambah = false;
      this.titleForm = "Edit Product";
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/man/" + this.deleteId;
      //data dihapus berdasarkan id
      this.$http
        .delete(
          url
          // {
          //     headers:{
          //         'Authorization': 'Bearer ' + localStorage.getItem('token')
          //     }
          // }
        )
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.dialogConfirm = false;
          this.readData();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    cancel() {
      this.changePage();
      this.resetForm();
    },
    update() {
      if (this.$refs.form.validate()) {
        let newData = {
          nama_produkM: this.form.name,
          harga_produkM: this.form.price,
          deskripsi_produkM: this.form.description,
          stok: this.form.stok,
        };
        var url = this.$api + "/man/" + this.editId;
        this.load = true;
        this.$http
          .put(
            url,
            newData
            // {
            //         headers:{
            //             'Authorization': 'Bearer ' + localStorage.getItem('token')
            //         }
            // }
          )
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.readData();
            this.changePage();
            this.resetForm();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        this.product.append("nama_produkM", this.form.name);
        this.product.append("harga_produkM", this.form.price);
        this.product.append("deskripsi_produkM", this.form.description);
        this.product.append("gambar_produkM", this.form.image);
        this.product.append("stok", this.form.stok);
        console.log(this.product.gambar_produkM);
        var url = this.$api + "/man/";
        this.load = true;
        this.$http
          .post(
            url,
            this.product
            // {
            //         headers:{
            //             'Authorization': 'Bearer ' + localStorage.getItem('token')
            //         }
            // }
          )
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.readData();
            this.changePage();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    changePage() {
      this.tambah = true;
      this.titleForm = "";
      this.inputType = "Tambah";
      this.imagePathEdit = "";
      this.imagePathCreate = "";
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.fileInput.value = "";
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
<style scoped>
img {
  max-width: 300px;
}
</style>
