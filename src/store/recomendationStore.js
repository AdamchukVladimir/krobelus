import { defineStore } from 'pinia';
//import {signin } from '@/api/signin';

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
    }),
    getters: {

    },
    actions: {
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