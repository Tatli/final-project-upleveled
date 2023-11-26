'use client';
import { gql, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import React, { useState } from 'react';
import { Listing } from '../../util/types';

const getUserListingsByUserIdJoined = gql`
  query UserListings($userId: ID!) {
    userListingsByUserIdJoined(id: $userId) {
      id
      title
      price
      description
      image
      views
      createdAt
      updatedAt
      userId
      categoryId
      categoryName
      statusId
      username
      statusName
    }
  }
`;

const deleteListingById = gql`
  mutation DeleteListingById($id: ID!) {
    deleteListingById(id: $id) {
      id
      image
    }
  }
`;

function renderListingStatus(status) {
  switch (status) {
    case 'Active':
      return <div>🟢 Active</div>;
    case 'Sold':
      return <div>🔴 Sold</div>;
    case 'Inactive':
      return <div>⚫ Inactive</div>;
    default:
      return <div>Status Unknown</div>;
  }
}

export default function UserListings({
  loggedInUserId,
}: {
  loggedInUserId: number;
}) {
  const [onError, setOnError] = useState('');
  const userId = loggedInUserId;

  const { data, error, refetch } = useSuspenseQuery<Listing>(
    getUserListingsByUserIdJoined,
    {
      variables: { userId },
    },
  );

  const userListings: Listing[] = data.userListingsByUserIdJoined;

  const [handleDeleteListingById] = useMutation(deleteListingById, {
    onError: (error) => {
      setOnError(error.message);
    },
    onCompleted: async () => {
      setOnError('');
      await refetch();
    },
  });

  const handleDeleteClick = async (listingId) => {
    await handleDeleteListingById({
      variables: {
        id: listingId,
      },
    });
  };

  if (!userListings || userListings.length === 0) {
    return (
      <div>
        <p>Nothing to see here...</p>
        <Link
          className="underline text-primary hover:text-primary visited:text-secondary"
          href="/newlisting"
        >
          Create a new listing here!
        </Link>
      </div>
    );
  }

  return (
    <>
      {userListings.map((listing) => {
        return (
          <div
            key={`listing-id-${listing.id}`}
            className="grid grid-cols-2 border border-primary min-h-360 m-2 p-2"
          >
            <div className="col-span-1 m-4">
              <CldImage
                className=""
                width="300"
                height="130"
                src={listing.image}
                sizes="100vw"
                alt="Description of my image"
              />
            </div>
            <div className="col-span-1 mt-4">
              <h3 className="text-lg font-bold">{listing.title}</h3>
              <p className="mb-2 font-medium">${listing.price}</p>
              {renderListingStatus(listing.statusName)}
              <p className="mb-2">👁 {listing.views}</p>
              <p>Created on:</p>
              <p>
                {new Date(listing.createdAt).toLocaleDateString('de-DE')}
                {' at '}
                {new Date(listing.createdAt).toLocaleTimeString('de-DE')}
              </p>
              <p>Last updated on:</p>
              <p>
                {new Date(listing.updatedAt).toLocaleDateString('de-DE')}
                {' at '}
                {new Date(listing.updatedAt).toLocaleTimeString('de-DE')}
              </p>
            </div>
            <div className="col-span-2 m-2">
              <Link
                className="btn btn-outline mx-2"
                href={`/listings/${listing.id}`}
              >
                Edit
              </Link>

              <button
                className="btn btn-outline mx-2"
                onClick={() => handleDeleteClick(listing.id)}
              >
                Delete
              </button>
            </div>
            <p className="text-sm font-light">Listing ID: {listing.id}</p>
          </div>
        );
      })}
    </>
  );
}
