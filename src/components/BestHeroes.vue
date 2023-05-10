<template>
  <Header />
  <div class="wrapper_profile">
    <div class="profile_avatar"><img :src="fAvatarImage" /></div>
    <div class="heroes_bestHeoes">
      <div class="simpleHeroes">
        <template
          v-for="hero in fSimpleSummary.Simpleheroes"
          :key="hero.heroId + hero.winCount"
        >
          <div class="simpleHero" v-if="hero.id > 0">
            <HeroAvatar :heroObj="hero" />
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
      console.log("userSteamAvatarStore " + this.userSteamAvatarStore);
      if (this.userSteamAvatarStore) return this.userSteamAvatarStore;
    },
    fSimpleSummary() {
      let oSimpleSummary = {
        Simpleheroes: [
          {
            id: 0,
            winCount: 0,
            lossCount: 0,
          },
        ],
      };
      if (this.userHeroesStore.player.simpleSummary.heroes) {
        for (
          let i = 0;
          i < this.userHeroesStore.player.simpleSummary.heroes.length;
          i++
        ) {
          console.log("fSimpleSummary ");
          oSimpleSummary.Simpleheroes.push({
            id: this.userHeroesStore.player.simpleSummary.heroes[i].heroId,
            imgId: this.userHeroesStore.player.simpleSummary.heroes[i].heroId,
            winCount:
              this.userHeroesStore.player.simpleSummary.heroes[i].winCount,
            lossCount:
              this.userHeroesStore.player.simpleSummary.heroes[i].lossCount,
          });
        }
      }
      console.log("oSimpleSummary " + JSON.stringify(oSimpleSummary));
      return oSimpleSummary;
    },
  },
  mounted() {
    console.log("mounteduserSteamAvatarStore " + this.userSteamAvatarStore);
    console.log(
      "userHeroesVue " +
        JSON.stringify(this.userHeroesStore.player.simpleSummary.heroes)
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
    "profile_avatar heroes_bestHeoes"
    "settings recomendationHeroes";
}
</style>