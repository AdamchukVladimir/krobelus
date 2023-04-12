<template>
  <img
    class="logo"
    src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/logo_krobelus.jpg"
  />
  <h1>Log In</h1>
  <div class="loginField">
    <input type="text" v-model="login" placeholder="Enter Login" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="fLogin" @keyup.enter="fLogin">Log In</button>
    <p>
      <router-link to="signup"> Sign Up</router-link>
    </p>
    <a href="http://localhost:5000/api/auth/steam">Sign in Steam</a>
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
      login: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useUsersStore, {
      signinStore: "signin",
    }),
    async fLoginSteam() {
      let loginSteamResult = await axios.get(
        "http://localhost:5000/api/auth/steam"
      );
      console.log("loginSteamResult " + loginSteamResult);
    },
    async fLogin() {
      // let loginResult = await axios.get(
      //   `http://localhost:3000/users?name=${this.name}&password=${this.password}`
      // );
      let loginResult = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          login: this.login,
          password: md5(this.password),
        }
      );
      if (loginResult.status == 200 && loginResult.data) {
        console.log("Good loginResult " + JSON.stringify(loginResult.data));
        //localStorage.setItem("user-info", JSON.stringify(loginResult.data[0]));
        VueCookies.set("krobelus_login", loginResult.data.login, "1h");
        VueCookies.set("krobelus_pass", loginResult.data.password, "1h");
        this.signinStore(
          loginResult.data.login,
          md5(loginResult.data.password)
        );
        this.$router.push({ name: "HeroList" });
      } else {
        alert("Some error please contact admin");
      }
      console.log(loginResult);
    },
  },
  mounted() {
    // console.log("req login: " + this.$req);
    // this.signinStore(this.$req.user, md5(this.$req.user));
    // VueCookies.set("req_test", this.$req.user, "1h");
  },
};
</script>
