<template>
<div>
  <div class="row" v-if="!question.isLoading">
    <title-tile :question="question"></title-tile>
    <div class="col-md-12" v-for="(val, i) in question.answers" :key="i">
      <answer-tile :answer="val"></answer-tile>
    </div>
    <div id="answer-input" class="col-md-12">
      <textarea class="form-control" id="exampleTextarea" rows="5" v-model="input" placeholder="Answer the question..."></textarea>
      <button id="post-btn" type="button" class="btn btn-primary" v-if="user" @click="post()">Post</button>
      <button id="post-btn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal" v-else>
        Login to post
      </button>
    </div>
  </div>
  <div class="temp" v-else>
    <div class="loader"></div>
  </div>
</div>

</template>

<script>
import AnswerTile from '@/components/AnswerTile'
import TitleTile from '@/components/TitleTile'
import { mapGetters } from 'vuex'
export default {
  components: {
    AnswerTile,
    TitleTile
  },
  props: ['id'],
  data: function () {
    return {
      input: ``
    }
  },
  computed: {
    ...mapGetters({
      question: 'getActiveQuestion',
      user: 'getUser'
    })
  },
  methods: {
    post () {
      this.$store.dispatch('postAnswer', {
        id: this.id,
        answer: this.input
      }).then(() => {
        this.input = ``
      })
    }
  },
  created () {
    this.$store.dispatch('generateQuestion', this.id)
  },
  watch: {
    id () {
      this.$store.dispatch('generateQuestion', this.id)
    }
  },
  beforeDestroy () {
    this.isloading = true
  }
}
</script>

<style scoped>
.row{
margin: 0;
}
.temp{
  height: 150px;
}
#answer-input{
margin-top: 25px;
padding-left: 25px;
padding-right: 25px;
}
#post-btn{
margin-top: 10px;
width: 100%
}
/* .loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  margin-top: 50px;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
} */
.loader {
  position: relative;
  top: 10em;
  margin: 0 auto;
  width: 50%;
  border: 16px solid #ffb46e;
  border-radius: 50%;
  border-top: 16px solid #f77f16;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
