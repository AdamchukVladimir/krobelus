import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { ApolloLink } from 'apollo-link'
import { Cookies } from 'js-cookie'

//Клиент для подключения к graphql

const cache = new InMemoryCache()

const httpLink = new HttpLink({ uri: 'https://api.stratz.com/graphql' });
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  //const token = localStorage.getItem('GC_AUTH_TOKEN')
  //uri: 'https://api.stratz.com/graphql'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgyMDQyNjA4OTUiLCJ1bmlxdWVfbmFtZSI6ImludGVybmV0IG1vbmV58J-mhyIsIlN1YmplY3QiOiJhZTgwOTliYS01NTMzLTQ2ZTEtYjlkMS01ZDI5ZThiNjFmMmQiLCJTdGVhbUlkIjoiMjQzOTk1MTY3IiwibmJmIjoxNjcxNzMzMzQ5LCJleHAiOjE3MDMyNjkzNDksImlhdCI6MTY3MTczMzM0OSwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.APCr9Bvf0fj9NPUclA8FfRDS--ZVfFeYol0YwNiE5Y4'
  //const token = Cookies.get('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })

  return forward(operation)
})


const apolloClient = new ApolloClient({
  
  link: authMiddleware.concat(httpLink),
  cache,
})

export default apolloClient;