<template>
  <nav class="navMenu">
    <router-link :to="{ name: 'HeroList' }">Home</router-link>
    <router-link :to="{ name: 'Dashboard' }">Dash</router-link>
    <router-link :to="{ name: 'Dashboard' }">Stats</router-link>
    <a href="#" v-show="fGetUserAuthentication" @click="fLogout">Logout</a>
    <router-link :to="{ name: 'Dashboard' }" v-show="!fGetUserAuthentication"
      >Login</router-link
    >
    <router-link :to="{ name: 'Dashboard' }"
      ><img :src="fAvatarImage" :alt="selectedItem"
    /></router-link>

    <div class="dot"></div>
  </nav>
</template>
<script>
import VueCookies from "vue-cookies";
import { mapActions, mapState } from "pinia";
import { useUsersStore } from "@/store/usersStore";

export default {
  name: "Header",
  methods: {
    ...mapActions(useUsersStore, {
      signinStore: "signin",
      signoutStore: "signout",
      signinSteamStore: "signinSteam",
    }),
    fLogout() {
      VueCookies.remove("krobelus_login");
      VueCookies.remove("krobelus_pass");
      VueCookies.remove("tokenSteam");
      this.signoutStore();
    },
  },
  computed: {
    ...mapState(useUsersStore, {
      getUserlogin: "userlogin",
      getUserSteamAvatar: "userSteamAvatar",
      getUserSteamID: "userSteamID",
    }),
    fAutoSignin() {
      if (
        VueCookies.isKey("krobelus_login") &&
        VueCookies.isKey("krobelus_pass")
      ) {
        this.signinStore(
          VueCookies.get("krobelus_login"),
          VueCookies.get("krobelus_pass")
        );
      }
    },
    //Автозаход Steam по jWT токену из куки
    fAutoSigninSteam() {
      if (VueCookies.get("tokenSteam")) {
        this.signinSteamStore(VueCookies.get("tokenSteam"));
      }
    },
    fGetUserAuthentication() {
      if (this.getUserlogin || this.getUserSteamID) {
        console.log("fGetUserAuthentication - true");
        return true;
      }
      console.log("fGetUserAuthentication - false");
      return false;
    },
    fAvatarImage() {
      if (this.getUserSteamAvatar) return this.getUserSteamAvatar;
    },
  },
  mounted() {
    this.fAutoSignin;
    this.fAutoSigninSteam;
    //const jwtToken = VueCookies.get("tokenSteam");
    console.log("jwtToken " + JSON.stringify(VueCookies.get("tokenSteam")));
    console.log(
      "krobelus_pass " + JSON.stringify(VueCookies.get("krobelus_pass"))
    );
    console.log("getUserSteamAvatar " + this.getUserSteamAvatar);
    console.log("getUserSteamID " + this.getUserSteamID);
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
  align-items: bottom;
  justify-content: bottom;
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
  padding-left: 5px;
}

.navMenu a:hover {
  color: #4e6985;
}

.navMenu a img {
  width: 25px;
  padding-left: 20px;
  display: block;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>