'use client';
import { gql, useQuery } from '@apollo/client';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import React from 'react';
import { Listing } from '../../util/types';

const getListingsSortedByCreatedAt = gql`
  query GetListingsSortedByCreatedAt {
    getListingsSortedByCreatedAt {
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
    }
  }
`;

export default function DisplayNewestListings() {
  // Fetch all sorted listings
  const { data, loading, error } = useQuery(getListingsSortedByCreatedAt);

  if (loading) {
    return <div>loading listings...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>There are no listings to be displayed</div>;
  } else {
    const newestListings = data.getListingsSortedByCreatedAt;
    console.log('newestListings from DisplayNewestListings: ', newestListings);

    return (
      <div>
        <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
          <h1 className="text-center sm:text-2xl md:text-3xl lg:text-5xl mb-6 mt-10">
            Newest listings:
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {newestListings.map((listing: Listing) => {
              return (
                <div
                  className="m-4 hover:shadow-xl"
                  key={`listing-id-${listing.id}`}
                >
                  <div
                    className="m-4 mx-auto"
                    id={listing.id}
                    name={listing.title}
                  >
                    <div className="avatar">
                      <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2 ml-2">
                        <CldImage
                          width="300"
                          height="150"
                          src={listing.userImage}
                          sizes="100vw"
                          alt={listing.title}
                        />
                      </div>
                      {listing.username}
                    </div>
                    <Link href={`/${listing.id}`}>
                      <CldImage
                        width="300"
                        height="150"
                        src={listing.image}
                        sizes="100vw"
                        alt={listing.title}
                      />
                      <p className="text-lg font-medium">{listing.title} </p>
                      <p>$ {listing.price}</p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
