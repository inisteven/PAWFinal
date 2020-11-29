<template>
    <div class="Dashboard">
        <v-navigation-drawer class="fullheight" width="300px" app fixed>
            <v-list-item>
                <v-list-item-content>
                    <img src="../../assets/logo.png" alt width="200px">
                </v-list-item-content>
            </v-list-item>
            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title class="pa-8">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer/>
            <v-toolbar-items>
                <v-btn text router @click="logout"><v-icon>mdi-power</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
        <v-dialog v-model="dialog" max-width="400px">
            <v-card >
                <v-card-title>Do you sure want to logout ?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-2" @click="cancelLogout" class="mr-3 mb-5">No</v-btn>
                    <v-btn color="grey" @click="logoutConfirm" class="mr-3 mb-5">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default{
    name: "Dashboard",
    data(){
        return{
            dialog:false,
            drawer: true,
            items:[
                { title: "Dashboard", to:"/admin-dashboard"},
                { title: "Man", to: "/admin/man" },
                { title: "Woman", to: "/admin/woman" },
                { title: "Accessories", to: "/admin/acc" },
            ],
        };
    },
    methods:{
        logout(){
            this.dialog = true;
        },
        logoutConfirm(){
            this.$http.post(this.$api + '/logout',null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
            }).then(response => {
                console.log(response.data.message);
                localStorage.removeItem('token');
                this.$router.push({
                    name: 'login',
                });
            }).catch(error => {
                alert(error.response.data.message);
            })
        },
        cancelLogout(){
            this.dialog = false;
        }
    }
};
</script>
<style scoped>
.fullheight{
    min-height: 100vh !important;
}
.router{
    text-decoration: none;
    color: black;
}
</style>