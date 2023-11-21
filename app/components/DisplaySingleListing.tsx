'use client';

import { gql, useQuery } from '@apollo/client';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import React from 'react';

export default function DisplaySingleListing({
  listingId,
}: {
  listingId: number;
}) {
  console.log('listingId inside DisplaySingleListing: ', listingId);
  const numericalListingId = Number(listingId);
  console.log('listingId inside DisplaySingleListing: ', listingId);

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
        userImage
        userAddress
        userPostalCode
        userCity
        userCountry
        userPhone
        userRegistrationDate
      }
    }
  `;

  const { data, loading, error, refetch } = useQuery(
    getUserListingByListingIdJoined,
    {
      variables: { listingId },
    },
  );

  if (loading) {
    return <div>Listing loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  console.log('data inside DisplaySingleListing: ', data);
  const listing = data.userListingByListingIdJoined[0];
  console.log('listing inside DisplaySingleListing: ', listing);

  const joinDate = new Date(listing.userRegistrationDate);
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    // day: 'numeric',
  };
  const formattedJoinDate = joinDate.toLocaleDateString('en-US', options);
  console.log('formattedJoinDate: ', formattedJoinDate);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-1" />
      <div className="col-span-7">
        <Link
          href={`/categories/${listing.categoryId}`}
          className="font-light text-sm"
        >
          {listing.categoryName}
        </Link>
        <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
        <CldImage
          width="600"
          height="300"
          src={listing.image}
          sizes="100vw"
          alt={listing.title}
          className="mx-auto"
        />
        <p className="font-medium mt-4">Description</p>
        <p>{listing.description}</p>
      </div>

      <div className="col-span-3 ml-8 mt-20 mb-20">
        <p className="text-2xl font-bold">${listing.price}</p>
        <p className="font-light text-xs mb-4">selling price</p>
        <hr />
        <div className="avatar mt-4">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2">
            <CldImage
              width="300"
              height="150"
              src={listing.userImage}
              sizes="100vw"
              alt={listing.title}
            />
          </div>
          <p className="text-lg font-bold">{listing.username}</p>
        </div>
        <p className="text-sm font-light mb-4">
          user since {formattedJoinDate}
        </p>
        <p className="mb-4">
          {listing.userPostalCode} {listing.userCity}, {listing.userCountry}
        </p>
        <button className="btn btn-primary text-white font-bold py-2 px-4 w-full mb-4">
          Contact
        </button>
        <button className="btn btn-outline btn-primary font-bold py-2 px-4 w-full mb-4">
          More from {listing.username}
        </button>
      </div>
      <div className="col-span-1" />
    </div>
  );
}
