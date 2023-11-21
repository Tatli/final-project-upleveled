import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`INSERT INTO status
    (name)
    VALUES
    ('Active'),
    ('Sold'),
    ('Inactive'),
    ('Expired')
`;
}

export async function down(sql: Sql) {
  await sql`DELETE FROM status`;
}
