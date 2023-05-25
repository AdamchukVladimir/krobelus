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
import { ref, watch } from "vue";
export default {
  props: {
    heroObj: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useUsersStore();
    const favClass = "fave";
    //Важно, проверяет, когда изменится значение в pinia state.player
    watch(
      () => store.top10Heroes,
      (newValue) => {
        console.log("new Value store heroAvatar " + JSON.stringify(newValue));

        // store.setSimpleSummary();
        // store.setSteamBestHeroes();
      }
    );
    //return { top10Heroes: store.top10Heroes };
    console.log("favClass " + favClass);
    return { favClass };
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
      console.log("getClass " + this.favClass);
      let isFave = "";
      console.log("this.userTop10HeroesStore 53 " + this.userTop10HeroesStore);
      console.log(
        "this.userTop10HeroesStore.length 53 " +
          this.userTop10HeroesStore.length
      );
      console.log("this.heroObj.imgId 53 " + this.heroObj.imgId);
      for (let j = 0; j < this.userTop10HeroesStore.length; j++) {
        console.log(
          "this.userTop10HeroesStore 53 j " + this.userTop10HeroesStore[j].id
        );
        if (this.heroObj.imgId == this.userTop10HeroesStore[j].id) {
          isFave = "fave";
        }
      }
      return this.heroObj.activity + " " + isFave;
    },
    getFaveHeroes() {
      console.log(
        "userTop10HeroesStore " + JSON.stringify(this.userTop10HeroesStore)
      );
      for (let i = 0; i < this.userTop10HeroesStore.length; i++) {
        if (this.heroObj.imgId == this.userTop10Heroes[i].id) return "fave";
      }
    },
  },
  mounted() {
    console.log(
      "mounted userTop10HeroesStore " +
        JSON.stringify(this.userTop10HeroesStore)
    );
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