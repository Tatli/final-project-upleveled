import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
CREATE TABLE categories (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    image VARCHAR(255)
);
`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE categories;
  `;
}
