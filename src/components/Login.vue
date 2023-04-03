<template>
  <img
    class="logo"
    src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/logo_krobelus.jpg"
  />
  <h1>Log In</h1>
  <div class="loginField">
    <input type="text" v-model="name" placeholder="Enter Login" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login" @keyup.enter="login">Log In</button>
    <p>
      <router-link to="signup"> Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { mapActions, mapState } from "pinia";
import { useUsersStore } from "@/store/usersStore";
const md5 = require("md5");
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useUsersStore, {
      signinStore: "signin",
    }),
    async login() {
      let loginResult = await axios.get(
        `http://localhost:3000/users?name=${this.name}&password=${this.password}`
      );
      if (loginResult.status == 200 && loginResult.data.length > 0) {
        //localStorage.setItem("user-info", JSON.stringify(loginResult.data[0]));
        VueCookies.set("krobelus_login", loginResult.data[0].name, "1h");
        VueCookies.set(
          "krobelus_pass",
          md5(loginResult.data[0].password),
          "1h"
        );
        this.signinStore(
          loginResult.data[0].name,
          md5(loginResult.data[0].password)
        );
        this.$router.push({ name: "HeroList" });
      } else {
        alert("Some error please contact admin");
      }
      console.log(loginResult);
    },
  },
  mounted() {
    /*
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "HeroList" });
    }
    */
  },
};
</script>
