import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";

import VueApollo from 'vue-apollo'
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.config.productionTip = false

const httpLink = createHttpLink({
  uri: 'https://graphql-pokemon2.vercel.app',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)

new Vue({
  router,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
