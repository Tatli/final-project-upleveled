import { gql } from '@apollo/client';
// import Image from 'next/image';
import Link from 'next/link';
import { getClient } from '../../util/apolloClient';

export type CategoryResponse = {
  categories: {
    id: number;
    name: string;
    image: string;
  }[];
};

export default async function CategoriesPage() {
  const { data } = await getClient().query<CategoryResponse>({
    query: gql`
      query GetCategories {
        categories {
          id
          name
          image
        }
      }
    `,
  });

  return (
    <div>
      <Link className="btn btn-info" href="/categories/admin">
        Manage Categories
      </Link>

      <br />
      <br />

      <h1 className="text-2xl">Available categories</h1>

      <div className="gap-4">
        {data.categories.map((category) => {
          return (
            <div
              key={`category-div-${category.id}`}
              data-test-id={`category-type-${category.id}`}
            >
              <Link href={`/categories/${category.id}`}>
                <p className="badge badge-outline">{category.name}</p>{' '}
                <p className="badge badge-accent"> {category.image}</p>
                {/* <Image
                src={`${category.image}`} // To-add
                alt={category.name}
                width={200}
                height={200}
              /> */}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
