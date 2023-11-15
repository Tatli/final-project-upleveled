'use client';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { Listing } from '../../util/types';

const getUserListingsWithCategoryName = gql`
  query UserListings($userId: ID!) {
    userListingsWithCategoryName(id: $userId) {
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
    }
  }
`;

export default function UserListings() {
  const userId = 1;

  const { data, error } = useSuspenseQuery<Listing>(
    getUserListingsWithCategoryName,
    {
      variables: { userId },
    },
  );

  const userListings: Listing[] = data.userListingsWithCategoryName;
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
    console.log('------ map end ------');
  });

  console.log(userListings);
  return (
    <>
      {userListings.map((listing) => {
        return (
          <div key={`listing-id-${listing.id}`} className="grid grid-cols-2">
            <div className="col-span-1 m-4">
              <CldImage
                width="960"
                height="600"
                src={listing.image}
                sizes="100vw"
                alt="Description of my image"
              />
            </div>
            <div className="col-span-1 m-4">
              <h3>{listing.title}</h3>
              <p>Price: {listing.price}</p>
              <p>Description: {listing.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
