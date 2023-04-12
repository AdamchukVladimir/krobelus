import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
//import { createApolloProvider } from '@vue/apollo-option';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from "./router";
//import store from "./store";
import apolloClient from '@/api/ApolloClientGraphQL.js';

//import pinia from "@/stores/store.js";

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient,
// });
const pinia = createPinia();
const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

//app.use(DefaultApolloClient);
//app.use(apolloClient);
//app.use(apolloProvider); //classic
app.use(router);
app.use(pinia);
//app.mount('#app');
router.isReady().then(() => {
  app.mount("#app");
});
