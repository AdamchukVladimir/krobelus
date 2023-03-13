<template>
  <div class="wrapper">
    <div class="heroes enemyPick">
      <div class="clear">
        <a v-on:click="clearAllEnemy()"
          ><img
            src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/clear.png"
          />
        </a>
      </div>
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy1"
        :enemyObject="enemy1heroId"
        :enemyId="1"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy2"
        :enemyObject="enemy2heroId"
        :enemyId="2"
      />

      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy3"
        :enemyObject="enemy3heroId"
        :enemyId="3"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy4"
        :enemyObject="enemy4heroId"
        :enemyId="4"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy5"
        :enemyObject="enemy5heroId"
        :enemyId="5"
      />
      currentenemy
      {{ currentEnemy }}
    </div>
    <div class="heroes heroesPull">
      <div class="hero str">
        <template
          v-for="hero in mainResult.heroes"
          :key="hero.id + hero.activity"
        >
          <div class="heroPick" v-if="hero.primaryAttribute == 'str'">
            <HeroAvatar @eHeroPick="getHeroId" :heroObj="hero" />
          </div>
        </template>
      </div>
      <div class="hero agi">
        <template
          v-for="hero in mainResult.heroes"
          :key="hero.id + hero.activity"
        >
          <div class="heroPick" v-if="hero.primaryAttribute == 'agi'">
            <HeroAvatar @eHeroPick="getHeroId" :heroObj="hero" />
          </div>
        </template>
      </div>
      <div class="hero int">
        <template
          v-for="hero in mainResult.heroes"
          :key="hero.id + hero.activity"
        >
          <div class="heroPick" v-if="hero.primaryAttribute == 'int'">
            <HeroAvatar @eHeroPick="getHeroId" :heroObj="hero" />
          </div>
        </template>
      </div>
      <br /><br /><br />
      <RecomendationPick />
    </div>
    <div>
      <button @click="sendMessage({ text: 'Hello' })">Send message</button>
    </div>

    <div
      class="heroes recommended_choice"
      @click="getDefaultHeroesStore(result)"
    >
      getData
      {{ resultVersusLoading }}
    </div>
    <div class="heroes getDefaultQuery" @click="setTestState(12)">
      getDefaultQuery
      {{ getVersusHero1 }}
      {{ enemy1heroStoreComputed }}
      {{ getTestStore }}
      {{ MainResultVersus }}
    </div>
  </div>
</template>



<script>
// getData
// {{ resultVersus }}
//<div class="heroes recommended_choice" @click="singinStore('vlodya')" >
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import HeroAvatar from "@/components/HeroAvatar.vue";
import EnemyPick from "@/components/EnemyPick.vue";
import RecomendationPick from "@/components/RecomendationPick.vue";
import { useUserStore } from "@/store/userStore";
import { useRecomendationStore } from "@/store/recomendationStore";
import { mapActions, mapState } from "pinia";
import { ref, watch } from "vue";

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
const VERSUS_QUERY = gql`
  query getHeroesById($id: Short!) {
    heroStats {
      matchUp(heroId: $id, week: 1676246452, take: 124) {
        vs {
          heroId1
          heroId2
          week
          matchCount
          winCount
          winRateHeroId1
          winRateHeroId2
          synergy
          winsAverage
        }
      }
    }
  }
`;

