import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Question from '@/components/QuestionPage'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/questions',
      component: Question,
      children: [
        {
          path: ':id',
          name: 'Question Detail',
          component: QuestionDetail,
          props: true
        }
      ]
    }
  ]
})
