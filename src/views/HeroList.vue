<template>
  <Header />
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
        :enemyNumber="enemy1heroId"
        :enemyId="1"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy2"
        :enemyNumber="enemy2heroId"
        :enemyId="2"
      />

      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy3"
        :enemyNumber="enemy3heroId"
        :enemyId="3"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy4"
        :enemyNumber="enemy4heroId"
        :enemyId="4"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        @enemyClear="enemyClear"
        :oEnemy="oEnemy5"
        :enemyNumber="enemy5heroId"
        :enemyId="5"
      />
    </div>
    <div class="heroes allyPick">
      <div class="clear">
        <a v-on:click="clearAllAlly()"
          ><img
            src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/clear.png"
          />
        </a>
      </div>
      <AllyPick
        @getAlly="getAllyParams"
        @allyClear="allyClear"
        :oAlly="oAlly1"
        :allyNumber="ally1heroId"
        :allyId="1"
      />
      <AllyPick
        @getAlly="getAllyParams"
        @allyClear="allyClear"
        :oAlly="oAlly2"
        :allyNumber="ally2heroId"
        :allyId="2"
      />
      <AllyPick
        @getAlly="getAllyParams"
        @allyClear="allyClear"
        :oAlly="oAlly3"
        :allyNumber="ally3heroId"
        :allyId="3"
      />
      <AllyPick
        @getAlly="getAllyParams"
        @allyClear="allyClear"
        :oAlly="oAlly4"
        :allyNumber="ally4heroId"
        :allyId="4"
      />
      <AllyPick
        @getAlly="getAllyParams"
        @allyClear="allyClear"
        :oAlly="oAlly5"
        :allyNumber="ally5heroId"
        :allyId="5"
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
      <div class="hero all">
        <template
          v-for="hero in mainResult.heroes"
          :key="hero.id + hero.activity"
        >
          <div class="heroPick" v-if="hero.primaryAttribute == 'all'">
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
          class="counter"
          id="counter"
          value="counter"
          v-model="sorting"
        />
        <label for="counter">counter </label>
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
        <br />
        <input type="checkbox" id="expertmode" v-model="expertmodeModel" />
        <label for="expertmode">expert mode</label>
      </div>
    </div>
    <div class="heroes recomendationHeroes">
      <div class="hero recomendationHero">
        <template
          v-for="(heroVersus, heroVersusIndex) in MainResultVersus.heroesVersus"
          :key="heroVersus.heroId2"
        >
          <HeroAvatar
            v-if="
              (heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.counter < 0 &&
                sorting == 'counter') ||
              (heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.advantage < 0 &&
                sorting == 'advantage') ||
              (heroVersusIndex < 67 &&
                heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                sorting == 'winrate')
            "
            :heroObj="heroVersus"
          />
          <div
            v-if="
              expertmodeModel == true &&
              ((heroVersus.matchCount > 0 &&
                heroVersus.activity == true &&
                heroVersus.counter < 0 &&
                sorting == 'counter') ||
                (heroVersus.matchCount > 0 &&
                  heroVersus.activity == true &&
                  heroVersus.advantage < 0 &&
                  sorting == 'advantage') ||
                (heroVersusIndex < 67 &&
                  heroVersus.matchCount > 0 &&
                  heroVersus.activity == true &&
                  sorting == 'winrate'))
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
              v-bind:class="{ sorting_active: sorting == 'counter' }"
            >
              {{ ((-heroVersus.counter * 100) / 100).toFixed(3) }}
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
            <p class="recomendation-info">
              {{ heroVersus.matchCount }}
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
import AllyPick from "@/components/AllyPick.vue";
import RecomendationPick from "@/components/RecomendationPick.vue";
import { useUsersStore } from "@/store/usersStore";
import { useRecomendationStore } from "@/store/recomendationStore";
import { mapActions, mapState } from "pinia";
import { ref, watch } from "vue";
import Header from "@/components/Header.vue";
// import { getBestHeroes, getSimpleSummary } from "@/services/PlayerSummary.js";

