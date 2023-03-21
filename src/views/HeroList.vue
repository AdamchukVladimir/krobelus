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
    </div>
    <div class="settings">
      <div class="sorting">
        <span>Sorted by: </span>
        <br />
        <input
          type="radio"
          class="advantage"
          id="advantage"
          value="advantage"
          v-model="sorting"
        />
        <label for="advantage">advantage</label>
        <br />
        <input
          type="radio"
          class="synergy"
          id="synergy"
          value="synergy"
          v-model="sorting"
        />
        <label for="synergy">synergy </label>
        <br />
        <input
          type="radio"
          class="winrate"
          id="winrate"
          value="winrate"
          v-model="sorting"
        />
        <label for="winrate">winrate </label>
        <br />
      </div>
    </div>
    <div class="heroes recomendationHeroes">
      <div class="hero recomendationHero">
        <template
          v-for="heroVersus in MainResultVersus.heroesVersus"
          :key="heroVersus.heroId2"
        >
          <HeroAvatar
            v-if="
              (heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.synergy < 0 &&
                (sorting == 'synergy' || sorting == 'winrate')) ||
              (heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.advantage < 0 &&
                (sorting == 'advantage' || sorting == 'winrate'))
            "
            :heroObj="heroVersus"
          />
          <div
            v-if="
              (heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.synergy < 0 &&
                (sorting == 'synergy' || sorting == 'winrate')) ||
              (heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.advantage < 0 &&
                (sorting == 'advantage' || sorting == 'winrate'))
            "
          >
            <p
              class="recomendation-info"
              v-bind:class="{ sorting_active: sorting == 'advantage' }"
            >
              {{ ((-heroVersus.advantage * 100) / 100).toFixed(3) }}
            </p>
            <p
              class="recomendation-info"
              v-bind:class="{ sorting_active: sorting == 'synergy' }"
            >
              {{ ((-heroVersus.synergy * 100) / 100).toFixed(3) }}
            </p>
            <p
              class="recomendation-info"
              v-bind:class="{ sorting_active: sorting == 'winrate' }"
            >
              {{ (1 - heroVersus.winsAverage).toFixed(3) }}
            </p>
            <p class="recomendation-info">
              {{ (heroVersus.winRateHeroId2 * 100).toFixed(1) }}%
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import HeroAvatar from "@/components/HeroAvatar.vue";
import EnemyPick from "@/components/EnemyPick.vue";
import RecomendationPick from "@/components/RecomendationPick.vue";
import { useUserStore } from "@/store/userStore";
import { useRecomendationStore } from "@/store/recomendationStore";
import { mapActions, mapState } from "pinia";
import { ref, watch } from "vue";

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
  query getHeroesById($id: Short!, $week: Short!) {
    heroStats {
      matchUp(heroId: $id, week: $week, take: 124) {
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
    return {
      result,
      loading,
      error,
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
      sorting: "advantage",
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
      let aVersusheroes = [
        this.getVersusHero1,
        this.getVersusHero2,
        this.getVersusHero3,
        this.getVersusHero4,
        this.getVersusHero5,
      ];
      let sEnemyFillCount = 0;
      for (let k = 0; k < aVersusheroes.length; k++) {
        if (aVersusheroes[k] != false) {
          sEnemyFillCount++;
        }
      }
      console.log("sEnemyFillCount - " + sEnemyFillCount);

      let oMainResultVersus = {
        heroesVersus: [
          {
            heroId2: 0,
            matchCount: 0,
            winCount: 0,
            winRateHeroId1: 0,
            winRateHeroId2: 0,
            synergy: 0,
            advantage: 0,
            winsAverage: 0,
            activity: true,
            imgId: 0,
          },
        ],
      };

      for (let i = 0; i < this.result.constants.heroes.length; i++) {
        oMainResultVersus.heroesVersus.push({
          heroId2: this.result.constants.heroes[i].id,
          matchCount: 0,
          winCount: 0,
          winRateHeroId1: 0,
          winRateHeroId2: 0,
          synergy: 0,
          advantage: 0,
          winsAverage: 0,
          activity: true,
          imgId: this.result.constants.heroes[i].id,
        });

        //console.log("oMainResultVersus " + JSON.stringify(oMainResultVersus));
      }
      //Общая функция для versus Heroes если не false заполняет объект oMainResultVersus
      for (let k = 0; k < aVersusheroes.length; k++) {
        if (aVersusheroes[k] == false) {
          console.log("oMainResultVersus  " + (k + 1) + aVersusheroes[k]);
        } else {
          for (
            let p = 0;
            p < aVersusheroes[k].heroStats.matchUp[0].vs.length;
            p++
          ) {
            for (let j = 0; j < oMainResultVersus.heroesVersus.length; j++) {
              if (
                oMainResultVersus.heroesVersus[j].heroId2 ==
                aVersusheroes[k].heroStats.matchUp[0].vs[p].heroId1
              ) {
                oMainResultVersus.heroesVersus[j].activity = false; //Отключаем героя чтобы выбранные не могли попасть в рекомендованные
              }
              if (
                aVersusheroes[k].heroStats.matchUp[0].vs[p].heroId2 ==
                oMainResultVersus.heroesVersus[j].heroId2
              ) {
                setVersusHeroProperties(aVersusheroes[k], j, p);
              }
            }
          }
        }
      }

      //Функционал делит winRateHeroId1, winRateHeroId2, winsAverage на колличество
      // выбранных героев для корректного расчета
      for (let j = 0; j < oMainResultVersus.heroesVersus.length; j++) {
        oMainResultVersus.heroesVersus[j].winRateHeroId1 =
          oMainResultVersus.heroesVersus[j].winRateHeroId1 / sEnemyFillCount;

        oMainResultVersus.heroesVersus[j].winRateHeroId2 =
          oMainResultVersus.heroesVersus[j].winRateHeroId2 / sEnemyFillCount;

        oMainResultVersus.heroesVersus[j].winsAverage =
          oMainResultVersus.heroesVersus[j].winsAverage / sEnemyFillCount;

        //Сумма synergy и разницы между ср.Винрейтом и 50%
        oMainResultVersus.heroesVersus[j].advantage =
          oMainResultVersus.heroesVersus[j].advantage +
          oMainResultVersus.heroesVersus[j].synergy +
          (0.5 - oMainResultVersus.heroesVersus[j].winRateHeroId2) * 100;
      }
      if (this.sorting == "advantage") {
        oMainResultVersus.heroesVersus.sort((a, b) =>
          a.advantage > b.advantage ? 1 : -1
        );
      } else if (this.sorting == "synergy") {
        oMainResultVersus.heroesVersus.sort((a, b) =>
          a.synergy > b.synergy ? 1 : -1
        ); //sort
      } else if (this.sorting == "winrate") {
        oMainResultVersus.heroesVersus.sort((a, b) =>
          a.winsAverage > b.winsAverage ? 1 : -1
        ); //sort
      }

      //console.log("oMainResultVersus " + JSON.stringify(oMainResultVersus));
      //Функция вызывается если текущий VersusHero не false
      function setVersusHeroProperties(oVersusHeroProperties, j, p) {
        oMainResultVersus.heroesVersus[j].synergy =
          oMainResultVersus.heroesVersus[j].synergy +
          oVersusHeroProperties.heroStats.matchUp[0].vs[p].synergy;

        oMainResultVersus.heroesVersus[j].matchCount =
          oMainResultVersus.heroesVersus[j].matchCount +
          oVersusHeroProperties.heroStats.matchUp[0].vs[p].matchCount;

        oMainResultVersus.heroesVersus[j].winCount =
          oMainResultVersus.heroesVersus[j].winCount +
          oVersusHeroProperties.heroStats.matchUp[0].vs[p].winCount;

        oMainResultVersus.heroesVersus[j].winRateHeroId1 =
          oMainResultVersus.heroesVersus[j].winRateHeroId1 +
          oVersusHeroProperties.heroStats.matchUp[0].vs[p].winRateHeroId1;

        oMainResultVersus.heroesVersus[j].winRateHeroId2 =
          oMainResultVersus.heroesVersus[j].winRateHeroId2 +
          oVersusHeroProperties.heroStats.matchUp[0].vs[p].winRateHeroId2;

        oMainResultVersus.heroesVersus[j].winsAverage =
          oMainResultVersus.heroesVersus[j].winsAverage +
          oVersusHeroProperties.heroStats.matchUp[0].vs[p].winsAverage;
      }
      return oMainResultVersus;
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
      clearAllVersusStateStore: "clearAllVersusState",
      clearOneVersusStateStore: "clearOneVersusState",
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
      this.clearAllVersusStateStore(); // Обнуляет Store в Pinia
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
          //this.changeIdVersus(avatarObj.id);
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

    //Добавляет текущему пользователю белую рамку
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
        this.getEnemyParams(this.currentEnemy);
        console.log("enemyClear " + this.currentEnemy);

        this.clearOneVersusStateStore(this.currentEnemy); // Обнуляет Store указанного героя в Pinia
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
.recomendationHeroes {
  grid-area: recomendationHeroes;
}
.settings {
  grid-area: settings;
}
.sorting {
  margin-left: auto;
  margin-right: auto;
  width: 130px;
  text-align: left;
}
.sorting span {
  margin-left: 5px;
  position: relative;
  top: -5px;
}
.sorting_active {
  color: green;
}
.advantage {
  color: green;
}
.recomendation-info {
  margin: 0;
}
.clear img {
  width: 28px;
  height: 25px;
}
.recomendationHero {
  font: 0.9em "Fira Sans", sans-serif;
  display: grid;
  width: auto;
  right: 300px;
  margin-bottom: 15px;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.str {
  display: grid;
  width: auto;
  right: 300px;
  margin-bottom: 25px;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.agi {
  display: grid;
  margin-bottom: 25px;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.int {
  display: grid;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.color-circle {
  width: 50px;
  height: 50px;
  margin-top: 8px;
  border: 2px solid #d8d8d8;
  border-radius: 50%;
}
.recomendation-info::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
.wrapper {
  display: grid;
  grid-gap: 50px 10px;
  grid-template-columns: 1fr 4fr;
  grid-template-areas:
    "enemyPick heroesPull"
    "settings recomendationHeroes";
}
body {
  font: small-caps 20px/1 sans-serif;
  font: 1.1em "Fira Sans", sans-serif;
}
</style>