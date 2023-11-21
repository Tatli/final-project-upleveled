import { cache } from 'react';
import { User } from '../util/types';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT * FROM users
 `;
  return users;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const createUser = cache(
  async (
    username: string,
    email: string,
    password_hash: string,
    image: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (username, email, password_hash, image)
      VALUES
        (${username}, ${email}, ${password_hash}, ${image})
      RETURNING *
    `;

    return user;
  },
);

export const updateUserById = cache(
  async (
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    address: string,
    postalCode: string,
    city: string,
    country: string,
    email: string,
    passwordHash: string,
    phone: string,
    roleId: number,
    image: string,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        username = ${username},
        first_name = ${firstName},
        last_name = ${lastName},
        birth_date = ${birthDate},
        address = ${address},
        postal_code = ${postalCode},
        city = ${city},
        country = ${country},
        email = ${email},
        password_hash = ${passwordHash},
        phone = ${phone},
        role_id = ${roleId},
        image = ${image}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return user;
  },
);

export const updateUserImageByUserId = cache(
  async (id: number, image: string) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        image = ${image}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return user;
  },
);

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;
  return user;
});

export const getUserByUsername = cache(async (username: string) => {
  if (!username) {
    return undefined;
  }

  const [user] = await sql<User[]>`
      SELECT
        *
      FROM
        users
      WHERE
      username = ${username}
  `;
  return user;
});

export async function isUserAdminBySessionToken(
  sessionToken: string | undefined,
) {
  // FIX: Implement sessionToken check for current logged in users username
  if (sessionToken === 'lucifer') return await true;
  return await false;
}
