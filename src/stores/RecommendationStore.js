import { defineStore } from 'pinia';
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
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

export const useRecommendationStore = defineStore('recommendationStore', {
    setup() {
        const { result, loading, error } = useQuery(CHARACTERS_QUERY);
        return {
          result,
          loading,
          error,
        };
      },
    state: () => ({
       heroes: ['test1', 'test2'], 
       //heroes: this.result, 
    }),

actions:{
    async getHeroes(){
    }
}
});