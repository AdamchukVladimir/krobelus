<template>
  <div class="wrapper">
    <button @click="createVersus()">Submit</button>
    test {{ changeTest() }}
    {{ result }}
  </div>
</template>

<script>
//<div class="heroes recommended_choice" @click="singinStore('vlodya')" >
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
/*
const VERSUS_QUERY = gql`
  {
    heroStats {
      matchUp(heroId: 52, week: 1676246452, take: 124) {
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
*/
const CHARACTERS_QUERY = gql`
  {
    constants {
      heroes {
        id
        stats {
          primaryAttribute
        }
      }
    }
  }
`;
const VERSUS_MUTATION = gql`
  mutation CreateVersusMutation($heroId: String!) {
    createVersus(heroId: $heroId) {
      heroStats {
        matchUp(heroId: 52, week: 1676246452, take: 124) {
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
  }
`;
export default {
  name: "RecomendationPick",
  components: {},
  setup() {
    /*
    const { result, loading, error } = useQuery(VERSUS_QUERY);
    return {
      result,
      loading,
      error,
    };
    */
  },
  data() {
    return {
      enemyId: 5,
      test: "test1",
    };
  },
  computed: {
    test: 1,
  },
  methods: {
    createVersus() {
      const { heroId } = 4;
      this.$apollo.mutate({
        mutation: VERSUS_MUTATION,
        variables: {
          heroId,
        },
      });
    },
    changeTest() {
      return this.$apollo;
    },
  },
};
</script>

<style>
</style>