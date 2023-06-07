<template>
  <form>
    <div class="heroes allyPick">
      <div :class="classHeroPick">
        <a v-on:click="allyChange()"
          ><img class="hero-image allyPick-image" :src="allyHeroImage" />
        </a>
      </div>
      <div class="ally-clear" v-on:click="allyClear()">
        <a
          ><img
            class="ally-clear-img"
            src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/cross.png"
        /></a>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: "AllyPick",
  props: {
    allyId: {
      type: Number,
      required: true,
    },
    allyNumber: {
      type: Number,
      required: true,
    },
    oAlly: {
      type: Object,
      required: true,
    },
  },
  computed: {
    allyHeroImage() {
      return `https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/${this.allyNumber}.png`;
    },
    classHeroPick() {
      return `allyHero ${this.oAlly.activity}`;
    },
  },
  methods: {
    allyChange() {
      this.allyFlag = !this.allyFlag;
      //if (this.EnemyFlag) {
      this.$emit("getAlly", this.allyId);
      //}
    },
    allyClear() {
      console.log("allyClear");
      let clearAllyObject = {
        AllyClearId: this.allyId,
        AllyClearPickId: this.allyNumber,
      };
      this.$emit("allyClear", clearAllyObject);
    },
  },
  data() {
    return {
      AllyFlag: false,
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
.ally-clear img {
  position: absolute;
  margin-top: -85px;
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
.allyHero img {
  width: 70px;
  height: 87px;
  border: 1px solid black;
}
.pick img {
  border: 1px solid rgb(223, 217, 217);
}
</style>