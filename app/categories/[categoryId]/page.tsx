import { gql } from '@apollo/client';
// import Image from 'next/image';
import { getClient } from '../../../util/apolloClient';

type Props = {
  params: { categoryId: string };
};

type Category = {
  category: {
    id: number;
    name: string;
    image: string;
  };
};

export default async function CategoryPage(props: Props) {
  const { data } = await getClient().query<Category>({
    query: gql`
      query GetCategoryById($id: ID! = ${props.params.categoryId}){
        category(id: $id){
          id
          name
          image
        }
      }
    `,
  });

  return (
    <div>
      <h1 className={`text-5xl`}>Category info:</h1>
      <br />
      <h2 className={`text-3xl`}>{data.category.name}</h2>
      <p>Category ID: {data.category.id}</p>
      <p>Image URL: {data.category.image}</p>
      {/* <Image
        src={data.category.image}
        width={200}
        height={200}
        alt={data.category.name}
      /> */}
    </div>
  );
}
