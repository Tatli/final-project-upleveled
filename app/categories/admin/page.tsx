import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClient } from '../../../util/apolloClient';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const sessionToken = cookies().get('sessionToken');

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
      username: sessionToken?.value || '',
    },
  });

  if (!data.loggedInUserByUsername) {
    redirect('/login');
  }
  return <AdminDashboard />;
}
