import { defineStore } from 'pinia';
import {signin } from '@/api/signin';
export const useUserStore = defineStore('UserStore', {
    state: () => ({
        user: '',
    }),
    getters: {
        my: (state) => state.user.age * 2,
        userlogin: (state) =>state.user,
    },
    actions: {
        async singin(login){
            console.log('login ' + login);
            //this.user = signin()
            this.user = login
        }
    }
});