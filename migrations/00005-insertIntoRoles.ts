import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`INSERT INTO roles
    (name)
    VALUES
    ('private'),
    ('commercial')
`;
}

export async function down(sql: Sql) {
  await sql`DELETE FROM roles`;
}
