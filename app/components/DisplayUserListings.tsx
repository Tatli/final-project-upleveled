'use client';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React from 'react';
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

export default function UserListings(loggedInUserId: number) {
  const userId = loggedInUserId.loggedInUserId;
  const router = useRouter();

  const { data, error } = useSuspenseQuery<Listing>(
    getUserListingsByUserIdJoined,
    {
      variables: { userId },
    },
  );

  const userListings: Listing[] = data.userListingsByUserIdJoined;
  console.log('userListings, ', userListings);

  userListings.map((listing) => {
    console.log('------ map start ------');
    console.log('listing.id', listing.id);
    console.log('listing.title', listing.title);
    console.log('listing.price', listing.price);
    console.log('listing.description', listing.description);
    console.log('listing.image', listing.image);
    console.log('listing.categoryId', listing.categoryId);
    console.log('listing.categoryName', listing.categoryName);
    console.log('listing.username', listing.username);
    console.log('listing.statusName', listing.statusName);
    console.log('------ map end ------');
  });

  // const handleEditClick = (listingId: number) => {
  //   router.push(`/listing/${listingId}`);
  // };

  console.log(userListings);
  return (
    <>
      {userListings.map((listing) => {
        return (
          <div
            key={`listing-id-${listing.id}`}
            className="grid grid-cols-2 border border-primary min-h-360"
          >
            <div className="col-span-1 m-4 ">
              <CldImage
                className=""
                width="960"
                height="600"
                src={listing.image}
                sizes="100vw"
                alt="Description of my image"
              />
            </div>
            <div className="col-span-1 mt-4">
              <h3 className="text-lg font-bold">{listing.title}</h3>
              <p className="mb-2 font-medium">${listing.price}</p>
              {listing.statusName === 'Active' ? (
                <p>🟢 {listing.statusName}</p>
              ) : (
                <p>🔴 {listing.statusName}</p>
              )}

              <p className="mb-2">👁 {listing.views}</p>
              <p>Listing ID: {listing.id}</p>
            </div>
            <div className="col-span-2 m-2">
              <a href={`/listings/${listing.id}`}>Edit</a>
              <button
                className="btn btn-outline mx-2"
                // onClick={() => handleEditClick(listing.id)}
              >
                Edit
              </button>
              <button className="btn btn-outline mx-2">Delete</button>
            </div>
          </div>
        );
      })}
    </>
  );
}
