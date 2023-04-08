<template>
  <img
    class="logo"
    src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/logo_krobelus.jpg"
  />
  <h1>Sign Up</h1>
  <div class="signupField">
    <input type="text" v-model="login" placeholder="Enter Login" />
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="signUp">Sign Up</button>
    <p>
      <router-link to="login"> Login</router-link>
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
  name: "SignUp",
  data() {
    return {
      login: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useUsersStore, {
      signinStore: "signin",
    }),
    async signUp() {
      //let signUpResult = await axios.post("http://localhost:3000/users", {
      let signUpResult = await axios.post("http://localhost:5000/api/users", {
        login: this.login,
        email: this.email,
        password: this.password,
      });
      console.log("signUpResult " + JSON.stringify(signUpResult));
      if (signUpResult.status == 200) {
        //localStorage.setItem("user-info", JSON.stringify(signUpResult.data));
        VueCookies.set("krobelus_login", signUpResult.data.login, "1h");
        VueCookies.set("krobelus_pass", signUpResult.data.password, "1h");

        this.signinStore(signUpResult.data.login, signUpResult.data.password);
        this.$router.push({ name: "HeroList" });
      } else {
        alert("Some error please contact admin");
      }
    },
  },
};
</script>

<style>
</style>
