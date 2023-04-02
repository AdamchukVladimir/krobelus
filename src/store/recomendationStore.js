import { defineStore } from 'pinia';
import gql from "graphql-tag";
import { provideApolloClient , useQuery } from "@vue/apollo-composable";
import apolloClient from '@/api/ApolloClientGraphQL.js';
//import {signin } from '@/api/signin';

// const VERSUS_QUERY = gql`
//   query getHeroesById($id: Short!) {
//     heroStats {
//       matchUp(heroId: $id, week: 1679165814, take: 124) {
const VERSUS_QUERY = gql`
  query getHeroesById($id: Short!, $week: Long!) {
    heroStats {
      matchUp(heroId: $id, week: $week, take: 124) {
        vs {
          heroId1
          heroId2
          week
          matchCount
          winCount
          winRateHeroId1
          winRateHeroId2
          synergy
          winsAverage
        }
      }
    }
  }
`;

function changeIDvariablesVersus(id, variablesName) {
  console.log("ids= " + id);
  console.log("week= " + new Date.now());
  
  variablesName.value = {
    id,
    
  };
}

provideApolloClient(apolloClient);
const { result: resultVersus, variables: variablesVersus } = useQuery(
    VERSUS_QUERY,
    {}
  );
const { result: resultVersus1, variables: variablesVersus1 } = useQuery(VERSUS_QUERY,{});
const { result: resultVersus2, variables: variablesVersus2 } = useQuery(VERSUS_QUERY,{});
const { result: resultVersus3, variables: variablesVersus3 } = useQuery(VERSUS_QUERY,{});
const { result: resultVersus4, variables: variablesVersus4 } = useQuery(VERSUS_QUERY,{});
const { result: resultVersus5, variables: variablesVersus5 } = useQuery(VERSUS_QUERY,{});
export const useRecomendationStore = defineStore('RecomendationStore', {
    state: () => ({
        recomendationHeroes:{
            heroes: [
                {
                  id: 0,
                  vsSynergy: 0,
                  withSnergy: 0
                },
              ],
        },
        versusHero1:false,
        versusHero2:false,
        versusHero3:false,
        versusHero4:false,
        versusHero5:false,
        testState: 0,
    }),
    getters: {
      getTestStore: (state) =>state.testState,
      getVersusHero1: (state) =>state.versusHero1,
      getVersusHero2: (state) =>state.versusHero2,
      getVersusHero3: (state) =>state.versusHero3,
      getVersusHero4: (state) =>state.versusHero4,
      getVersusHero5: (state) =>state.versusHero5,
    },
    actions: {
        clearAllVersusState(){
          setTimeout(() => {
            this.versusHero1 = false;
            this.versusHero2 = false;
            this.versusHero3 = false;
            this.versusHero4 = false;
            this.versusHero5 = false;
          }, "1000");
        },
        clearOneVersusState(idVersus){
          setTimeout(() => {
            if (idVersus==1)      this.versusHero1 = false;
            else if (idVersus==2) this.versusHero2 = false;
            else if (idVersus==3) this.versusHero3 = false;
            else if (idVersus==4) this.versusHero4 = false;
            else if (idVersus==5) this.versusHero5 = false;
        }, "1000");
        },
        getVersus1(id){
          console.log("id= " + id);
          
          //let week = 1679165814;
          let week = parseInt(new Date().getTime()/1000);
          console.log("week= " + parseInt(new Date().getTime()/1000));
          variablesVersus1.value = {
            id,
            week,
          };
          setTimeout(() => {
            // console.log("RAW resultVersus1 " + JSON.stringify(resultVersus1));
            // console.log("RAW resultVersus1 " + JSON.stringify(resultVersus1._rawValue.heroStats.matchUp[0].vs[0]));
             this.versusHero1 = resultVersus1._rawValue;
             this.testState = "test";
            //  console.log(" this.versusHero1 " +  this.versusHero1);
            //  console.log("resultVersus1 " + JSON.stringify(this.versusHero1.heroStats.matchUp[0].vs[0]));
            //  console.log("testState " + JSON.stringify(this.testState));
            //  console.log("clear resultVersus1 2" + JSON.stringify(resultVersus1._rawValue));
            //  console.log("clear resultVersus1 bool2 " + (typeof resultVersus1._rawValue == "undefined"));
            //  console.log("clear resultVersus1 bool2 x " + (!resultVersus1._rawValue));
             //this.versusHero1 = "test2";
          }, "1000");
           
        },
        getVersus2(id){
          console.log("id= " + id);
          let week = parseInt(new Date().getTime()/1000);
          variablesVersus2.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.versusHero2 = resultVersus2._rawValue;
            console.log("resultVersus2 " + JSON.stringify(this.versusHero2.heroStats.matchUp[0].vs[0]));
          }, "2000");
        },
        getVersus3(id){
          console.log("id= " + id);
          let week = parseInt(new Date().getTime()/1000);
          variablesVersus3.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.versusHero3 = resultVersus3._rawValue;
            console.log("resultVersus3 " + JSON.stringify(this.versusHero3.heroStats.matchUp[0].vs[0]));
          }, "2000");
        },
        getVersus4(id){
          console.log("id= " + id);
          let week = parseInt(new Date().getTime()/1000);
          variablesVersus4.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.versusHero4 = resultVersus4._rawValue;
            console.log("resultVersus4 " + JSON.stringify(this.versusHero4.heroStats.matchUp[0].vs[0]));
          }, "2000");
        },
        getVersus5(id){
          console.log("id= " + id);
          let week = parseInt(new Date().getTime()/1000);
          variablesVersus5.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.versusHero5 = resultVersus5._rawValue;
            console.log("resultVersus5 " + JSON.stringify(this.versusHero5.heroStats.matchUp[0].vs[0]));
          }, "2000");
        },                                
        async getDefaultHeroes(heroes){
            //this.recomendationHeroes = heroes
            console.log("state " + heroes.constants.heroes[1].id);
            
            for (let i = 0; i < heroes.constants.heroes.length; i++) {
                this.recomendationHeroes.heroes.push({
                  id: heroes.constants.heroes[i].id,
                  vsSynergy: 0,
                  withSnergy: 0
                });
            }
            console.log("this.recomendationHeroes " + this.recomendationHeroes.heroes[112].id);
            console.log("this.recomendationHeroes synergy vs" + this.recomendationHeroes.heroes[112].vsSynergy);
        }
    }
});