import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  // This is for the local GraphQL endpoint
  const link = new HttpLink({
    uri: 'https://upleveled-final-project-tatli.fly.dev/api/graphql',
    // uri: 'http://localhost:3000/api/graphql',
    // uri: '/api/graphql',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(
    'process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI inside apolloClient: ',
    process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
});
