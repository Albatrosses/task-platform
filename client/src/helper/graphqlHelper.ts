import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export const toQuery = async (query: any) => await client.query({ query });

export const toMutation = async (mutation: any) => await client.mutate({ mutation });
