import { defineStore } from 'pinia';
import VueCookies from "vue-cookies";
import VueJwtDecode from 'vue-jwt-decode';
import axios from "axios";

const jwtTokenSteam = VueCookies.get("tokenSteam");
console.log("jwtToken2 " + JSON.stringify(jwtTokenSteam));
console.log("jwtDecode " + JSON.stringify(VueJwtDecode.decode(jwtTokenSteam)));
const jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
console.log("jwtDecode.steamID " + jwtTokenSteamDecode.steamid);

    let playerSummaries = axios.get(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D1893E0A93FA327C5D749D6B9303C05E&steamids=${jwtTokenSteamDecode.steamid}`
    );
    console.log("playerSummaries " + playerSummaries);

export const useUsersStore = defineStore('UsersStore', {
    state: () => ({
        userLogin: '',
        userPass: '',
        steamID: jwtTokenSteamDecode.steamid,
    }),
    getters: {
        userlogin: (state) =>state.userLogin,
    },
    actions: {
        signin(login, password){
            console.log('login store ' + login);
            this.userLogin = login;
            this.userPass = password;
        },
        signout(){
            console.log('sign out store');
            this.userLogin = null;
            this.userPass = null;
        }
    }
});