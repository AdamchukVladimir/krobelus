<template>
  <form>
    <div class="hero-image heroPick-image">
      <a v-on:click="$emit('eHeroPick', this.heroObj)"
        ><img :class="this.heroObj.activity" :src="heroImage" />
      </a>
    </div>
  </form>
</template>
<script>
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
};
</script>
<style>
.heroPick-image img {
  width: 50px;
}
.inactive {
  filter: brightness(40%);
}
</style>