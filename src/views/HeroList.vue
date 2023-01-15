<template>
  <div class="heroes">
    <div
      class="hero heroPick"
      v-for="hero in result.heroStats.stats"
      :key="hero.heroId"
    >
      <HeroAvatar :heroId="hero.heroId" />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import HeroAvatar from "@/components/HeroAvatar.vue";

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
  <HeroAvatar v-for="hero in heroes" :key="hero.id" />

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



  <a href="#"><img :src="heroImage" /> </a>

  <p>{{ result.heroStats.matchUp }}</p>
  <p v-else v-for="hero in result.heroStats.matchUp" :key="hero">
    {{ hero.vs }}
  </p>
*/

export default {
  name: "HeroList",
  components: {
    HeroAvatar,
  },
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
      heroImage:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/135.png",
    };
  },
  created() {},
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