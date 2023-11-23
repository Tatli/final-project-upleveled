import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClient } from '../../util/apolloClient';
import { checkLogin } from '../../util/auth';
import AdminDashboard from './AdminDashboard';

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

  return <AdminDashboard userId={loggedInUser.id} />;
}
