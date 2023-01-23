<template>
  <div class="wrapper">
    <div class="heroes enemyPick">
      <EnemyPick :enemyId="count" v-on:click="count += 1" />
      {{ count }}
      <EnemyPick :enemyId="2" />
      <EnemyPick :enemyId="0" />
      <EnemyPick :enemyId="0" />
      <EnemyPick :enemyId="0" />
    </div>
    <div class="heroes heroesPull">
      <div class="hero str">
        <template v-for="hero in result.constants.heroes" :key="hero.id">
          <div class="heroPick" v-if="hero.stats.primaryAttribute == 'str'">
            <HeroAvatar :heroId="hero.id" />
          </div>
        </template>
      </div>
      <div class="hero agi">
        <template v-for="hero in result.constants.heroes" :key="hero.id">
          <div class="heroPick" v-if="hero.stats.primaryAttribute == 'agi'">
            <HeroAvatar :heroId="hero.id" />
          </div>
        </template>
      </div>
      <div class="hero int">
        <template v-for="hero in result.constants.heroes" :key="hero.id">
          <div class="heroPick" v-if="hero.stats.primaryAttribute == 'int'">
            <HeroAvatar :heroId="hero.id" />
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
      heroImage:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/135.png",
      count: 0,
    };
  },
  created() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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