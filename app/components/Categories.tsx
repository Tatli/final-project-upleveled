'use client';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Category } from '../../migrations/00001-createTableCategories';
import SingleCategory from './SingleCategory';

const getAllCategoriesQuery = gql`
  query Categories {
    categories {
      id
      name
      image
    }
  }
`;

export default function Categories() {
  const { data, loading, error } = useQuery(getAllCategoriesQuery);

  if (loading)
    return <div className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const categories: Category[] = data.categories;

  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <h1 className="text-center text-3xl mt-6">Categories</h1>
      <div className="grid grid-cols-10 pt-4">
        {categories.map((category: Category) => {
          return (
            <SingleCategory
              key={`category-id-${category.id}`}
              id={category.id}
              name={category.name}
              publicId={category.image}
            />
          );
        })}
      </div>
      <Link className="btn btn-info" href="/categories/admin">
        Manage Categories
      </Link>
    </section>
  );
}
