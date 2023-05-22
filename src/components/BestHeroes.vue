<template>
  <Header />
  <div class="wrapper_profile">
    <div class="profile_avatar"><img :src="fAvatarImage" /></div>
    <div class="heroes_summary">
      <div class="simpleHeroes">
        <template
          v-for="hero in fSimpleSummary.Simpleheroes"
          :key="hero.id + hero.winCount"
        >
          <div class="simpleHero" v-if="hero.id > 0">
            <HeroAvatar :heroObj="hero" />
          </div>
        </template>
      </div>
      <div class="bestHeroes">
        <template
          v-for="hero in fBestheroes.BestHeroes"
          :key="hero.heroId + hero.winCount"
        >
          <div class="bestHero" v-if="hero.activity == true">
            <HeroAvatar :heroObj="hero" />
            {{ hero.winCount }}
          </div>
        </template>
      </div>
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
import { getBestHeroes, getSimpleSummary } from "@/services/PlayerSummary";

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
  data() {
    return {};
  },
  computed: {
    ...mapState(useUsersStore, {
      userSteamID32Store: "userSteamID32",
      userSteamAvatarStore: "userSteamAvatar",
      userHeroesStore: "userHeroes",
    }),
    fAvatarImage() {
      if (this.userSteamAvatarStore) return this.userSteamAvatarStore;
    },
    fBestheroes() {
      return getBestHeroes(this.userHeroesStore);
    },
    fSimpleSummary() {
      return getSimpleSummary(this.userHeroesStore);
    },
  },
  mounted() {
    console.log("mounteduserSteamAvatarStore " + this.userSteamAvatarStore);
    console.log(
      "userHeroesVue " +
        JSON.stringify(this.userHeroesStore.player.heroesPerformance)
    );
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
    "profile_avatar heroes_summary"
    "settings recomendationHeroes";
}

.heroes_summary {
  grid-area: heroes_summary;
  display: grid;
  width: 500px;
  margin-bottom: 10px;

  grid-template-columns: 240px;
}

.simpleHeroes {
  display: grid;
  width: 150px;
  gap: 7px;
  grid-template-columns: 50px 50px 50px;
}

.bestHeroes {
  display: grid;
  width: auto;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
</style>