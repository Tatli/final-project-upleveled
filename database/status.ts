import { cache } from 'react';
import { Role, Status } from '../util/types';
import { sql } from './connect';

export const getStatuses = cache(async () => {
  const status = await sql<Status[]>`
    SELECT * FROM status
 `;
  return status;
});

// export const getRoleById = cache(async (id: number) => {
//   const [role] = await sql<Role[]>`
//       SELECT
//       *
//     FROM
//       roles
//     WHERE
//       id = ${id}
//   `;

//   return role;
// });

// export const createRole = cache(async (name: string) => {
//   const [role] = await sql<Role[]>`
//       INSERT INTO roles
//         (name)
//       VALUES
//         (${name})
//       RETURNING *
//     `;

//   return role;
// });

// export const updateRoleById = cache(async (id: number, name: string) => {
//   const [role] = await sql<Role[]>`
//       UPDATE roles
//       SET
//        name = ${name},
//         -- Add fields
//       WHERE
//         id = ${id}
//         RETURNING *
//     `;

//   return role;
// });

// export const deleteRoleById = cache(async (id: number) => {
//   const [role] = await sql<Role[]>`
//     DELETE FROM
//       roles
//     WHERE
//       id = ${id}
//     RETURNING *
//   `;
//   return role;
// });
