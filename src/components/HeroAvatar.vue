<template>
  <form>
    <div class="hero-image heroPick-image">
      <a v-on:click="$emit('eHeroPick', this.heroId)"
        ><img :src="heroImage" />
      </a>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    heroId: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      heroImage:
        "https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/hero_img/" +
        this.heroId +
        ".png",
    };
  },
};
</script>
<style>
.heroPick-image img {
  width: 50px;
}
</style>