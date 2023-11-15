import { gql } from '@apollo/client';
// import Price from '../components/newlisting/tailwindui/Price';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClient } from '../../util/apolloClient';
import CreateNewListing from '../components/CreateNewListing';

export default async function Settings() {
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

  if (!data.loggedInUserByUsername) {
    redirect('/login');
  }

  const loggedInUserId: number = data.loggedInUserByUsername.id;
  return (
    <div className="grid grid-cols-12 pt-16">
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />

      <CreateNewListing loggedInUserId={loggedInUserId} />

      <div className="mt-24 sm:col-span-1 xl:col-span-2 2xl:col-span-3" />
    </div>
  );
}
