<template>
<div class="row">
  <div class="col-md-12 question-tile border-top border-bottom" @click="gotToQuestion()">
    <div class="row">
      <div class="col-md-1">{{question.point}}</div>
      <div class="col-md-1">{{question.answers.length}}</div>
      <div class="col-md-9">
        <h4>{{question.title}}</h4>
      </div>
      <div class="col-md-1" v-if="question.solved">Solved</div>
      <div class="col-md-1" v-else>Unsolve</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['question'],
  created: function () {
  },
  methods: {
    gotToQuestion () {
      this.$router.push(`/questions/${this.question._id}`)
    }
  }
}
</script>

<style scoped>
.row{
margin: 0;
}
.question-tile {
height: 50px;
background-color: beige;
margin: 0;
padding: 10px;
cursor: pointer;
color: #f77f16;
}
.question-tile:hover {
color: #f0a462;
}
</style>
