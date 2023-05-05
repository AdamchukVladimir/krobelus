<template>
  <Header />
  <div class="wrapper_profile">
    <div class="profile_avatar"><img :src="fAvatarImage" /></div>
    <div class="heroes_bestHeoes">
      <HeroAvatar :heroObj="hero" />

      {{ userSteamID32Store }}
      {{ resultPlayer }}
    </div>
  </div>
</template>
<script>
import HeroAvatar from "@/components/HeroAvatar.vue";
import Header from "@/components/Header.vue";
import { useUsersStore } from "@/store/usersStore";
import { mapActions, mapState } from "pinia";
import gql from "graphql-tag";
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import apolloClient from "@/api/ApolloClientGraphQL.js";

const USER_HEROES_QUERY2 = gql`
  query getPayerByAccoutId($id: Long!) {
    player(steamAccountId: 243995167) {
      simpleSummary {
        matchCount
        heroes {
          heroId
          winCount
          lossCount
        }
      }
      lastMatchDate
      matchCount
      heroesPerformance(request: { orderBy: ASC }, take: 125) {
        heroId
        matchCount
        winCount
        lastPlayedDateTime
      }
    }
  }
`;
const USER_HEROES_QUERY = gql`
  {
    player(steamAccountId: 243995167) {
      simpleSummary {
        matchCount
        heroes {
          heroId
          winCount
          lossCount
        }
      }
      lastMatchDate
      matchCount
      heroesPerformance(request: { orderBy: ASC }, take: 125) {
        heroId
        matchCount
        winCount
        lastPlayedDateTime
      }
    }
  }
`;

// setup() {
//   const { result: resultPlayer } = useQuery(USER_HEROES_QUERY, {});
//   return {
//     resultPlayer,
//     loading,
//     error,
//   };
// },
export default {
  name: "BestHeoes",
  components: {
    HeroAvatar,
    Header,
  },
  props: {
    enemyId: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const { result: resultPlayer } = useQuery(USER_HEROES_QUERY);
    return resultPlayer;
  },
  data() {
    return {
      EnemyFlag: false,
      counter: 0,
      hero: {
        imgId: 2,
      },
    };
  },
  computed: {
    ...mapState(useUsersStore, {
      userSteamID32Store: "userSteamID32",
      userSteamAvatarStore: "userSteamAvatar",
    }),
    fAvatarImage() {
      console.log("userSteamAvatarStore " + this.userSteamAvatarStore);
      if (this.userSteamAvatarStore) return this.userSteamAvatarStore;
    },
  },
  mounted() {
    console.log("mounteduserSteamAvatarStore " + this.userSteamAvatarStore);
  },
};
</script>
<style>
.wrapper_profile {
  display: grid;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  grid-gap: 50px 10px;
  grid-template-columns: 3fr 4fr;
  grid-template-areas:
    "profile_avatar heroes_bestHeoes"
    "settings recomendationHeroes";
}
</style>