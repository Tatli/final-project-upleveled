import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClient } from '../../util/apolloClient';
import AdminDashboard from './AdminDashboard';

export default async function Settings() {
  // const [profileType, setProfileType] = useState('private');
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

  const user = data.loggedInUserByUsername;
  console.log('data', data);
  console.log('user.username', user.username);
  console.log('data.loggedInUserByUsername', data.loggedInUserByUsername);

  return <AdminDashboard />;
}
