<template>
<div class="home">
  <div v-for="(val, i) in questions" :key="i">
    <question-tile :question="val"></question-tile>
  </div>
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
.home {
height: 100vh;
background-color: whitesmoke;
}
</style>
