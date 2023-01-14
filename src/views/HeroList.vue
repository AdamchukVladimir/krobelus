<template>
  <p v-if="error">{{ error }}</p>

  <div
    class="hero heroPick"
    v-for="hero in result.heroStats.stats"
    :key="hero.heroId"
  >
    {{ hero.heroId }}
    <div class="hero-image heroPick-image">
      <a href="#"><img :src="heroImage" /> </a>
    </div>
  </div>

  <div></div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const CHARACTERS_QUERY = gql`
  {
    heroStats {
      stats {
        heroId
      }
    }
  }
`;
/*
  <p>{{ result.heroStats.matchUp }}</p>
  <p v-else v-for="hero in result.heroStats.matchUp" :key="hero">
    {{ hero.vs }}
  </p>
*/

export default {
  name: "HeroList",
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
  data() {
    return {
      heroImage: "G://IT/GIT/GraphQl/krobelus/src/assets/hero_img/135.png",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>