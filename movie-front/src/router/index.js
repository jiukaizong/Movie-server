import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/template page/login'
import movie from '@/template page/movie';
import home from '@/views/home/home'
import register from '@/views/register/register'
import movieDetail from '@/views/movieDetail/movieDetail'
import person from '@/views/person/person'
import otherPerson from '@/views/otherPerson/otherPerson'
import search from '@/views/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/movie',
      name: 'movie',
      component: movie,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/register',
          name: 'register',
          component: register
        },
        {
          path: '/movieDetail',
          name: 'movieDetail',
          component: movieDetail
        },
        {
          path: '/person',
          name: 'person',
          component: person
        },
        {
          path: '/otherPerson',
          name: 'otherPerson',
          component: otherPerson
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
      ]
    }
  ]
})
