import { gql } from '@apollo/client';
// import Price from '../components/newlisting/tailwindui/Price';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClient } from '../../util/apolloClient';
import { checkLogin } from '../../util/auth';
import CreateNewListing from '../components/CreateNewListing';

export default async function Settings() {
  const sessionToken = cookies().get('sessionToken')?.value;

  const loggedInUser =
    sessionToken &&
    (await checkLogin(sessionToken).catch((error) => {
      console.log(error);
    }));

  if (!loggedInUser) {
    redirect('/login');
  }

  const loggedInUserId: number = loggedInUser?.id;
  return (
    <div className="grid grid-cols-12 pt-16">
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />

      <CreateNewListing loggedInUserId={loggedInUserId} />

      <div className="mt-24 sm:col-span-1 xl:col-span-2 2xl:col-span-3" />
    </div>
  );
}
