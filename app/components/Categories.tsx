'use client';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Category } from '../../util/types';
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
    <div>
      <h1 className="text-center sm:text-3xl md:text-4xl lg:text-5xl my-6">
        Categories
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
    </div>
  );
}
