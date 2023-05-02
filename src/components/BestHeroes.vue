<template>
  <Header />
  <form>
    <div class="profile avatar"><img :src="fAvatarImage" /></div>
    <div class="heroes bestHeoes">
      <HeroAvatar :heroObj="hero" />

      {{ userSteamID32Store }}
    </div>
  </form>
</template>
<script>
import HeroAvatar from "@/components/HeroAvatar.vue";
import Header from "@/components/Header.vue";
import { useUsersStore } from "@/store/usersStore";
import { mapActions, mapState } from "pinia";
export default {
  name: "BestHeoes",
  components: {
    HeroAvatar,
    Header,
  },
  props: {
    enemyId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      EnemyFlag: false,
      counter: 0,
      hero: {
        imgId: 2,
      },
    };
  },
  computed: {
    ...mapState(useUsersStore, {
      userSteamID32Store: "userSteamID32",
      userSteamAvatarStore: "userSteamAvatar",
    }),
    fAvatarImage() {
      console.log("userSteamAvatarStore " + this.userSteamAvatarStore);
      if (this.userSteamAvatarStore) return this.userSteamAvatarStore;
    },
  },
  mounted() {
    console.log("mounteduserSteamAvatarStore " + this.userSteamAvatarStore);
  },
};
</script>
<style>
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