const CHARACTERS_QUERY = gql`
  {
    constants {
      heroes {
        id
        name
        aliases
        roles {
          roleId
          level
        }
        displayName
        shortName
        stats {
          primaryAttribute
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
    AllyPick,
    RecomendationPick,
    Header,
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

      oAlly1: {
        activity: "off",
      },
      oAlly2: {
        activity: "off",
      },
      oAlly3: {
        activity: "off",
      },
      oAlly4: {
        activity: "off",
      },
      oAlly5: {
        activity: "off",
      },
      ally1heroId: 0,
      ally2heroId: 0,
      ally3heroId: 0,
      ally4heroId: 0,
      ally5heroId: 0,
      currentAlly: 0,

      sorting: "advantage",
      expertmodeModel: true,
    };
  },
  computed: {
    ...mapState(useUsersStore, { userloginStore: "userlogin" }),
    ...mapState(useRecomendationStore, {
      getAllyHero1: "getAllyHero1",
      getAllyHero2: "getAllyHero2",
      getAllyHero3: "getAllyHero3",
      getAllyHero4: "getAllyHero4",
      getAllyHero5: "getAllyHero5",

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
      let aAllyheroes = [
        this.getAllyHero1,
        this.getAllyHero2,
        this.getAllyHero3,
        this.getAllyHero4,
        this.getAllyHero5,
      ];
      console.log("aAllyheroes HeroList - " + JSON.stringify(aAllyheroes));
      let sEnemyFillCount = 0;
      for (let k = 0; k < aVersusheroes.length; k++) {
        if (aVersusheroes[k] != false) {
          sEnemyFillCount++; //Колличество выбранных героев врага
        }
      }
      console.log("sEnemyFillCount - " + sEnemyFillCount);
      let sAllyFillCount = 0;
      for (let k = 0; k < aAllyheroes.length; k++) {
        if (aAllyheroes[k] != false) {
          sAllyFillCount++; //Колличество выбранных союзных героев
        }
      }
      console.log("sAllyFillCount - " + sAllyFillCount);

      let oMainResultVersus = {
        heroesVersus: [
          {
            heroId2: 0,
            matchCount: 0,
            winCount: 0,
            winRateHeroId1: 0,
            winRateHeroId2: 0,
            counter: 0,
            synergy: 0,
            synergyWinrate: 0,
            advantage: 0,
            winsAverage: 0,
            activity: true,
            imgId: 0,
          },
        ],
      };
      if (this.result) {
        //Если константы(список героев в центре) подгрузились
        for (let i = 0; i < this.result.constants.heroes.length; i++) {
          oMainResultVersus.heroesVersus.push({
            //oMainResultVersus массим объектов константных героев
            heroId2: this.result.constants.heroes[i].id,
            matchCount: 0,
            winCount: 0,
            winRateHeroId1: 0,
            winRateHeroId2: 0,
            counter: 0,
            synergy: 0,
            synergyWinrate: 0,
            advantage: 0,
            winsAverage: 0,
            activity: true,
            imgId: this.result.constants.heroes[i].id,
          });

          //console.log("oMainResultVersus " + JSON.stringify(oMainResultVersus));
        }
      }

      //Общая функция для versus Heroes если не false заполняет объект oMainResultVersus
      for (let k = 0; k < aVersusheroes.length; k++) {
        //Цикл для всех выбранных персонажей
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
                oMainResultVersus.heroesVersus[j].winsAverage =
                  oMainResultVersus.heroesVersus[j].winsAverage + 1; //Костыль чтобы у уже отключенных героев снизить винрейт, чтобы их индексы не попадали в выдачу
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

      //Общая функция для ally Heroes если не false заполняет объект oMainResultVersus
      for (let z = 0; z < aAllyheroes.length; z++) {
        console.log("467 ");
        //Цикл для всех выбранных персонажей
        if (aAllyheroes[z] == false) {
          console.log("oMainResultAlly  " + (z + 1) + aAllyheroes[z]);
        } else {
          for (
            let x = 0;
            x < aAllyheroes[z].heroStats.matchUp[0].with.length;
            x++
          ) {
            for (let c = 0; c < oMainResultVersus.heroesVersus.length; c++) {
              if (
                oMainResultVersus.heroesVersus[c].heroId2 ==
                aAllyheroes[z].heroStats.matchUp[0].with[x].heroId1
              ) {
                oMainResultVersus.heroesVersus[c].activity = false; //Отключаем героя чтобы выбранные не могли попасть в рекомендованные
                oMainResultVersus.heroesVersus[c].winsAverage =
                  oMainResultVersus.heroesVersus[c].winsAverage + 1; //Костыль чтобы у уже отключенных героев снизить винрейт, чтобы их индексы не попадали в выдачу
                console.log(
                  "485 id- " + oMainResultVersus.heroesVersus[c].heroId2
                );
                console.log(
                  "489 aAlly- " +
                    aAllyheroes[z].heroStats.matchUp[0].with[x].heroId1
                );
              }
              if (
                aAllyheroes[z].heroStats.matchUp[0].with[x].heroId2 ==
                oMainResultVersus.heroesVersus[c].heroId2
              ) {
                //setVersusHeroProperties(aVersusheroes[z], c, x);
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
          oMainResultVersus.heroesVersus[j].counter +
          (0.5 - oMainResultVersus.heroesVersus[j].winRateHeroId2) * 100;
      }
      if (this.sorting == "advantage") {
        oMainResultVersus.heroesVersus.sort((a, b) =>
          a.advantage > b.advantage ? 1 : -1
        );
      } else if (this.sorting == "counter") {
        oMainResultVersus.heroesVersus.sort((a, b) =>
          a.counter > b.counter ? 1 : -1
        ); //sort
      } else if (this.sorting == "winrate") {
        oMainResultVersus.heroesVersus.sort((a, b) =>
          a.winsAverage > b.winsAverage ? 1 : -1
        ); //sort
      }

      //console.log("oMainResultVersus " + JSON.stringify(oMainResultVersus));
      //Функция вызывается если текущий VersusHero не false
      function setVersusHeroProperties(oVersusHeroProperties, j, p) {
        oMainResultVersus.heroesVersus[j].counter =
          oMainResultVersus.heroesVersus[j].counter +
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
            nameFull: "",
            displayName: "",
            shortName: "",
            aliases: "",
            roleId: "",
            roleLevel: "",
          },
        ],
      };
      if (this.result) {
        for (let i = 0; i < this.result.constants.heroes.length; i++) {
          console.log("mainResult ");
          oMainResult.heroes.push({
            id: this.result.constants.heroes[i].id,
            primaryAttribute:
              this.result.constants.heroes[i].stats.primaryAttribute,
            nameFull: this.result.constants.heroes[i].name,
            displayName: this.result.constants.heroes[i].displayName,
            shortName: this.result.constants.heroes[i].shortName,
            aliases: this.result.constants.heroes[i].aliases,
            roleId: this.result.constants.heroes[i].roles.roleId,
            roleLevel: this.result.constants.heroes[i].roles.level,
            imgId: this.result.constants.heroes[i].id,
            activity: "active",
          });
        }
      }

      oMainResult.heroes.sort((a, b) =>
        a.displayName > b.displayName ? 1 : -1
      );
      return oMainResult;
    },
  },
  // async created() {
  //   await this.getAsyncResultVersus();
  // },

  methods: {
    ...mapActions(useUsersStore, { singinStore: "singin" }),
    ...mapActions(useRecomendationStore, {
      getVersus1Store: "getVersus1",
      getVersus2Store: "getVersus2",
      getVersus3Store: "getVersus3",
      getVersus4Store: "getVersus4",
      getVersus5Store: "getVersus5",
      clearAllVersusStateStore: "clearAllVersusState",
      clearOneVersusStateStore: "clearOneVersusState",
      getAlly1Store: "getAlly1",
      getAlly2Store: "getAlly2",
      getAlly3Store: "getAlly3",
      getAlly4Store: "getAlly4",
      getAlly5Store: "getAlly5",
      clearAllAllyStateStore: "clearAllAllyState",
      clearOneAllyStateStore: "clearOneAllyState",
    }),
    clearAllAlly() {
      console.log("clearAllAlly");
      for (let u = 0; u < this.mainResult.heroes.length; u++) {
        if (this.mainResult.heroes[u].activity == "inactive") {
          console.log(
            "this.mainResult.heroes[u].id " + this.mainResult.heroes[u].id
          );
          this.mainResult.heroes[u].activity = "active";
        }
      }
      this.ally1heroId = 0;
      this.ally2heroId = 0;
      this.ally3heroId = 0;
      this.ally4heroId = 0;
      this.ally5heroId = 0;
      this.clearAllAllyStateStore(); // Обнуляет Store в Pinia
    },
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
      if (this.currentEnemy > 0 || this.currentAlly > 0) {
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
          console.log("currentEnemy " + this.currentEnemy);
          console.log("enemy1heroId " + this.enemy1heroId);
          console.log("currentAlly " + this.currentAlly);
          console.log("ally1heroId " + this.ally1heroId);
          if (this.currentAlly == 1 && this.ally1heroId == 0) {
            this.ally1heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getAlly1Store(avatarObj.id);
          }
          if (this.currentAlly == 2 && this.ally2heroId == 0) {
            this.ally2heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getAlly2Store(avatarObj.id);
          }
          if (this.currentAlly == 3 && this.ally3heroId == 0) {
            this.ally3heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getAlly3Store(avatarObj.id);
          }
          if (this.currentAlly == 4 && this.ally4heroId == 0) {
            this.ally4heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getAlly4Store(avatarObj.id);
          }
          if (this.currentAlly == 5 && this.ally5heroId == 0) {
            this.ally5heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
            this.getAlly5Store(avatarObj.id);
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
    getAllyParams(allyId) {
      console.log("Ally id " + allyId);
      this.currentAlly = allyId;
      this.currentEnemy = 0;
      this.oAlly1.activity = "off";
      this.oAlly2.activity = "off";
      this.oAlly3.activity = "off";
      this.oAlly4.activity = "off";
      this.oAlly5.activity = "off";

      this.oEnemy1.activity = "off";
      this.oEnemy2.activity = "off";
      this.oEnemy3.activity = "off";
      this.oEnemy4.activity = "off";
      this.oEnemy5.activity = "off";

      if (this.currentAlly == 1) this.oAlly1.activity = "pick";
      if (this.currentAlly == 2) this.oAlly2.activity = "pick";
      if (this.currentAlly == 3) this.oAlly3.activity = "pick";
      if (this.currentAlly == 4) this.oAlly4.activity = "pick";
      if (this.currentAlly == 5) this.oAlly5.activity = "pick";
    },
    allyClear(clearAllyObject) {
      this.currentAlly = clearAllyObject.AllyClearId;
      if (clearAllyObject.AllyClearPickId > 0) {
        for (let o = 0; o < this.mainResult.heroes.length; o++) {
          if (this.mainResult.heroes[o].id == clearAllyObject.AllyClearPickId) {
            this.mainResult.heroes[o].activity = "active";
          }
        }
        if (this.currentAlly == 1) this.ally1heroId = 0;
        if (this.currentAlly == 2) this.ally2heroId = 0;
        if (this.currentAlly == 3) this.ally3heroId = 0;
        if (this.currentAlly == 4) this.ally4heroId = 0;
        if (this.currentAlly == 5) this.ally5heroId = 0;
        this.getAllyParams(this.currentAlly);
        console.log("allyClear " + this.currentAlly);

        this.clearOneAllyStateStore(this.currentAlly); // Обнуляет Store указанного героя в Pinia
      }
    },
    getEnemyParams(enemyId) {
      console.log("Enemy id " + enemyId);
      this.currentEnemy = enemyId;
      this.currentAlly = 0;
      this.oEnemy1.activity = "off";
      this.oEnemy2.activity = "off";
      this.oEnemy3.activity = "off";
      this.oEnemy4.activity = "off";
      this.oEnemy5.activity = "off";

      this.oAlly1.activity = "off";
      this.oAlly2.activity = "off";
      this.oAlly3.activity = "off";
      this.oAlly4.activity = "off";
      this.oAlly5.activity = "off";

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
  mounted() {
    console.log("req from back " + this.$req);
    console.log("req user stor " + this.userloginStore);
    //getBestHeroes();
  },
};
</script>

<style>
.enemyPick {
  grid-area: enemyPick;
}
.allyPick {
  grid-area: allyPick;
}
.heroesPull {
  grid-area: heroesPull;
  display: grid;
  width: auto;
  margin-bottom: 10px;

  grid-template-columns: 640px 640px;
}

.recomendationHeroes {
  grid-area: recomendationHeroes;
}
.recomendationHeroes img {
  filter: brightness(115%);
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
  margin-bottom: 25px;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.agi {
  display: grid;
  margin-bottom: 25px;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.int {
  display: grid;
  width: auto;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.all {
  display: grid;
  gap: 7px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
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
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
    "enemyPick heroesPull allyPick"
    "settings recomendationHeroes xxx";
}
body {
  font: small-caps 20px/1 sans-serif;
  font: 1.1em "Fira Sans", sans-serif;
}
</style>