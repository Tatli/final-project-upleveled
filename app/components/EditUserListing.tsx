'use client';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { createContext, useState } from 'react';
import { Listing } from '../../util/types';
import EditUserListingForm from './EditUserListingForm';

const getUserListingByListingIdJoined = gql`
  query UserListingByListingIdJoined($listingId: ID!) {
    userListingByListingIdJoined(id: $listingId) {
      id
      title
      price
      image
      description
      views
      createdAt
      updatedAt
      userId
      statusId
      categoryId
      categoryName
      username
      statusName
    }
  }
`;

const EditUserListingContext = createContext({ refetch: () => {} });

export default function EditUserListing({ listingId }: { listingId: number }) {
  const { data, refetch } = useSuspenseQuery<Listing>(
    getUserListingByListingIdJoined,
    {
      variables: { listingId },
    },
  );

  const listing: Listing = data.userListingByListingIdJoined[0];

  return (
    <EditUserListingContext.Provider value={{ refetch }}>
      <div className="sm:col-span-10 xl:col-span-8 2xl:col-span-6">
        <h1 className="text-5xl pb-4">Edit Listing</h1>
        <hr />
        <br />
        <h2 className="text-3xl pb-2">Listing details</h2>
        <EditUserListingForm listing={listing} />
      </div>
    </EditUserListingContext.Provider>
  );
}
export { EditUserListingContext };
