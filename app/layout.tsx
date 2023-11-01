import './globals.css';
import { gql } from '@apollo/client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getClient } from '../util/apolloClient';
import { LogoutButton } from './(auth)/logout/LogoutButton';
import { ApolloClientProvider } from './ApolloClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secondhand',
  description: 'Find Secondhand Treasures.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fakeSessionToken = cookies().get('fakeSession');
  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($username: String!) {
        loggedInUserByUsername(username: $username) {
          id
          username
        }
      }
    `,
    variables: {
      username: fakeSessionToken?.value || '',
    },
  });
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link className="btn btn-ghost normal-case text-xl" href="/">
                Secondhand
              </Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link className={`px-8`} href="/#">
                    Create new listing
                  </Link>
                </li>
                <li>
                  <Link href="/categories">Categories</Link>
                </li>
                {data.loggedInUserByUsername?.username ? (
                  <li>
                    <LogoutButton />
                  </li>
                ) : (
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                )}
                <li className="pr-5">
                  <Link href="/register">Register</Link>
                </li>

                {data.loggedInUserByUsername?.username ? (
                  <li>
                    <details>
                      <summary className="mx-2">
                        {data.loggedInUserByUsername.username}
                      </summary>
                      <ul className="bg-base-100 z-10">
                        <li>
                          <Link href="/settings">View Profile</Link>
                        </li>
                        <li>
                          <Link href="/offers">Offers</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className=" mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </div>
      </body>
    </html>
  );
}
