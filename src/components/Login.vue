<template>
  <img
    class="logo"
    src="https://raw.githubusercontent.com/AdamchukVladimir/krobelus/master/src/assets/img/logo_krobelus.jpg"
  />
  <h1>Log In</h1>
  <div class="loginField">
    <input type="text" v-model="name" placeholder="Enter Login" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login">Log In</button>
    <p>
      <router-link to="/signup"> Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let loginResult = await axios.get(
        `http://localhost:3000/users?name=${this.name}&password=${this.password}`
      );
      if (loginResult.status == 200 && loginResult.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(loginResult.data[0]));
        this.$router.push({ name: "HeroList" });
      } else {
        alert("Some error please contact admin");
      }
      console.log(loginResult);
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "HeroList" });
    }
  },
};
</script>
