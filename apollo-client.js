import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/evelynnmimijae/web3rsvp-graph",
  cache: new InMemoryCache(),
});

export default client;