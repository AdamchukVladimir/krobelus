<template>
  <form>
    <div class="hero-image heroPick-image">
      <a href="#"><img :src="heroImage" /> </a>
      <p>{{ heroId }}</p>
    </div>
  </form>
  <p>test2</p>
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
