import { createRouter, createWebHistory } from 'vue-router'
import HeroList from "../views/HeroList.vue";
import About from "../views/AboutView.vue";
import EnemyPick from "../components/EnemyPick.vue";
import SignUp from "../components/SignUp.vue";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import BestHeroes from "../components/BestHeroes.vue";
import { useUsersStore } from "@/store/usersStore";
import VueCookies from "vue-cookies";

const routes = [
  {
    path: '/',
    name: 'HeroList',
    component: HeroList,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/enemy',
    name: 'Enemy',
    component: EnemyPick,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: BestHeroes,
    meta: {requiresAuth: true},
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {requiresGuest: true},
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {requiresGuest: true},
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
обрабатывает переходы на разные страницы,
Если в usersStore нет логина, пытается добавить его из куки
После этого проверяет наличие логина в userStore и открывает джоступ к страницам, либо перенаправляет на Login
**/

router.beforeEach((to,from,next) => {
  console.log(`Before each:`);
  const usersStore = useUsersStore();
  if (!usersStore.userlogin && VueCookies.isKey("krobelus_login") && VueCookies.isKey("krobelus_pass")){
    usersStore.signin(VueCookies.get("krobelus_login"), VueCookies.get("krobelus_pass"));
  }
  if (!usersStore.userSteamID && VueCookies.isKey("tokenSteam")){
    usersStore.signinSteam(VueCookies.get("signinSteam"));
  }
  console.log('usersStore.userSteamID' + usersStore.userSteamID);
  if (to.matched.some(record => record.meta.requiresAuth)){ //if (to.meta.requiresAuth){
    if (!usersStore.userlogin && !usersStore.userSteamID){
      next({
        name:"Login"
      });
    }
    else{
      next();
    }
  }
  //else if (to.meta.requiresGuest){
    if (to.matched.some(record => record.meta.requiresGuest)){  
    console.log(`to.meta.requiresGuest`);
    console.log('usersStore.userSteamID2' + usersStore.userSteamID);
    //if (usersStore.userlogin){
      if (usersStore.userlogin || usersStore.userSteamID || VueCookies.isKey("tokenSteam")){  
      console.log(`usersStore.userlogin` + usersStore.userlogin);
      next({
        name:"HeroList"
      });
    }
    else{
      next();
    }  
  }
  else{
    next();
  }
});

export default router