export default {
  name: "HeroList",
  components: {
    HeroAvatar,
    EnemyPick,
    RecomendationPick,
  },
  setup() {
    const { result: result, loading, error } = useQuery(CHARACTERS_QUERY);
    const {
      result: resultVersus,
      loading: resultVersusLoading,
      variables: variablesVersus,
    } = useQuery(VERSUS_QUERY, {});
    function changeIdVersus(id) {
      console.log("id= " + id);
      variablesVersus.value = {
        id,
      };
    }
    return {
      result,
      loading,
      error,
      resultVersus,
      changeIdVersus,
    };
  },
  data() {
    return {
      oEnemy1: {
        activity: "off",
      },
      oEnemy2: {
        activity: "off",
      },
      oEnemy3: {
        activity: "off",
      },
      oEnemy4: {
        activity: "off",
      },
      oEnemy5: {
        activity: "off",
      },
      enemy1heroId: 0,
      enemy2heroId: 0,
      enemy3heroId: 0,
      enemy4heroId: 0,
      enemy5heroId: 0,
      currentEnemy: 0,
    };
  },
  computed: {
    ...mapState(useUserStore, { doubleH: "my", loginStore: "userlogin" }),
    ...mapState(useRecomendationStore, {
      getVersusHero1: "getVersusHero1",
      getVersusHero2: "getVersusHero2",
      getVersusHero3: "getVersusHero3",
      getVersusHero4: "getVersusHero4",
      getVersusHero5: "getVersusHero5",
      getTestStore: "getTestStore",
    }),
    MainResultVersus() {
      console.log("oMainResultVersus");
      let oMainResultVersus = {
        heroesVersus: [
          {
            heroId2: 0,
            matchCount: 0,
            winCount: 0,
            winRateHeroId1: 0,
            winRateHeroId2: 0,
            synergy: 0,
            winsAverage: 0,
          },
        ],
      };
      let constantes = [];
      let constantes2 = [];
      for (let i = 0; i < this.result.constants.heroes.length; i++) {
        constantes.push(this.result.constants.heroes[i].id);
        console.log(
          "this.result.constants.heroes.id " +
            JSON.stringify(this.result.constants.heroes[i].id)
        );
      }
      console.log(constantes);
      if (this.getVersusHero1 == 1) {
        console.log("oMainResultVersus = 1 " + this.getVersusHero1);
      } else {
        console.log(
          "VUE this.getVersusHero1.heroStats.matchUp[0].vs[0] " +
            JSON.stringify(this.getVersusHero1.heroStats.matchUp[0].vs[0])
        );
        for (
          let p = 0;
          p < this.getVersusHero1.heroStats.matchUp[0].vs.length;
          p++
        ) {
          constantes2.push(
            this.getVersusHero1.heroStats.matchUp[0].vs[p].heroId2
          );
          console.log(
            "oMainResultVersus id " +
              this.getVersusHero1.heroStats.matchUp[0].vs[p].heroId2
          );
        }
        console.log(constantes2);
      }

      // for (let i = 0; i < this.result.constants.heroes.length; i++) {
      //   oMainResultVersus.heroes.push({
      //     id: this.result.constants.heroes[i].id,
      //   });
      // }
      // return oMainResultVersus;
    },

    mainResult() {
      let oMainResult = {
        heroes: [
          {
            id: 0,
            primaryAttribute: "",
            imgId: 0,
            activity: "",
          },
        ],
      };
      for (let i = 0; i < this.result.constants.heroes.length; i++) {
        console.log("mainResult");
        oMainResult.heroes.push({
          id: this.result.constants.heroes[i].id,
          primaryAttribute:
            this.result.constants.heroes[i].stats.primaryAttribute,
          imgId: this.result.constants.heroes[i].id,
          activity: "active",
        });
      }
      return oMainResult;
    },
  },
  // async created() {
  //   await this.getAsyncResultVersus();
  // },

  methods: {
    ...mapActions(useUserStore, { singinStore: "singin" }),
    ...mapActions(useRecomendationStore, {
      getDefaultHeroesStore: "getDefaultHeroes",
      getDefaultQueryStore: "getDefaultQuery",
      getVersus1Store: "getVersus1",
      getVersus2Store: "getVersus2",
      getVersus3Store: "getVersus3",
      getVersus4Store: "getVersus4",
      getVersus5Store: "getVersus5",
      setTestState: "setTestState",
    }),
    clearAllEnemy() {
      console.log("clearAllEnemy");
      for (let u = 0; u < this.mainResult.heroes.length; u++) {
        if (this.mainResult.heroes[u].activity == "inactive") {
          console.log(
            "this.mainResult.heroes[u].id " + this.mainResult.heroes[u].id
          );
          this.mainResult.heroes[u].activity = "active";
        }
      }
      this.enemy1heroId = 0;
      this.enemy2heroId = 0;
      this.enemy3heroId = 0;
      this.enemy4heroId = 0;
      this.enemy5heroId = 0;
      // this.oEnemy1.activity = "off";
      // this.oEnemy2.activity = "off";
      // this.oEnemy3.activity = "off";
      // this.oEnemy4.activity = "off";
      // this.oEnemy5.activity = "off";
      // this.currentEnemy = 0;
    },
    getHeroId(avatarObj) {
      if (this.currentEnemy > 0) {
        if (avatarObj.activity == "active") {
          if (this.currentEnemy == 1 && this.enemy1heroId == 0) {
            this.enemy1heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getVersus1Store(avatarObj.id);
          }
          if (this.currentEnemy == 2 && this.enemy2heroId == 0) {
            this.enemy2heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getVersus2Store(avatarObj.id);
          }
          if (this.currentEnemy == 3 && this.enemy3heroId == 0) {
            this.enemy3heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getVersus3Store(avatarObj.id);
          }
          if (this.currentEnemy == 4 && this.enemy4heroId == 0) {
            this.enemy4heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getVersus4Store(avatarObj.id);
          }
          if (this.currentEnemy == 5 && this.enemy5heroId == 0) {
            this.enemy5heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getVersus5Store(avatarObj.id);
          }
          this.changeIdVersus(avatarObj.id);
          //this.ResultVersusChange(this.resultVersus);
          //console.log("resultVersus " + this.loadResultVersus());
        }
      }
    },
    mainResultCicle(avatarObj) {
      for (let i = 0; i < this.mainResult.heroes.length; i++) {
        if (this.mainResult.heroes[i].id == avatarObj.id) {
          this.mainResult.heroes[i].activity = "inactive";
        }
      }
    },
    getEnemyParams(enemyId) {
      console.log("Enemy id " + enemyId);
      this.currentEnemy = enemyId;
      this.oEnemy1.activity = "off";
      this.oEnemy2.activity = "off";
      this.oEnemy3.activity = "off";
      this.oEnemy4.activity = "off";
      this.oEnemy5.activity = "off";

      if (this.currentEnemy == 1) this.oEnemy1.activity = "pick";
      if (this.currentEnemy == 2) this.oEnemy2.activity = "pick";
      if (this.currentEnemy == 3) this.oEnemy3.activity = "pick";
      if (this.currentEnemy == 4) this.oEnemy4.activity = "pick";
      if (this.currentEnemy == 5) this.oEnemy5.activity = "pick";
    },
    enemyClear(clearEnemyObject) {
      this.currentEnemy = clearEnemyObject.EnemyClearId;
      if (clearEnemyObject.EnemyClearPickId > 0) {
        for (let o = 0; o < this.mainResult.heroes.length; o++) {
          if (
            this.mainResult.heroes[o].id == clearEnemyObject.EnemyClearPickId
          ) {
            this.mainResult.heroes[o].activity = "active";
          }
        }
        if (this.currentEnemy == 1) this.enemy1heroId = 0;
        if (this.currentEnemy == 2) this.enemy2heroId = 0;
        if (this.currentEnemy == 3) this.enemy3heroId = 0;
        if (this.currentEnemy == 4) this.enemy4heroId = 0;
        if (this.currentEnemy == 5) this.enemy5heroId = 0;
      }
    },
  },
};
</script>

<style>
.enemyPick {
  grid-area: enemyPick;
}
.heroesPull {
  grid-area: heroesPull;
}
.clear img {
  width: 28px;
  height: 25px;
}
.str {
  display: grid;
  width: auto;
  right: 300px;
  margin-bottom: 15px;
  gap: 5px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.agi {
  display: grid;
  margin-bottom: 15px;
  gap: 5px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.int {
  display: grid;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  gap: 5px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: "enemyPick heroesPull";
}
</style>