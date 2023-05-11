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
      let oBestheroes = {
        BestHeroes: [
          {
            id: 0,
            imgId: 0,
            winCount: 0,
            lossCount: 0,
            lastPlayedDateTime: 0,
            activity: false,
          },
        ],
      };
      if (this.userHeroesStore.player.heroesPerformance) {
        for (
          let i = 0;
          i < this.userHeroesStore.player.heroesPerformance.length;
          i++
        ) {
          oBestheroes.BestHeroes.push({
            id: this.userHeroesStore.player.heroesPerformance[i].heroId,
            imgId: this.userHeroesStore.player.heroesPerformance[i].heroId,
            winCount: this.userHeroesStore.player.heroesPerformance[i].winCount,
            lossCount:
              this.userHeroesStore.player.heroesPerformance[i].lossCount,
            lastPlayedDateTime:
              this.userHeroesStore.player.heroesPerformance[i]
                .lastPlayedDateTime,
            activity:
              parseInt(new Date().getTime() / 1000) -
                this.userHeroesStore.player.heroesPerformance[i]
                  .lastPlayedDateTime <
              5259486,
          });
        }
        oBestheroes.BestHeroes.sort((a, b) =>
          a.winCount > b.winCount ? 1 : -1
        );
      }
      return oBestheroes;
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