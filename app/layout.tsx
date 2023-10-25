import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApolloClientProvider } from './ApolloClientProvider';
// import SmallFooterWithLogoLeft from './components/footer/chackraui/SmallFooterWithLogoLeft';
// import NavWithAction from './components/layout/navheader/chakraui/NavWithAction';
import Navbar from './components/layout/navheader/daisyui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secondhand',
  description: 'Find Secondhand Treasures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ChakraProvider> */}
        {/* <NavWithAction /> */}
        <Navbar />

        <div className=" mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </div>

        {/* <div>{children}</div> */}
        {/* <SmallFooterWithLogoLeft /> */}
        {/* </ChakraProvider> */}
      </body>
    </html>
  );
}
