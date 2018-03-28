<template>
<div class="question-page">
  <router-view></router-view>
</div>
</template>

<script>
import QuestionTile from '@/components/QuestionTile'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionTile
  },
  computed: {
    ...mapGetters({
      questions: 'getQuestions'
    })
  },
  created: function () {
    this.$store.dispatch('generateData')
  }
}
</script>

<style>
.question-page {
height: 100vh;
background-color: whitesmoke;
}
</style>
