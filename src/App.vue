<template>
  <v-app>
    <transition 
      mode="out-in" 
      leave-active-class="animated fadeOut" 
      enter-active-class="animated fadeInDown"
    >
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>

