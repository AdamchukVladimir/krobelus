import { defineStore } from 'pinia';
import VueCookies from "vue-cookies";
import VueJwtDecode from 'vue-jwt-decode';
import axios from "axios";

const jwtTokenSteam = VueCookies.get("tokenSteam");
let jwtTokenSteamDecode = {};
let steamUser = {};
let steamAvatarLink = "";
// if (jwtTokenSteam){
//     console.log("jwtToken2 " + JSON.stringify(jwtTokenSteam));
//     console.log("jwtDecode " + JSON.stringify(VueJwtDecode.decode(jwtTokenSteam)));
//     jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
//     console.log("jwtDecode.steamID " + jwtTokenSteamDecode.steamid);

//     getsteamUser();

// }
// console.log("jwtDecode.steamID2 " + jwtTokenSteamDecode.steamid);
// const tokenSteamReady = jwtTokenSteamDecode.steamid || 0;

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
        steamID: 0,
        steamAvatar: '',
    }),
    getters: {
        userlogin: (state) =>state.userLogin,
        userSteamAvatar: (state) =>state.steamAvatar,
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
        //console.log("steamAvatar " + steamUser.avatarfull);
        },
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