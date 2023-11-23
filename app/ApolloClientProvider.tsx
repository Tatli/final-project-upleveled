'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://upleveled-final-project-tatli.fly.dev/api/graphql',
    // uri: 'http://localhost:3000/api/graphql',
    // uri: '/api/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  console.log(
    'process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI inside apolloClientProvider: ',
    process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloClientProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
