<template>
  <div class="about">
    <h1>This is an about page</h1>
    <EnemyPick />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import EnemyPick from "@/components/EnemyPick.vue";

export default {
  components: {
    EnemyPick,
  },
};
/*
export default {
  name: "EnemyPick",
  components: {
    EnemyPick,
  },
};
*/
</script>
