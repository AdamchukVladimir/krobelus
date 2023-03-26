<template>
  <nav></nav>
  <router-view />
</template>

<script setup>
/*
<template>
  <nav>
    <router-link :to="{ name: 'HeroList' }">Heroes</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link> |

    <router-link :to="{ name: 'Enemy' }">Enemy</router-link>
  </nav>
  <router-view />
</template>
*/
import { useRecomendationStore } from "@/store/recomendationStore";
const recomendationStore = useRecomendationStore();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #4e6985;

  margin-top: 20px;
}
body {
  background-color: #000000;
}

.logo {
  width: 120px;
}
.signupField input,
.loginField input {
  width: 300px;
  height: 40px;

  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #4e6985;
  border-radius: 5px;
  color: #4e6985;
}
.signupField button,
.loginField button {
  width: 320px;
  height: 40px;
  border: 1px solid #4e6985;
  border-radius: 5px;
  background: #4e6985;
  color: #fff;
  cursor: pointer;
}
</style>