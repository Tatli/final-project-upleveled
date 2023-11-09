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

  // const { roleData } = await getClient().query({
  //   query: gql`
  //     query role($id: ID!) {
  //       role(id: $id) {
  //         id
  //         name
  //       }
  //     }
  //   `,
  //   variables: {
  //     id: user.id || '',
  //   },
  // });

  return <AdminDashboard userId={user.id} />;
}
