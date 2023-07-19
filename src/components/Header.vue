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
import { ref, watch } from "vue";
import { useRecomendationStore } from "@/store/recomendationStore";

export default {
  name: "Header",
  setup() {
    const store = useUsersStore();

    //Важно, проверяет, когда изменится значение в pinia state.player
    watch(
      () => store.player,
      (newValue) => {
        console.log(
          "new Value store " + JSON.stringify(newValue.player.simpleSummary)
        );
        store.setSimpleSummary();
        store.setSteamBestHeroes();
      }
    );
    return { player1: store.player };
  },

  methods: {
    ...mapActions(useUsersStore, {
      signinStore: "signin",
      signoutStore: "signout",
      signinSteamStore: "signinSteam",

      setSimpleSummaryStore: "setSimpleSummary",
      setSteamBestHeroesStore: "setSteamBestHeroes",
    }),
    ...mapActions(useRecomendationStore, {
      getDraftOCRStore: "getDraftOCR",
      getVersus1Store: "getVersus1",
      getVersus2Store: "getVersus2",
      getVersus3Store: "getVersus3",
      getVersus4Store: "getVersus4",
      getVersus5Store: "getVersus5",
      clearAllVersusStateStore: "clearAllVersusState",
      clearOneVersusStateStore: "clearOneVersusState",
      getAlly1Store: "getAlly1",
      getAlly2Store: "getAlly2",
      getAlly3Store: "getAlly3",
      getAlly4Store: "getAlly4",
      getAlly5Store: "getAlly5",
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
    ...mapState(useRecomendationStore, {
      getHeroIdStore: "getHeroId",
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
    fgetDraftOCRStore() {
      this.getDraftOCRStore();
      //setInterval(this.getDraftOCRStore, 2000); //Отправка запроса OCR каждые 2 сек
    },
    fgetAllrecomendation() {
      //Обновляет store рекомендации всех выбранных героев, для автоматизации
      // setTimeout(() => {
      //   console.log(
      //     "fgetAllrecomendation " + this.getHeroIdStore(1, `enemyHeroes`)
      //   );
      // }, "8000");
      setTimeout(() => {
        this.getVersus1Store(this.getHeroIdStore(1, `enemyHeroes`));
        this.getVersus2Store(this.getHeroIdStore(2, `enemyHeroes`));
        this.getVersus3Store(this.getHeroIdStore(3, `enemyHeroes`));
        this.getVersus4Store(this.getHeroIdStore(4, `enemyHeroes`));
        this.getVersus5Store(this.getHeroIdStore(5, `enemyHeroes`));

        this.getAlly1Store(this.getHeroIdStore(1, `allyHeroes`));
        this.getAlly2Store(this.getHeroIdStore(2, `allyHeroes`));
        this.getAlly3Store(this.getHeroIdStore(3, `allyHeroes`));
        this.getAlly4Store(this.getHeroIdStore(4, `allyHeroes`));
        this.getAlly5Store(this.getHeroIdStore(5, `allyHeroes`));
      }, "8000");
    },
  },
  mounted() {
    this.fAutoSignin;
    this.fAutoSigninSteam;
    this.fgetDraftOCRStore; //OCR получение драфта
    this.fgetAllrecomendation; //получение рекомендаций по всем героям
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