<template>
  <nav>
    <router-link :to="{ name: 'HeroList' }">Heroes</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link> |

    <router-link :to="{ name: 'Enemy' }">Enemy</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #4e6985;

  margin-top: 60px;
}
body {
  background-color: #000000;
}
</style>