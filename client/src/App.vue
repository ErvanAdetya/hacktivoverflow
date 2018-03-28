<template>
  <div id="app">
    <div class="container">
      <nav-bar></nav-bar>
      <router-view/>
    </div>
    <login></login>
    <new-question></new-question>
    <register></register>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Login from '@/components/Login'
import NewQuestion from '@/components/NewQuestion'
import Register from '@/components/Register'
export default {
  name: 'App',
  components: {
    NavBar,
    Login,
    NewQuestion,
    Register
  },
  created () {
    this.$store.dispatch('verify')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f77f16;
}
</style>
