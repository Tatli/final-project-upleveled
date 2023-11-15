import { cache } from 'react';
import { Listing } from '../util/types';
import { sql } from './connect';

export const getListings = cache(async () => {
  const listings = await sql<Listing[]>`
    SELECT * FROM listings
 `;
  return listings;
});

export const getListingById = cache(async (id: number) => {
  const [listing] = await sql<Listing[]>`
    SELECT
      *
    FROM
      listings
    WHERE
      id = ${id}
  `;
  return listing;
});

export const getUserListings = cache(async (userId: number) => {
  const listings = await sql<Listing[]>`
    SELECT
      *
    FROM
      listings
    WHERE
      user_id = ${userId}
  `;
  return listings;
});

export const getUserListingsWithCategoryName = cache(async (userId: number) => {
  const listings = await sql<Listing[]>`
SELECT
  listings.*,
  categories.name AS category_name,
  users.username AS username,
  status.name AS status_name
FROM
  listings
INNER JOIN categories ON categories.id = listings.category_id
INNER JOIN users ON users.id = listings.user_id
INNER JOIN status ON status.id = listings.status_id
WHERE
  listings.user_id = ${userId};
  `;
  return listings;
});

export const createListing = cache(
  async (
    title: string,
    price: number,
    description: string,
    image: string,
    userId: number,
    categoryId: number,
  ) => {
    const [listing] = await sql<Listing[]>`
      INSERT INTO listings
        (title, price, description, image, user_id, category_id )
      VALUES
        (${title}, ${price}, ${description}, ${image}, ${userId}, ${categoryId})
      RETURNING *
    `;

    return listing;
  },
);

export const updateListingById = cache(
  async (
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    categoryId: string,
    statusId: string,
  ) => {
    const [listing] = await sql<Listing[]>`
      UPDATE listings
      SET
        title = ${title},
        price = ${price},
        description = ${description},
        image = ${image},
        categoryId = ${categoryId},
        statusId = ${statusId},
      WHERE
        id = ${id}
        RETURNING *
    `;

    return listing;
  },
);

export const deleteListingById = cache(async (id: number) => {
  const [listing] = await sql<Listing[]>`
    DELETE FROM
      listings
    WHERE
      id = ${id}
    RETURNING *
  `;
  return listing;
});

export const getListingByListingTitle = cache(async (title: string) => {
  if (!title) {
    return undefined;
  }

  const [listing] = await sql<Listing[]>`
      SELECT
        *
      FROM
        listings
      WHERE
      title = ${title}
  `;
  return listing;
});
