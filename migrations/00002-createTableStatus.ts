import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
CREATE TABLE status (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
);

`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE status;
  `;
}
