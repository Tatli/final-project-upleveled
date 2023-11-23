import { Sql } from 'postgres';

export async function up(sql: Sql) {
  // Assuming the roles table already has entries and 'Private' role has id=1

  await sql`
    INSERT INTO users
      (username, first_name, last_name, birth_date, address, postal_code, city, country, email, password_hash, phone, image, role_id)
    VALUES
      ('lucifer', 'Luci', 'Fer', '1980-01-01', '666 Hell Street', '66666', 'Underworld', 'Hell', 'lucifer@example.com', 'asdf', '666-6666666', 'users/default-avatar', 1)
  `;
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM users
  `;
}
