import { defineStore } from 'pinia';
import VueCookies from "vue-cookies";
import VueJwtDecode from 'vue-jwt-decode';
import axios from "axios";

const jwtTokenSteam = VueCookies.get("tokenSteam");
let jwtTokenSteamDecode = {};
let steamUser = {};
let steamAvatarLink = "";

// Steam 64 to 32
// bignumber = require("bignumber.js");
// console.log(bignumber('76561197991791363').minus('76561197960265728'))

async function getsteamUser(jwtTokenSteam){
    console.log("23jwtTokenSteam " + jwtTokenSteam);
   let jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
   console.log("25jwtTokenSteamDecode " + JSON.stringify(jwtTokenSteamDecode));
   console.log("26jwtTokenSteamDecode.steamid " + jwtTokenSteamDecode.steamid); 
   let steamUserData = await axios.post(
        "http://localhost:5000/api/steam/user",
        {
          token: jwtTokenSteamDecode.steamid
        }
    );
    console.log("steamUserData " + JSON.stringify(steamUserData.data.user));
    
    return steamUserData.data.user;
     
}


export const useUsersStore = defineStore('UsersStore', {
    state: () => ({
        userLogin: '',
        userPass: '',
        steamID: null,
        steamAvatar: '',
    }),
    getters: {
        userlogin: (state) =>state.userLogin,
        userSteamAvatar: (state) =>state.steamAvatar,
        userSteamID: (state) =>state.steamID
    },
    actions: {
       async signinSteam(jwtTokenSteam){

            let jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
            console.log("25jwtTokenSteamDecode " + JSON.stringify(jwtTokenSteamDecode));
            console.log("26jwtTokenSteamDecode.steamid " + jwtTokenSteamDecode.steamid); 
            let steamUserData = await axios.post(
                "http://localhost:5000/api/steam/user",
                {
                token: jwtTokenSteamDecode.steamid
                }
            );
            console.log("steamUserData " + JSON.stringify(steamUserData.data.user));
            this.steamAvatar = steamUserData.data.user.avatarfull;
            this.steamID     = steamUserData.data.user.steamid;
            console.log("steamID " + this.steamID );
        },
        // putSteamID(jwtTokenSteam){
        //     let jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
        //     this.steamID = jwtTokenSteamDecode.steamid;
        //     console.log("Put STEAM token");
        // },
        signin(login, password){
            console.log('login store ' + login);
            this.userLogin = login;
            this.userPass = password;
        },
        signout(){
            console.log('sign out store');
            this.userLogin = null;
            this.userPass = null;
            this.steamID = null;
            this.steamAvatar = null;
        }
    }
});