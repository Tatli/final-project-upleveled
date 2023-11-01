import { Sql } from 'postgres';

export type Role = {
  name: string;
};

export async function up(sql: Sql) {
  await sql`CREATE TABLE roles (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
);
`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE roles;`;
}
