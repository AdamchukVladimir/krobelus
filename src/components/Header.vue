<template>
  <nav class="navMenu">
    <a href="#">Home</a>
    <a href="#">dash</a>
    <a href="#">stats</a>
    <a v-on:click="fLoginLogout" href="#">{{ loginLogout }} </a>
    <div class="dot"></div>
  </nav>
</template>
<script>
export default {
  name: "Header",
  methods: {
    fLoginLogout() {
      let user = localStorage.getItem("user-info");
      if (user) {
        localStorage.removeItem("user-info");
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
  computed: {
    loginLogout() {
      let user = localStorage.getItem("user-info");
      if (user) {
        return "Logout";
      } else return "Login";
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

.navMenu {
  font-family: "Montserrat", sans-serif;
  position: relative;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin-bottom: 10px;
  padding-top: 10px;
}

.navMenu a {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  width: 80px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  padding: 5px;
}

.navMenu a:hover {
  color: #4e6985;
}
</style>