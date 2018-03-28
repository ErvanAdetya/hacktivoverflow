<template>
<div class="row answer col-md-12 border-top border-bottom">
  <div class="col-md-1 answer-vote" v-if="user">
    <div v-if="vote === 'none'">
      <small class="none" @click="voting(true)">
        <button class="btn btn-outline-success">^</button>
      </small><br>
        {{answer.votes.length}}<br>
      <small class="none" @click="voting(false)">
        <button class="btn btn-outline-danger">v</button>
      </small>
    </div>
    <div v-else>
      <div v-if="vote">
        <small class="upvote">
          <button class="btn btn-success">^</button>
        </small><br>
          {{answer.votes.length}}<br>
        <small class="none" @click="voting(false)">
          <button class="btn btn-outline-danger">v</button>
        </small>
      </div>
      <div v-else>
        <small class="none" @click="voting(true)">
          <button class="btn btn-outline-success">^</button>
        </small><br>
          {{answer.votes.length}}<br>
        <small class="downvote">
          <button class="btn btn-danger">v</button>
        </small>
      </div>
    </div>
  </div>
  <div class="col-md-1" v-else></div>
  <div class="col-md-10">
    <div class="col-md-12">
      <small>{{answer.user.username}}</small>
      <p>{{answer.answer}}</p>
      <small>{{answer.createdAt}}</small>
    </div>
  </div>
  <div class="col-md-1">
    <button class="btn btn-outline-danger" v-if="owner" @click="deleteAnswer()">
      <small>Delete</small>
    </button>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['answer'],
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
      this.$store.dispatch('voteAnswer', {
        vote: value,
        id: this.answer._id
      })
        .then(() => {
          this.vote = value
        })
    },
    deleteAnswer () {
      this.$store.dispatch('deleteAnswer', this.answer._id)
    }
  },
  created () {
    if (this.answer.votes.length) {
      for (let i in this.answer.votes) {
        if (this.answer.votes[i].user === this.user.id) {
          this.vote = this.answer.votes[i].vote
        }
      }
    } else {
      this.vote = 'none'
    }

    if (this.user) {
      if (this.user.id === this.answer.user._id) {
        this.owner = true
      }
    }
  }
}
</script>

<style>
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
.answer {
min-height: 75px;
padding-top: 25px;
padding-bottom: 25px;
}
</style>
