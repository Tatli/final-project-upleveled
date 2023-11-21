'use client';
import { gql, useQuery } from '@apollo/client';
import { CldImage, CldOgImage } from 'next-cloudinary';
import Link from 'next/link';
import { Listing } from '../../util/types';

const getActiveListingsByCategoryIdSortedByCreatedAt = gql`
  query GetActiveListingsByCategoryIdSortedByCreatedAt($categoryId: ID!) {
    getActiveListingsByCategoryIdSortedByCreatedAt(id: $categoryId) {
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

export default function DisplayListingsPerCategory({
  categoryId,
}: {
  categoryId: number;
}) {
  const { data, loading, error } = useQuery(
    getActiveListingsByCategoryIdSortedByCreatedAt,
    {
      variables: { categoryId },
    },
  );

  if (loading) {
    return <div>loading category listings...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  console.log('data inside DisplayListingsPerCategory: ', data);
  const listingsOfCategorySortedByCreatedAt =
    data.getActiveListingsByCategoryIdSortedByCreatedAt;
  return (
    <>
      <h1 className="text-center sm:text-2xl md:text-3xl lg:text-5xl mb-6 mt-10">
        Newest listings:
      </h1>{' '}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {listingsOfCategorySortedByCreatedAt.map((listing: Listing) => {
          return (
            <div className="m-4" key={`listing-id-${listing.id}`}>
              <div className="border-4 m-2 mx-auto border-white hover:border-primary rounded-md">
                <div
                  className="m-4 mx-auto"
                  id={listing.id}
                  name={listing.title}
                >
                  <div className="avatar">
                    <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2 ml-2">
                      <CldImage
                        className="w-full"
                        width="400"
                        height="200"
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
                    <p>{listing.title} </p>
                    <p>$ {listing.price}</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
