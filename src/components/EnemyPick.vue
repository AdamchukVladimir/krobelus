<template>
  <form>
    <div class="heroes enemyPick">
      <div class="enemyHero enemyHero1">
        <a v-on:click="counter += 1"
          ><img class="hero-image enemyPick-image" :src="heroImage1" />
        </a>
        test1 {{ counter }}
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: "EnemyPick",
  props: {
    enemyId: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      heroImage1:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.enemyId +
        ".png",
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