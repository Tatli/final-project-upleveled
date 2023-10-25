import { cache } from 'react';
import { Category } from '../migrations/00001-createTableCategories';
import { sql } from './connect';

export const getCategories = cache(async () => {
  const categories = await sql<Category[]>`
    SELECT * FROM categories
 `;
  return categories;
});

export const createCategory = cache(async (name: string, image: string) => {
  const [category] = await sql<Category[]>`
      INSERT INTO categories
        (name, image)
      VALUES
        (${name}, ${image})
      RETURNING *
    `;

  return category;
});

export const getCategoryById = cache(async (id: number) => {
  const [category] = await sql<Category[]>`
    SELECT
      *
    FROM
      categories
    WHERE
      id = ${id}
  `;
  return category;
});

export const updateCategoryById = cache(async (id: number, name: string) => {
  const [category] = await sql<Category[]>`
      UPDATE categories
      SET
       name = ${name},
        -- Add fields
      WHERE
        id = ${id}
        RETURNING *
    `;

  return category;
});

export const deleteCategoryById = cache(async (id: number) => {
  const [category] = await sql<Category[]>`
    DELETE FROM
      categories
    WHERE
      id = ${id}
    RETURNING *
  `;
  return category;
});
