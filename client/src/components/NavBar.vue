<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#" @click="home()">HacktivOverflow</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#" @click="home()">Home</a>
      </li>
      <li class="nav-item" v-if="user">
        <a class="nav-link" href="#">My Question</a>
      </li>
      <li class="nav-item" v-if="user">
        <a class="nav-link" href="#" data-toggle="modal" data-target="#askModal">Ask a Question</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" v-if="user">
        <a class="nav-link" @click='logout()'>Logout</a>
      </li>
      <li class="nav-item" v-else>
        <a class="nav-link" data-toggle="modal" data-target="#loginModal">Login</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    home: function () {
      this.$router.push({name: 'Home'})
    },
    logout: function () {
      localStorage.removeItem('apptoken')
      this.$store.commit('setUser', null)
    }
  }
}
</script>

<style>
.nav-item{
  cursor: pointer;
}
</style>
