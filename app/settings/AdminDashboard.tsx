'use client';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useQuery } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { User } from '../../util/types';
import UserInfoEdit from './UserInfoEdit';

const getUser = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      firstName
      lastName
      birthDate
      address
      postalCode
      city
      country
      email
      passwordHash
      phone
      image
      roleId
    }
  }
`;

export default function AdminDashboard({ userId }: { userId: string }) {
  console.log('userId inside AdminDashboard: ', userId);

  const { data, loading, error } = useQuery(getUser, {
    variables: { userId },
  });

  if (loading) return <div className="col-span-4">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user: User = data.user;
  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <ToastContainer />
      <UserInfoEdit user={user} />
    </section>
  );
}
