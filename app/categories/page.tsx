import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
// import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getClient } from '../../util/apolloClient';

// export type LoggedInUserResponse = {
//   id: number;
//   username: string;
// };

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

  // const fakeSessionToken = cookies().get('fakeSession');

  // const { user } = await getClient().query<LoggedInUserResponse>({
  //   query: gql`
  //     query LoggedInUser($username: String!) {
  //       loggedInUserByUsername(username: $username) {
  //         id
  //         username
  //       }
  //     }
  //   `,
  //   variables: {
  //     username: fakeSessionToken?.value || '',
  //   },
  // });

  // if (!user.loggedInUserByUsername) {
  //   redirect('/login');
  // }

  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <Link className="btn btn-info" href="/categories/admin">
        Manage Categories
      </Link>

      <br />
      <br />

      <h1 className="text-2xl">Categories</h1>

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
    </section>
  );
}
