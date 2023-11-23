import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
// import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CategoryResponse } from '../../util/types';
import Categories from '../components/Categories';

// export type LoggedInUserResponse = {
//   id: number;
//   username: string;
// };

export default async function CategoriesPage() {
  // const sessionToken = cookies().get('sessionToken');

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
  //     username: sessionToken?.value || '',
  //   },
  // });

  // if (!user.loggedInUserByUsername) {
  //   redirect('/login');
  // }

  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <Categories />
    </section>
  );
}
