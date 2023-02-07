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
    </div>
    <div class="heroes recommended_choice">
      test
      {{ recommendationStore.heroes }}
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import HeroAvatar from "@/components/HeroAvatar.vue";
import EnemyPick from "@/components/EnemyPick.vue";
import pinia from "@/stores/store.js";
import { useRecommendationStore } from "@/stores/RecommendationStore";

const recommendationStore = useRecommendationStore(pinia);
console.log("recommendationStore " + recommendationStore.heroes);
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

export default {
  name: "HeroList",
  components: {
    HeroAvatar,
    EnemyPick,
  },
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);
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

      recommendationStore: recommendationStore,
    };
  },
  computed: {
    mainResult() {
      var oMainResult = {
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
  methods: {
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
          }
          if (this.currentEnemy == 2 && this.enemy2heroId == 0) {
            this.enemy2heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
          }
          if (this.currentEnemy == 3 && this.enemy3heroId == 0) {
            this.enemy3heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
          }
          if (this.currentEnemy == 4 && this.enemy4heroId == 0) {
            this.enemy4heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
          }
          if (this.currentEnemy == 5 && this.enemy5heroId == 0) {
            this.enemy5heroId = avatarObj.id;
            this.mainResultCicle(avatarObj);
          }
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