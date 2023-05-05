import { defineStore } from 'pinia';
import VueCookies from "vue-cookies";
import VueJwtDecode from 'vue-jwt-decode';
import axios from "axios";
import gql from "graphql-tag";
import { provideApolloClient , useQuery } from "@vue/apollo-composable";
import apolloClient from '@/api/ApolloClientGraphQL.js';
const bignumber = require("bignumber.js");
const jwtTokenSteam = VueCookies.get("tokenSteam");
let jwtTokenSteamDecode = {};
let steamUser = {};
let steamAvatarLink = "";
const USER_HEROES_QUERY = gql`
query getPlayerById($id: Long!)  {
    player(steamAccountId: $id) {
      simpleSummary {
        matchCount
        heroes {
          heroId
          winCount
          lossCount
        }
      }
      lastMatchDate
      matchCount
      heroesPerformance(request: { orderBy: ASC }, take: 125) {
        heroId
        matchCount
        winCount
        lastPlayedDateTime
      }
    }
  }
`;
provideApolloClient(apolloClient);


// Steam 64 to 32
//bignumber = require("bignumber.js");
// console.log(bignumber('76561197991791363').minus('76561197960265728'))


setTimeout(() => {
    console.log('Player1 ');
    //console.log('resultPlayer '+ JSON.stringify(resultPlayer._rawValue));
    //console.log('resultPlayer1 '+ JSON.stringify(this.player));
}, "2000");

  const { result: resultPlayer, variables: variablesPlayer } = useQuery(USER_HEROES_QUERY,{});


async function getsteamUser(jwtTokenSteam){
    let jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
    let steamUserData = await axios.post(
        "http://localhost:5000/api/steam/user",
        {
          token: jwtTokenSteamDecode.steamid
        }
    );
    return steamUserData.data.user;   
}

export const useUsersStore = defineStore('UsersStore', {
    state: () => ({
        userLogin: '',
        userPass: '',
        steamID: null,
        steamID32: null,
        steamAvatar: '',
        player: resultPlayer
    }),
    getters: {
        userlogin: (state) =>state.userLogin,
        userSteamAvatar: (state) =>state.steamAvatar,
        userSteamID: (state) =>state.steamID,
        userSteamID32: (state) => new bignumber(state.steamID).minus('76561197960265728'),
    },
    actions: {        
       async signinSteam(jwtTokenSteam){
            
            let jwtTokenSteamDecode = VueJwtDecode.decode(jwtTokenSteam);
            let steamUserData = await axios.post(
                "http://localhost:5000/api/steam/user",
                {
                token: jwtTokenSteamDecode.steamid
                }
            );
            this.steamAvatar = steamUserData.data.user.avatarfull;
            this.steamID     = steamUserData.data.user.steamid;
            this.steamID32   = Number( new bignumber(steamUserData.data.user.steamid).minus('76561197960265728'));
            let id = this.steamID32;
            
            variablesPlayer.value = {
                id,
              };
            setTimeout(() => {
                console.log('Player-1 '+ JSON.stringify(this.player));
                console.log('Player-1userLogin '+ this.userLogin);
                console.log('Player id32 ' + this.steamID32);
            }, "3000");
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
            this.steamID = null;
            this.steamAvatar = null;
        }
    }
});