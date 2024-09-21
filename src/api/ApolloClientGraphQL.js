import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { HttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloLink } from "apollo-link";
import { Cookies } from "js-cookie";

//Клиент для подключения к graphql
const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: "https://api.stratz.com/graphql" });
const authMiddleware = new ApolloLink((operation, forward) => {
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiYWU4MDk5YmEtNTUzMy00NmUxLWI5ZDEtNWQyOWU4YjYxZjJkIiwiU3RlYW1JZCI6IjI0Mzk5NTE2NyIsIm5iZiI6MTcyMjg4Njk1MCwiZXhwIjoxNzU0NDIyOTUwLCJpYXQiOjE3MjI4ODY5NTAsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.p1XjSQjIjOuvXWPx_Dh67sHi6MJF8OM4Jfr5Edzg03U";
	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : null,
		},
	});

	return forward(operation);
});

const apolloClient = new ApolloClient({
	link: authMiddleware.concat(httpLink),
	cache,
});

export default apolloClient;
