import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import weatherReport from '@/components/weatherReport'
import store from '@/store'
import { config } from '@/config/env'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/weatherReport',
      name: 'weatherReport',
      component: weatherReport
    }
  ]
})
