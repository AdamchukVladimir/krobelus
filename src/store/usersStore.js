import { defineStore } from 'pinia';

export const useUsersStore = defineStore('UsersStore', {
    state: () => ({
        userLogin: '',
        userPass: '',
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