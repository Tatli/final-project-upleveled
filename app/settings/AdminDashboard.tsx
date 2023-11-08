'use client';
import { gql, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
    }
  }
`;

export default function AdminDashboard({ userId }: { userId: string }) {
  console.log('userId inside AdminDashboard: ', userId);

  const { data, loading, error } = useQuery(getUser, {
    variables: { userId },
  });

  // useEffect(() => {

  //   return () => {
  //     console.log('Hooks have been set');
  //   };
  // }, []);

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
        <div className="col-span-5">
          <h1 className="text-3xl pb-4">Profile</h1>
          <hr />
          <br />
          <h2 className="text-2xl pb-2">Personal Information</h2>
          <UserInfoEdit userId={userId} user={user} />
        </div>

        <div className="col-span-1" />

        <div className="col-span-4">
          <div className="flex flex-col">
            <h2 className="text-2xl mb-8">Profile picture</h2>
            <Image
              src="/images/profile/default-male.jpg"
              width={285}
              height={516}
              alt="Picture of the user"
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-4/6 mt-2"
            />
            <h2 className="text-2xl my-4">Profile type</h2>

            {/* Move this out into a client component for state management */}
            <div className="form-control">
              <div className="w-2/3">
                <label className="label cursor-pointer">
                  <span className="label-text">Private</span>
                  <input
                    type="radio"
                    name="profileType"
                    className="radio checked:bg-primary"
                  />
                </label>
              </div>
              <div className="w-2/3">
                <label className="label cursor-pointer">
                  <span className="label-text">Commercial</span>
                  <input
                    type="radio"
                    name="profileType"
                    className="radio checked:bg-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
