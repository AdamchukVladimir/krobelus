<template>
  <img
    class="logo"
    src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/logo_krobelus.jpg"
  />
  <h1>Sign Up</h1>
  <div class="signupField">
    <input type="text" v-model="name" placeholder="Enter Login" />
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="signUp">Sign Up</button>
    <p>
      <router-link to="/login"> Login</router-link>
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
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useUsersStore, {
      signinStore: "signin",
    }),
    async signUp() {
      let signUpResult = await axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      console.log(signUpResult);
      if (signUpResult.status == 201) {
        //localStorage.setItem("user-info", JSON.stringify(signUpResult.data));
        VueCookies.set("krobelus_login", signUpResult.data.name, "1h");
        VueCookies.set("krobelus_pass", md5(signUpResult.data.password), "1h");
        this.signinStore(
          loginResult.data[0].name,
          md5(loginResult.data[0].password)
        );
        this.$router.push({ name: "HeroList" });
      } else {
        alert("Some error please contact admin");
      }
    },
  },
  // mounted() {
  //   let user = localStorage.getItem("user-info");
  //   if (user) {
  //     this.$router.push({ name: "HeroList" });
  //   }
  // },
};
</script>

<style>
</style>
