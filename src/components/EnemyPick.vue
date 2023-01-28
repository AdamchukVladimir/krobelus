<template>
  <form>
    <div class="heroes enemyPick">
      <div class="enemyHero enemyHero1">
        <a v-on:click="enemyChange()"
          ><img class="hero-image enemyPick-image" :src="enemyHeroImage" />
        </a>
        enemyId {{ enemyId }} <br />
        enemyObject {{ enemyObject }}<br />
        flag
        {{ EnemyFlag }}
        counter
        {{ counter }}
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
  },
  computed: {
    enemyHeroImage() {
      // if (this.EnemyFlag) {
      //   this.enemyObject = 2;
      // }
      return `https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/${this.enemyObject}.png`;
    },
  },
  methods: {
    enemyChange() {
      this.EnemyFlag = !this.EnemyFlag;
      //if (this.EnemyFlag) {
      this.$emit("getEnemy", this.enemyId);
      //}
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
.enemyHero img {
  width: 70px;
  height: 87px;
  border: 1px solid black;
}
</style>