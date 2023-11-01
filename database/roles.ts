import { cache } from 'react';
import { Role } from '../migrations/00000-createTableRoles';
import { sql } from './connect';

export const getRoles = cache(async () => {
  const roles = await sql<Role[]>`
    SELECT * FROM roles
 `;
  return roles;
});

export const createRole = cache(async (name: string) => {
  const [role] = await sql<Role[]>`
      INSERT INTO roles
        (name)
      VALUES
        (${name})
      RETURNING *
    `;

  return role;
});

export const updateRoleById = cache(async (id: number, name: string) => {
  const [role] = await sql<Role[]>`
      UPDATE roles
      SET
       name = ${name},
        -- Add fields
      WHERE
        id = ${id}
        RETURNING *
    `;

  return role;
});

export const deleteRoleById = cache(async (id: number) => {
  const [role] = await sql<Role[]>`
    DELETE FROM
      roles
    WHERE
      id = ${id}
    RETURNING *
  `;
  return role;
});
