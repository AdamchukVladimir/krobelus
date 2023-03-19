<template>
  <form>
    <div class="heroes enemyPick">
      <div :class="classHeroPick">
        <a v-on:click="enemyChange()"
          ><img class="hero-image enemyPick-image" :src="enemyHeroImage" />
        </a>
      </div>
      <div class="enemy-clear" v-on:click="enemyClear()">
        <a
          ><img
            class="enemy-clear-img"
            src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/cross.png"
        /></a>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: "EnemyPick",
  props: {
    enemyId: {
      type: Number,
      required: true,
    },
    enemyObject: {
      type: Object,
      required: true,
    },
    oEnemy: {
      type: Object,
      required: true,
    },
  },
  computed: {
    enemyHeroImage() {
      return `https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/${this.enemyObject}.png`;
    },
    classHeroPick() {
      return `enemyHero ${this.oEnemy.activity}`;
    },
  },
  methods: {
    enemyChange() {
      this.EnemyFlag = !this.EnemyFlag;
      //if (this.EnemyFlag) {
      this.$emit("getEnemy", this.enemyId);
      //}
    },
    enemyClear() {
      console.log("enemyClear");
      var clearEnemyObject = {
        EnemyClearId: this.enemyId,
        EnemyClearPickId: this.enemyObject,
      };
      this.$emit("enemyClear", clearEnemyObject);
    },
  },
  data() {
    return {
      EnemyFlag: false,
      counter: 0,
    };
  },
};
</script>
<style>
/*
.enemy-clear {
  position: absolute;
  top: -90px;
  right: -170px;
  width: 28px;
  height: 25px;
}
*/
.enemy-clear img {
  position: absolute;
  margin-top: -85px;
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
.enemyHero img {
  width: 70px;
  height: 87px;
  border: 1px solid black;
}
.pick img {
  border: 1px solid rgb(223, 217, 217);
}
</style>