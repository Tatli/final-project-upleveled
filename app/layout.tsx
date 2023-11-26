import './globals.css';
import { gql } from '@apollo/client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getClient } from '../util/apolloClient';
import { checkLogin } from '../util/auth';
import { LogoutButton } from './(auth)/logout/LogoutButton';
import { ApolloClientProvider } from './ApolloClientProvider';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // %s is our String placeholder and will be replaced with the {title: titleName} inside of About/Products/etc
  title: { default: 'Home | Firsthand', template: '%s | Firsthand' },
  description: 'Firsthand: Rediscover the Joy of First Finds!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionToken = cookies().get('sessionToken')?.value;

  const loggedInUser =
    sessionToken &&
    (await checkLogin(sessionToken).catch((error) => {
      console.log(error);
    }));

  return (
    <html lang="en" data-theme="corporate">
      <body className={`${inter.className} `}>
        <nav>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link
                className="ml-8 border-y-4 border-white hover:border-primary border-primary normal-case text-2xl font-medium"
                href="/"
              >
                Firsthand
              </Link>
            </div>
            <div className="flex-none mr-6">
              <ul className="menu menu-horizontal mt-2 px-1">
                <li className="border-b-4 border-white hover:border-primary hover:font-medium">
                  <Link href="/newlisting">
                    <div>Create new listing</div>
                  </Link>
                </li>
                <li className="border-b-4 border-white hover:border-primary hover:font-medium">
                  <Link href="/categories">Categories</Link>
                </li>
                {loggedInUser ? (
                  <li className="border-b-4 border-white hover:border-primary hover:font-medium mr-4">
                    <LogoutButton />
                  </li>
                ) : (
                  <>
                    <li className="hover:border-b-4 border-primary hover:font-medium">
                      <Link href="/login">Login</Link>
                    </li>
                    <li className="hover:border-b-4 border-primary hover:font-medium">
                      <Link href="/register">Register</Link>
                    </li>
                  </>
                )}

                {loggedInUser ? (
                  <li className="border-b-4 border-white hover:border-primary">
                    <details>
                      <summary className="px-2">
                        {loggedInUser.username}
                      </summary>
                      <ul className="bg-base-100 z-10">
                        <li>
                          <Link href="/settings">View Profile</Link>
                        </li>
                        <li>
                          <Link href="/listings">Manage Listings</Link>
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
        {/* <div className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40"> */}
        <div className="min-h-screen">
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
