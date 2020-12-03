<template>
  <v-main class="list">
    <v-container class="center">
      <h1 class="font-weight-black text-center">Welcome to Dashboard</h1>
      <h5 class="text-center">Select Category</h5>
      <v-row class="">
        <v-col
          v-for="item in kategori"
          :key="item.key"
          class="col-md-4 col-sm-12 rounded-lg"
          style="padding: 35px"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              width="300px"
              height="100px"
              class="text-center rounded-lg align-items-center d-flex justify-content-center"
              @click="movePath(item.to)"
              style="cursor: pointer; margin-top: 150px"
            >
              <h3 class="text-center">
                <strong>{{ item.text }}</strong>
              </h3>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      kategori: [
        { text: "MAN", key: "man", to: "/admin/man" },
        { text: "WOMAN", key: "woman", to: "/admin/woman" },
        { text: "ACC", key: "acc", to: "/admin/acc" },
      ],
    };
  },
  methods: {
    movePath(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped></style>
