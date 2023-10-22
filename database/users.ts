import { cache } from 'react';
import { User } from '../migrations/00003-createTableUsers';
import { sql } from './connect';

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
  async (firstName: string, type: string, accessory: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (first_name, type, accessory)
      VALUES
        (${firstName}, ${type}, ${accessory})
      RETURNING *
    `;

    return user;
  },
);

export const updateUserById = cache(
  async (id: number, firstName: string, type: string, accessory: string) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        type = ${type},
        accessory = ${accessory}
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

export const getUserByFirstName = cache(async (firstName: string) => {
  if (!firstName) {
    return undefined;
  }

  const [user] = await sql<User[]>`
      SELECT
        *
      FROM
        users
      WHERE
        first_name = ${firstName}
  `;
  return user;
});
