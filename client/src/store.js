import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    questions: [],
    answers: [],
    votes: [],
    activeQuestion: {
      question: {},
      answers: [],
      votes: [],
      isLoading: false
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getQuestions: (state) => {
      return state.questions
    },
    getAnswers: (state) => {
      return state.answers
    },
    getVotes: (state) => {
      return state.votes
    },
    getActiveQuestion: (state) => {
      return state.activeQuestion
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    addQuestion (state, payload) {
      let temp = [...state.questions]
      temp.push(payload)
      state.questions = [...temp]
    },
    setAnswers (state, payload) {
      state.answers = payload
    },
    addAnswer (state, payload) {
      let tempGolbal = [...state.answers]
      let tempActive = [...state.activeQuestion.answers]
      tempGolbal.push(payload)
      tempActive.push(payload)
      state.answers = [...tempGolbal]
      state.activeQuestion.answers = tempActive
    },
    setVotes (state, payload) {
      state.votes = payload
    },
    setActiveQuestion (state, payload) {
      state.activeQuestion = {
        ...payload,
        isLoading: false
      }
    },
    setLoadingDetailQuestion (state) {
      state.activeQuestion.isLoading = true
    },
    addQuestionVote (state, payload) {
      // let tempQuestion = [...state.activeQuestion]
      // for (let i in tempQuestion.votes) {
      //   if (tempQuestion.votes[i]) {
      //   }
      // }
      // tempActive.push(payload)
      // state.activeQuestion.answers.votes = tempActive
    },
    addAnswerVote (state, payload) {
      let tempAnswers = [...state.activeQuestion.answers]
      for (let i in tempAnswers) {
        if (tempAnswers[i]._id === payload.questionId) {
          if (payload.data.message === 'Vote for answer successfully created!') {
            tempAnswers[i].votes.push(payload.data.vote)
            state.activeQuestion.answers = tempAnswers
          } else {
            for (let j in tempAnswers[i].votes) {
              if (tempAnswers[i].votes[j]._id === payload.data.vote._id) {
                tempAnswers[i].votes.splice(j, 1)
                tempAnswers[i].votes.push(payload.data.vote)
                state.activeQuestion.answers = tempAnswers
              }
            }
          }
        }
      }
      // tempActive.push(payload)
      // state.activeQuestion.answers.votes = tempActive
    },
    removeQuestion (state, payload) {
      let tempQuestion = [...state.questions]
      for (let i in tempQuestion) {
        if (tempQuestion[i]._id === payload) {
          tempQuestion.splice(i, 1)
          state.questions = tempQuestion
        }
      }
    },
    removeAnswer (state, payload) {
      let tempAnswer = [...state.activeQuestion.answers]
      for (let i in tempAnswer) {
        if (tempAnswer[i]._id === payload) {
          tempAnswer.splice(i, 1)
          state.activeQuestion.answers = tempAnswer
        }
      }
    }
  },
  actions: {
    generateData (context) {
      axios
        .get('http://localhost:3000/questions')
        .then(({data}) => {
          context.commit('setQuestions', data.questions)
        })
      axios
        .get('http://localhost:3000/answers')
        .then(({data}) => {
          context.commit('setAnswers', data.answers)
        })
      axios
        .get('http://localhost:3000/votes')
        .then(({data}) => {
          context.commit('setVotes', data.votes)
        })
    },
    generateQuestion (context, payload) {
      context.commit('setLoadingDetailQuestion')
      axios
        .get('http://localhost:3000/questions/' + payload)
        .then(({data}) => {
          context.commit('setActiveQuestion', data.question)
        })
    },
    register (context, payload) {
      axios
        .post('http://localhost:3000/users/', payload)
    },
    login (context, payload) {
      axios
        .post('http://localhost:3000/login', payload)
        .then(({data}) => {
          context.commit('setUser', data.user)
          localStorage.setItem('apptoken', data.apptoken)
        })
    },
    askQuestion (context, payload) {
      let apptoken = localStorage.getItem('apptoken')
      axios
        .post('http://localhost:3000/questions/', {
          title: payload.title,
          description: payload.description
        }, {headers: {apptoken: apptoken}})
        .then(({data}) => {
          context.commit('addQuestion', data.question)
        })
    },
    postAnswer (context, payload) {
      let apptoken = localStorage.getItem('apptoken')
      axios
        .post('http://localhost:3000/answers/' + payload.id, {answer: payload.answer}, {headers: {apptoken: apptoken}})
        .then(({data}) => {
          context.commit('addAnswer', data.answer)
        })
    },
    verify (context) {
      axios.get('http://localhost:3000/verify', {headers: {apptoken: localStorage.getItem('apptoken')}})
        .then(({data}) => {
          if (data.status) {
            context.commit('setUser', data.user)
          } else {
            context.commit('setUser', null)
          }
        })
    },
    voteAnswer (context, payload) {
      let apptoken = localStorage.getItem('apptoken')
      axios
        .post('http://localhost:3000/answers/' + payload.id + '/vote', {vote: payload.vote}, {headers: {apptoken: apptoken}})
        .then(({data}) => {
          context.commit('addAnswerVote', {
            data: data,
            questionId: payload.id
          })
        })
    },
    voteQuestion (context, payload) {
      let apptoken = localStorage.getItem('apptoken')
      axios
        .post('http://localhost:3000/questions/' + payload.id + '/vote', {vote: payload.vote}, {headers: {apptoken: apptoken}})
    },
    deleteQuestion (context, payload) {
      let apptoken = localStorage.getItem('apptoken')
      axios
        .delete('http://localhost:3000/questions/' + payload, {headers: {apptoken: apptoken}})
        .then(() => {
          context.commit('removeQuestion', payload)
        })
    },
    deleteAnswer (context, payload) {
      let apptoken = localStorage.getItem('apptoken')
      axios
        .delete('http://localhost:3000/answers/' + payload, {headers: {apptoken: apptoken}})
        .then(() => {
          context.commit('removeAnswer', payload)
        })
    }
  }
})

export default store
