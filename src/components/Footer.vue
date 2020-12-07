<template>
  <div class="bawah">
    <v-container>
      <v-row>
        <v-col class="col-md-3 col-sm-12 col-xs-12">
          <h6 class="text-uppercase mb-4 font-weight-bold">OLEHS STYLE</h6>
          <p>
            OLEHs Style opened in September of 2020 as a concept store to provide the
            latest fashion trends from around the globe under one roof at an affordable
            price.
          </p>
          <p>Enjoy and happy shopping!</p>
          <p>© 2020 Copyright: OLEH STYLE</p>
        </v-col>
        <hr class="w-100 clearfix d-md-none" />
        <v-col class="col-md-3 col-sm-12 col-xs-12">
          <h6 class="text-uppercase mb-4 font-weight-bold">CATEGORIES</h6>
          <ul style="list-style-type: none">
            <li>
              <router-link text router to="/woman">Woman</router-link>
            </li>
            <li>
              <router-link text router to="/man">Man</router-link>
            </li>
            <li>
              <router-link text router to="/acc">Accesorries</router-link>
            </li>
          </ul>
        </v-col>
        <hr class="w-100 clearfix d-md-none" />
        <v-col class="col-md-3 col-sm-12 col-xs-12">
          <h6 class="text-uppercase mb-4 font-weight-bold">FOLLOW US</h6>
          <p>
            <v-icon md icon color="white">mdi-facebook</v-icon
            ><a href="https://web.facebook.com/?_rdc=1&_rdr"> Facebook </a>
          </p>
          <p>
            <v-icon icon color="white">mdi-twitter</v-icon>
            <a href="https://twitter.com/home">Twitter </a>
          </p>
          <p>
            <v-icon icon color="white">mdi-instagram</v-icon>
            <a href="https://instagram.com">Instagram</a>
          </p>
          <p>
            <v-icon icon color="white">mdi-youtube</v-icon>
            <a href="https://youtube.com">Youtube</a>
          </p>
        </v-col>

        <v-col class="col-md-3 col-sm-12 col-xs-12">
          <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
          <p>
            Jl. Babarsari No.43, Janti, Caturtunggal, <br />
            Kec. Depok, Kabupaten Sleman,<br />
            Daerah Istimewa Yogyakarta <br />
            55281
          </p>
          <p>Call : (0274) 487711</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.bawah {
  background-color: #3e3e3e;
  color: #dfdfdf;
  margin-top: 150dp;
  font-size: 12px;
  left: 0px;
  width: 100%;
  display: grid;
  grid-template-columns: auto;
}

.page-footer a {
  text-decoration: none;
  color: #dfdfdf;
  font-size: 12px;
}

a {
  color: white;
  margin-left: 5px;
}

li {
  margin-bottom: 10px;
  margin-left: -29px;
}
</style>
