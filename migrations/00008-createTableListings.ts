import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
CREATE TABLE listings (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    price integer NOT NULL,
    image VARCHAR(255) ,
    description TEXT NOT NULL,
    views integer DEFAULT 0,
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW(),
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    category_id integer REFERENCES categories(id) ON DELETE SET NULL,
    status_id integer DEFAULT 1 REFERENCES status(id) ON DELETE SET NULL
);
`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE listings;
  `;
}
