<template>
  <form>
    <div class="heroes enemyPick">
      <div class="enemyHero enemyHero1">
        <a v-on:click="counter += 1"
          ><img class="hero-image enemyPick-image" :src="heroImage1" />
        </a>
        test1 {{ counter }}
      </div>
      <div class="enemyHero enemyHero2">
        <a href="#"
          ><img class="hero-image enemyPick-image" :src="heroImage2" />
        </a>
        test2
      </div>
      <div class="enemyHero enemyHero3">
        <a href="#"
          ><img class="hero-image enemyPick-image" :src="heroImage3" />
        </a>
        test3
      </div>
      <div class="enemyHero enemyHero4">
        <a href="#"
          ><img class="hero-image enemyPick-image" :src="heroImage4" />
        </a>
        test4
      </div>
      <div class="enemyHero enemyHero5">
        <a href="#"
          ><img class="hero-image enemyPick-image" :src="heroImage5" />
        </a>
        test5
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: "EnemyPick",
  props: {
    enemyIds: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      heroImage1:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.enemyIds[0] +
        ".png",
      heroImage2:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.enemyIds[1] +
        ".png",
      heroImage3:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.enemyIds[2] +
        ".png",
      heroImage4:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.enemyIds[3] +
        ".png",
      heroImage5:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.enemyIds[4] +
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