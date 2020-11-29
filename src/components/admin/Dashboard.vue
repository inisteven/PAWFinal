<template>
    <div class="Dashboard">
        <h1>haiiiiiiiiii</h1>
    </div>
</template>
<script>
export default{
    name: "Dashboard",
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