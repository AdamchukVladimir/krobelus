<template>
  <p v-if="error">{{ error }}</p>
  <p>{{ result.heroStats.matchUp }}</p>
  <div></div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

/*
const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;
*/
/*
  <p>{{ result.heroStats.matchUp }}</p>
  <p v-else v-for="hero in result.heroStats.matchUp" :key="hero.heroId2">
    {{ hero.heroId2 }}
  </p>
*/

const CHARACTERS_QUERY = gql`
  {
    heroStats {
      matchUp(heroId: 14, week: 1670803200, take: 123) {
        vs {
          heroId1
          heroId2
          week
          matchCount
          winCount
          winRateHeroId1
          winRateHeroId2
          winsAverage
        }
      }
    }
  }
`;

export default {
  name: "App",
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    return {
      result,
      loading,
      error,
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