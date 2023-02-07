import { createRouter, createWebHistory } from 'vue-router'
import HeroList from "../views/HeroList.vue";
import About from "../views/AboutView.vue";
import EnemyPick from "../components/EnemyPick.vue";
import pinia from "@/stores/store.js";
import { useRecommendationStore} from "@/stores/RecommendationStore";

const routes = [
  {
    path: '/',
    name: 'HeroList',
    component: HeroList,
    //beforeEnter: () => {
    //  const recommendationStore = useRecommendationStore(pinia); // <-- passing Pinia instance directly
    //  console.log(recommendationStore.heroes);
    //},
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/enemy',
    name: 'Enemy',
    component: EnemyPick,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
