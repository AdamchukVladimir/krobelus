<template>
  <div class="wrapper">
    <div class="heroes enemyPick">
      <EnemyPick
        @getEnemy="getEnemyParams"
        :enemyObject="enemy1heroId"
        :enemyId="1"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        :enemyObject="enemy2heroId"
        :enemyId="2"
      />
      currentenemy
      {{ currentEnemy }}
      <EnemyPick
        @getEnemy="getEnemyParams"
        :enemyObject="enemy3heroId"
        :enemyId="3"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        :enemyObject="enemy4heroId"
        :enemyId="4"
      />
      <EnemyPick
        @getEnemy="getEnemyParams"
        :enemyObject="enemy5heroId"
        :enemyId="5"
      />
    </div>
    <div class="heroes heroesPull">
      <div class="hero str">
        <template v-for="hero in result.constants.heroes" :key="hero.id">
          <div class="heroPick" v-if="hero.stats.primaryAttribute == 'str'">
            <HeroAvatar @eHeroPick="getHeroId" :heroId="hero.id" />
          </div>
        </template>
      </div>
      <div class="hero agi">
        <template v-for="hero in result.constants.heroes" :key="hero.id">
          <div class="heroPick" v-if="hero.stats.primaryAttribute == 'agi'">
            <HeroAvatar @eHeroPick="getHeroId" :heroId="hero.id" />
          </div>
        </template>
      </div>
      <div class="hero int">
        <template v-for="hero in result.constants.heroes" :key="hero.id">
          <div class="heroPick" v-if="hero.stats.primaryAttribute == 'int'">
            <HeroAvatar @eHeroPick="getHeroId" :heroId="hero.id" />
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
      enemy1heroId: 0,
      enemy2heroId: 0,
      enemy3heroId: 0,
      enemy4heroId: 0,
      enemy5heroId: 0,
      currentEnemy: 0,
    };
  },
  computed: {
    mainResult() {
      //var oMainResult1 = this.result;
      var oMainResult = {
        heroes: [
          {
            id: 0,
            primaryAttribute: "",
          },
        ],
      };
      //var oMainResult1 = Object.assign({}, this.result);

      for (var i = 0; i < this.result.constants.heroes.length; i++) {
        //oMainResult.heroes[i].id = this.result.constants.heroes[i].id;
        //oMainResult.heroes[i].primaryAttribute =
        //  this.result.constants.heroes[i].stats.primaryAttribute;
        oMainResult.heroes.push({
          id: this.result.constants.heroes[i].id,
          primaryAttribute:
            this.result.constants.heroes[i].stats.primaryAttribute,
        });
      }
      /*
      var oMainResult1 = {};
      for (let key in this.result) {
        oMainResult1[key] = this.result[key];
      }
      */
      /*
      var oMainResult = Object.defineProperties(oMainResult1, "constants", {
        enumerable: true,
        configurable: true,
        writable: true,
      });
      */
      //console.log("114");
      //console.log(JSON.stringify(oMainResult, null, 2));
      //console.log(JSON.stringify(oMainResult1, null, 2));
      return oMainResult;
    },
  },
  methods: {
    getHeroId(id) {
      console.log(id);
      //console.log(this.mainResult.a);
      //this.mainResult.a = 4;
      //console.log(this.mainResult.a);
      //console.log(this.result.constants.heroes);
      //console.log("mainResult " + this.mainResult);
      //console.log("this.result.writable " + this.result);

      for (var i = 0; i < this.mainResult.heroes.length; i++) {
        console.log("106 " + this.mainResult.heroes[i].id);
        if (this.mainResult.heroes[i].id == id) {
          this.mainResult.heroes[i].id = 4;
          console.log("108 " + this.mainResult.heroes[i].id);
        }
      }

      console.log("mainResult " + this.mainResult);
      if (this.currentEnemy == 1) this.enemy1heroId = id;
      if (this.currentEnemy == 2) this.enemy2heroId = id;
      if (this.currentEnemy == 3) this.enemy3heroId = id;
      if (this.currentEnemy == 4) this.enemy4heroId = id;
      if (this.currentEnemy == 5) this.enemy5heroId = id;
      //if (id) this.result.constants.heroes.id = 2;
      //if (id) console.log("test111");
    },
    getEnemyParams(enemyId) {
      console.log("Enemy id " + enemyId);
      this.currentEnemy = enemyId;
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