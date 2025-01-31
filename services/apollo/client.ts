"use client"
import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/query",
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:8080/query",
      connectionParams: () => {
        const token = localStorage.getItem('token');
        console.log(token)
        return {
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
    })
  );

  const authLink = setContext((_, DefaultContext) => {
    const token = localStorage.getItem('token');
    console.log('Current Token:', token); // Debug
    console.log(DefaultContext)
    
    if (DefaultContext?.requiresAuth && token) {
      return {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      };
    }

    return {}
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const link = ApolloLink.from([authLink, splitLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;