import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Song from '../views/Song.vue'
import Tout from '../views/Tout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Song',
    name: 'Song',
    component: Song
  },
  {
    path: '/Tout',
    name: 'Tout',
    component: Tout
  },
  {
    path: '/Connection',
    name: 'Connection',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Connection.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
