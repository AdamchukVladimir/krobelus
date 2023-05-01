<template>
  <form>
    <div class="heroes bestHeoes">
      <HeroAvatar :heroObj="hero" />
    </div>
  </form>
</template>
<script>
import HeroAvatar from "@/components/HeroAvatar.vue";
export default {
  name: "BestHeoes",
  components: {
    HeroAvatar,
  },
  props: {
    enemyId: {
      type: Number,
      required: true,
    },
  },
  computed: {},
  methods: {},
  data() {
    return {
      EnemyFlag: false,
      counter: 0,
      hero: {
        imgId: 2,
      },
    };
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