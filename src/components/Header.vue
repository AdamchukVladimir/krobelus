<template>
  <nav class="navMenu">
    <a href="#">Home</a>
    <a href="#">dash</a>
    <a href="#">stats</a>
    <a v-show="fGetUserAuthentication" @click="fLogout">Logout</a>
    <a v-show="!fGetUserAuthentication" @click="fLogout">Login</a>
    <div class="dot"></div>
  </nav>
</template>
<script>
import VueCookies from "vue-cookies";

export default {
  name: "Header",
  methods: {
    fLogin() {
      /*
      let user = localStorage.getItem("user-info");
      if (user) {
        localStorage.removeItem("user-info");
      } else {
        this.$router.push({ name: "Login" });
      }
      */
      this.$router.push({ path: "/login" });
    },
    fLogout() {
      VueCookies.remove("krobelus_login");
      VueCookies.remove("krobelus_pass");
    },
  },
  computed: {
    loginLogout() {
      let user = localStorage.getItem("user-info");
      if (user) {
        return "Logout";
      } else return "Login";
    },
    fGetUserAuthentication() {
      if (VueCookies.get("krobelus_login") && VueCookies.get("krobelus_pass")) {
        console.log("fGetUserAuthentication - true");
        return true;
      }
      console.log("fGetUserAuthentication - false");
      return false;
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