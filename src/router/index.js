import { createRouter, createWebHistory } from 'vue-router'
import HeroList from "../views/HeroList.vue";
import About from "../views/AboutView.vue";
const routes = [
  {
    path: '/',
    name: 'HeroList',
    component: HeroList
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
