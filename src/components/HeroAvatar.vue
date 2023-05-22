<template>
  <form>
    <div class="hero-image heroPick-image">
      <a v-on:click="$emit('eHeroPick', this.heroObj)"
        ><img :class="getClass" :src="heroImage" />
      </a>
    </div>
  </form>
</template>
<script>
//><img :class="this.heroObj.activity" :src="heroImage" />

import { useStore, mapActions, mapState } from "pinia";
import { useUsersStore } from "@/store/usersStore";
export default {
  props: {
    heroObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      heroImage:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.heroObj.imgId +
        ".png",
    };
  },
  computed: {
    ...mapState(useUsersStore, { userTop10HeroesStore: "userTop10Heroes" }),
    getClass() {
      return this.heroObj.activity;
    },
    getFaveHeroes() {
      console.log(
        "userTop10HeroesStore " + JSON.stringify(this.userTop10HeroesStore)
      );
      for (var i = 0; i < this.userTop10HeroesStore.length; i++) {
        if (this.heroObj.imgId == this.userTop10Heroes[i].id) return "fave";
      }
    },
  },
  mounted() {
    console.log(
      "mounted userTop10HeroesStore " +
        JSON.stringify(this.userTop10HeroesStore)
    );
    this.getFaveHeroes();
  },
};
</script>
<style>
.heroPick-image img {
  width: 50px;
}
.inactive {
  filter: brightness(40%);
}
.fave {
  border: thick double #32a1ce;
}
</style>