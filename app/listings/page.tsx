import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { getClient } from '../../util/apolloClient';
import { checkLogin } from '../../util/auth';
import DisplayUserListings from '../components/DisplayUserListings';

export default async function Listings() {
  const sessionToken = cookies().get('sessionToken')?.value;

  const loggedInUser =
    sessionToken &&
    (await checkLogin(sessionToken).catch((error) => {
      console.log(error);
    }));

  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <h1 className="text-2xl mx-auto">Your Listings</h1>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <DisplayUserListings loggedInUserId={loggedInUser?.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
