import { cache } from 'react';
import { Listing } from '../util/types';
import { sql } from './connect';

export const getListings = cache(async () => {
  const listings = await sql<Listing[]>`
    SELECT * FROM listings
 `;
  return listings;
});

export const getListingsSortedByCreatedAt = cache(async () => {
  const listings = await sql<Listing[]>`
SELECT
  listings.*,
  categories.name AS category_name,
  users.username AS username,
  users.image AS user_image,
  status.name AS status_name
FROM
  listings
INNER JOIN categories ON categories.id = listings.category_id
RIGHT JOIN users ON users.id = listings.user_id
INNER JOIN status ON status.id = listings.status_id
WHERE status.id = 1
ORDER BY created_at DESC;
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

export const getUserListingsByUserIdJoined = cache(async (userId: number) => {
  const listings = await sql<Listing[]>`
SELECT
  listings.*,
  categories.name AS category_name,
  users.username AS username,
  users.image AS user_image,
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

export const getActiveUserListingsByUserIdSortedByCreatedAtJoined = cache(
  async (userId: number) => {
    const listings = await sql<Listing[]>`
SELECT
  listings.*,
  categories.name AS category_name,
  users.username AS username,
  users.image AS user_image,
  status.name AS status_name
FROM
  listings
INNER JOIN categories ON categories.id = listings.category_id
INNER JOIN users ON users.id = listings.user_id
INNER JOIN status ON status.id = listings.status_id
WHERE
  listings.user_id = ${userId}
  AND status.id = 1;
  `;
    return listings;
  },
);

export const getUserListingByListingIdJoined = cache(
  async (listingId: number) => {
    const listing = await sql<Listing[]>`
SELECT
  listings.*,
  categories.name AS category_name,
  users.username AS username,
  users.image AS user_image,
  users.address AS user_address,
  users.postal_code AS user_postal_code,
  users.city AS user_city,
  users.country AS user_country,
  users.phone AS user_phone,
  users.registration_date AS user_registration_date,
  status.name AS status_name
FROM
  listings
INNER JOIN categories ON categories.id = listings.category_id
INNER JOIN users ON users.id = listings.user_id
INNER JOIN status ON status.id = listings.status_id
WHERE
    listings.id = ${listingId};
  `;
    return listing;
  },
);

export const getActiveListingsByCategoryIdSortedByCreatedAt = cache(
  async (categoryId: number) => {
    const listing = await sql<Listing[]>`
SELECT
  listings.*,
  categories.name AS category_name,
  users.username AS username,
  users.image AS user_image,
  users.address AS user_address,
  users.postal_code AS user_postal_code,
  users.city AS user_city,
  users.country AS user_country,
  users.phone AS user_phone,
  users.registration_date AS user_registration_date,
  status.name AS status_name
FROM
  listings
INNER JOIN categories ON categories.id = listings.category_id
INNER JOIN users ON users.id = listings.user_id
INNER JOIN status ON status.id = listings.status_id
WHERE
    listings.category_id = ${categoryId}
    AND status.id = 1;
  `;
    return listing;
  },
);

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
    updatedAt: Date,
    categoryId: number,
    statusId: number,
  ) => {
    const [listing] = await sql<Listing[]>`
      UPDATE listings
      SET
        title = ${title},
        price = ${price},
        description = ${description},
        image = ${image},
        updated_at = ${updatedAt},
        category_id = ${categoryId},
        status_id = ${statusId}
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

export const updateListingTitleById = cache(
  async (id: number, title: string) => {
    const [listing] = await sql<Listing[]>`
      UPDATE listings
      SET
      title = ${title}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return listing;
  },
);

export const updateListingImageByListingId = cache(
  async (id: number, image: string) => {
    const [listing] = await sql<Listing[]>`
      UPDATE listings
      SET
      image = ${image}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return listing;
  },
);
