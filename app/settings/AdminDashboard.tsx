'use client';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
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
      <div className="grid grid-cols-12 pt-16">
        <div className="col-span-1">
          <h1 className="text-3xl pb-4">Settings</h1>
          <hr />
          <br />
          <div className="text-primary">Profile</div>
        </div>
        <div className="col-span-1" />

        <UserInfoEdit user={user} />

        <div className="col-span-1" />

        <div className="col-span-4">
          <h2 className="text-2xl mb-8">Profile picture</h2>
          <div className="flex flex-col justify-center">
            <div>
              <Image
                src="/images/profile/default-male.jpg"
                width={200}
                height={361}
                alt="Picture of the user"
              />
            </div>

            <span className="label-text font-medium mb-1">Upload picture</span>

            <input
              id="image"
              type="file"
              className="file-input file-input-bordered file-input-sm w-4/6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
