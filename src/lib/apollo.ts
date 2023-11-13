import { ApolloClient, InMemoryCache } from '@apollo/client';
import { graphqlServer } from './server';

const apolloClient = new ApolloClient({
  uri: graphqlServer,
  cache: new InMemoryCache(),
});

export default apolloClient;
