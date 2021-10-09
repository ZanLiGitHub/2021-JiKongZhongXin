import Vuex from 'vuex'
import getters from '../store'

const routes = [
  {
    path: '/',
    //component: () => import('layouts/MainLayout.vue'),
    component: () => import('layouts/login.vue'),
  },
  // {
  //   path: '/main',
  //   component: () => import('layouts/MainLayout.vue'),
  //   // children:
  // },
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '*',
  //   component: () => import('layouts/Error404.vue')
  // }
]


export default routes
