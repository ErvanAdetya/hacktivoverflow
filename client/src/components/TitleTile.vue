<template>
<div id="question" class="row col-md-12">
  <div id="question-vote" class="col-md-3" v-if="user">
    <div v-if="vote === 'none'">
      <small class="none" @click="voting(true)">
        <button class="btn btn-outline-success">^</button>
      </small><br>
      {{question.votes.length}}<br>
      <small class="none" @click="voting(false)">
        <button class="btn btn-outline-danger">v</button>
      </small>
    </div>
    <div v-else>
      <div v-if="vote">
        <small class="upvote">
          <button class="btn btn-success">^</button>
        </small><br>
        {{question.votes.length}}<br>
        <small class="none" @click="voting(false)">
          <button class="btn btn-outline-danger">v</button>
        </small>
      </div>
      <div v-else>
        <small class="none" @click="voting(true)">
          <button class="btn btn-outline-success">^</button>
        </small><br>
        {{question.votes.length}}<br>
        <small class="downvote">
          <button class="btn btn-danger">v</button>
        </small>
      </div>
    </div>
    <button class="btn btn-outline-danger mt-3" v-if="owner" @click="deleteQuestion()">Delete</button>
    <!-- <button v-if="owner">Edit</button> -->
  </div>
  <div class="col-md-3" v-else></div>
  <div class="col-md-9">
    <div id="title" class="col-md-12">
      <h2>{{question.title}}</h2>
    </div>
    <div id="description" class="col-md-12">
      <p>{{question.description}}</p>
      <small>{{question.user.username}} - {{question.createdAt}}</small>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['question'],
  data: function () {
    return {
      vote: `none`,
      owner: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    voting (value) {
      this.$store.dispatch('voteQuestion', {
        vote: value,
        id: this.question._id
      })
        .then(() => {
          this.vote = value
        })
    },
    deleteQuestion () {
      this.$store.dispatch('deleteQuestion', this.question._id)
        .then(() => {
          this.$router.push({name: 'Home'})
        })
    }
  },
  created () {
    if (this.question.votes.length) {
      for (let i in this.question.votes) {
        if (this.question.votes[i].user === this.user.id) {
          this.vote = this.question.votes[i].vote
        }
      }
    } else {
      this.vote = 'none'
    }

    if (this.user) {
      if (this.user.id === this.question.user._id) {
        this.owner = true
      }
    }
  }
}
</script>

<style scoped>
.none {
cursor: pointer;
}
.upvote {
cursor: pointer;
color: green
}
.downvote {
cursor: pointer;
color: red
}
.row{
margin: 0;
}
#question{
padding: 25px;
}
#question-vote{
background:whitesmoke;
}
#description{
min-height: 200px;
}
</style>
