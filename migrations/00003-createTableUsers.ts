import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`

CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(150) ,
    last_name VARCHAR(150) ,
    birth_date DATE ,
    address VARCHAR(255) ,
    postal_code VARCHAR(50) ,
    city VARCHAR(150) ,
    country VARCHAR(150) ,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(30) ,
    image VARCHAR(255) ,
    role_id integer REFERENCES profile_type(id)
);

`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users;
  `;
}
