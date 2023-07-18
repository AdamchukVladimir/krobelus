import { defineStore } from 'pinia';
import gql from "graphql-tag";
import { provideApolloClient , useQuery } from "@vue/apollo-composable";
import apolloClient from '@/api/ApolloClientGraphQL.js';
import axios from "axios";
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
        with{
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

provideApolloClient(apolloClient);
// const { result: resultVersus1, variables: variablesVersus1 } = useQuery(VERSUS_QUERY,{});
// const { result: resultVersus2, variables: variablesVersus2 } = useQuery(VERSUS_QUERY,{});
// const { result: resultVersus3, variables: variablesVersus3 } = useQuery(VERSUS_QUERY,{});
// const { result: resultVersus4, variables: variablesVersus4 } = useQuery(VERSUS_QUERY,{});
// const { result: resultVersus5, variables: variablesVersus5 } = useQuery(VERSUS_QUERY,{});
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
        allHeroes:{
          allyHeroes:[0,0,0,0,0],
          enemyHeroes:[0,0,0,0,0],
        },
        radiantSide:true,
        versusHero1:false,
        versusHero2:false,
        versusHero3:false,
        versusHero4:false,
        versusHero5:false,
        allyHero1:false,
        allyHero2:false,
        allyHero3:false,
        allyHero4:false,
        allyHero5:false,
        testState: 0,
    }),
    getters: {
      getTestStore: (state) =>state.testState,
      getVersusHero1: (state) =>state.versusHero1,
      getVersusHero2: (state) =>state.versusHero2,
      getVersusHero3: (state) =>state.versusHero3,
      getVersusHero4: (state) =>state.versusHero4,
      getVersusHero5: (state) =>state.versusHero5,
      getAllyHero1: (state) =>state.allyHero1,
      getAllyHero2: (state) =>state.allyHero2,
      getAllyHero3: (state) =>state.allyHero3,
      getAllyHero4: (state) =>state.allyHero4,
      getAllyHero5: (state) =>state.allyHero5,
      getHeroId: (state) => (heroNumber,side) => {
        return state.allHeroes[side][heroNumber-1];
      },
    },
    actions: {
          async getDraftOCR(){
            console.log("async getDraftOCR");  
            for (let heroNumber = 1; heroNumber < 11; heroNumber++){  
              let ocrDraftData = await axios.post(
                  "http://localhost:5000/api/ocr/draft",
                  {
                    heroNumber: heroNumber//heroNumber //2
                  }
              );
              if (this.radiantSide) {
                if(heroNumber<6){
                  //console.log("post ocr " +heroNumber +" "+ ocrDraftData.data);
                  //console.log('ocrDraftData allHeroes.allyheroes '+ this.allHeroes.allyHeroes);
                  //console.log('ocrDraftData.data>0 ' + ocrDraftData.data>0);//??????????
                  if (ocrDraftData.data>0){
                    this.allHeroes.allyHeroes.splice(heroNumber-1, 1, ocrDraftData.data);
                  }
                  //console.log('ocrDraftData allHeroes.allyheroes '+ this.allHeroes.allyHeroes);
                }
                else{
                  if (ocrDraftData.data>0){
                    this.allHeroes.enemyHeroes.splice(heroNumber-6, 1, ocrDraftData.data);
                  }
                }
              }
              else{
                if(heroNumber>5){
                  if (ocrDraftData.data>0){
                    this.allHeroes.allyHeroes.splice(heroNumber-6, 1, ocrDraftData.data);
                  }
                }
                else{
                  if (ocrDraftData.data>0){
                    this.allHeroes.enemyHeroes.splice(heroNumber-1, 1, ocrDraftData.data);
                  }  
                }
              }        
          }
          console.log('ocrDraftData allHeroes '+ JSON.stringify(this.allHeroes));
        },
        putHeroesId(heroNumber, heroID, side){
          if (side=="enemy") this.allHeroes.enemyHeroes.splice(heroNumber-1, 1, heroID);
          else if (side=="ally") this.allHeroes.allyHeroes.splice(heroNumber-1, 1, heroID);
          console.log('putHeroesId allHeroes '+ JSON.stringify(this.allHeroes));
        },
        clearHeroesIdAll(side){
          if (side=="enemy") this.allHeroes.enemyHeroes = [0,0,0,0,0];
          else if (side=="ally") this.allHeroes.allyHeroes = [0,0,0,0,0];
          console.log('clearHeroesIdAll allHeroes '+ JSON.stringify(this.allHeroes));
        },
        clearAllAllyState(){
          setTimeout(() => {
            console.log("allyHero1= " + JSON.stringify(this.allyHero1.heroStats.matchUp[0].with[0]));
            this.allyHero1 = false;
            this.allyHero2 = false;
            this.allyHero3 = false;
            this.allyHero4 = false;
            this.allyHero5 = false;
            console.log("allyHero1= " + this.allyHero1);
          }, "1000");
        },
        clearOneAllyState(idAlly){
          setTimeout(() => {
            console.log("allyHero1= " + JSON.stringify(this.allyHero1.heroStats.matchUp[0].with[0]));
            if (idAlly==1)      this.allyHero1 = false;
            else if (idAlly==2) this.allyHero2 = false;
            else if (idAlly==3) this.allyHero3 = false;
            else if (idAlly==4) this.allyHero4 = false;
            else if (idAlly==5) this.allyHero5 = false;
            console.log("allyHero1= " + this.allyHero1);
        }, "1000");
        },
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
        getAlly1(id){
          console.log("id= " + id);
          
          //let week = 1679165814;
          let week = parseInt(new Date().getTime()/1000);
          console.log("week= " + parseInt(new Date().getTime()/1000));
          const { result: resultAlly1, variables: variablesAlly1 } = useQuery(VERSUS_QUERY,{});
          variablesAlly1.value = {
            id,
            week,
          };
          
          setTimeout(() => {
            this.allyHero1 = resultAlly1._rawValue;
            console.log("allyHero1= " + JSON.stringify(this.allyHero1.heroStats.matchUp[0].with[0]));
          }, "2000");
           
        },
        getAlly2(id){
          console.log("id ally= " + id);
          let week = parseInt(new Date().getTime()/1000);
          console.log("week ally= " + parseInt(new Date().getTime()/1000));
          const { result: resultAlly2, variables: variablesAlly2 } = useQuery(VERSUS_QUERY,{});
          variablesAlly2.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.allyHero2 = resultAlly2._rawValue;
          }, "2000"); 
        },
        getAlly3(id){
          console.log("id3 ally= " + id);
          let week = parseInt(new Date().getTime()/1000);
          console.log("week3 ally= " + parseInt(new Date().getTime()/1000));
          const { result: resultAlly3, variables: variablesAlly3 } = useQuery(VERSUS_QUERY,{});
          variablesAlly3.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.allyHero3 = resultAlly3._rawValue;
          }, "2000"); 
        },
        getAlly4(id){
          console.log("id4 ally= " + id);
          let week = parseInt(new Date().getTime()/1000);
          console.log("week4 ally= " + parseInt(new Date().getTime()/1000));
          const { result: resultAlly4, variables: variablesAlly4 } = useQuery(VERSUS_QUERY,{});
          variablesAlly4.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.allyHero4 = resultAlly4._rawValue;
          }, "2000"); 
        },
        getAlly5(id){
          console.log("id5 ally= " + id);
          let week = parseInt(new Date().getTime()/1000);
          console.log("week5 ally= " + parseInt(new Date().getTime()/1000));
          const { result: resultAlly5, variables: variablesAlly5 } = useQuery(VERSUS_QUERY,{});
          variablesAlly5.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.allyHero5 = resultAlly5._rawValue;
          }, "2000"); 
        },
        getVersus1(id){
          console.log("id= " + id);
          
          //let week = 1679165814;
          let week = parseInt(new Date().getTime()/1000);
          console.log("week= " + parseInt(new Date().getTime()/1000));
          const { result: resultVersus1, variables: variablesVersus1 } = useQuery(VERSUS_QUERY,{});
          variablesVersus1.value = {
            id,
            week,
          };
          
          setTimeout(() => {
            this.versusHero1 = resultVersus1._rawValue;
          }, "2000");
           
        },
        getVersus2(id){
          console.log("id= " + id);
          let week = parseInt(new Date().getTime()/1000);
          const { result: resultVersus2, variables: variablesVersus2 } = useQuery(VERSUS_QUERY,{});
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
          const { result: resultVersus3, variables: variablesVersus3 } = useQuery(VERSUS_QUERY,{});
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
          const { result: resultVersus4, variables: variablesVersus4 } = useQuery(VERSUS_QUERY,{});
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
          const { result: resultVersus5, variables: variablesVersus5 } = useQuery(VERSUS_QUERY,{});
          variablesVersus5.value = {
            id,
            week,
          };
          setTimeout(() => {
            this.versusHero5 = resultVersus5._rawValue;
            console.log("resultVersus5 " + JSON.stringify(this.versusHero5.heroStats.matchUp[0].vs[0]));
          }, "2000");
        },                                
    }
});