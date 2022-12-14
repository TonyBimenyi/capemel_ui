<template>
  <div class="" v-if="$store.state.user">
    <nav-bar></nav-bar>

  </div>

  <div class="" v-else>
    <login-account></login-account>
  </div>
</template>
<script>
import navBar from './components/navbar.vue'
import loginAccount from './components/Auth/login.vue'
import ToastedNotification from './components/ToastedNotification.vue'

export default {
components:{
  loginAccount,
  navBar,
  ToastedNotification,
},
mounted(){
      this.$store.commit("initializeStore")
  }
  }
</script>
<style lang="scss">
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}

nav {
padding: 30px;

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
}
</style>
