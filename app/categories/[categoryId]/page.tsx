import { gql } from '@apollo/client';
import { getCldImageUrl } from 'next-cloudinary';
// import Image from 'next/image';
import { getClient } from '../../../util/apolloClient';
import CategoryHero from '../../components/CategoryHero';

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

  // console.log('url', url);
  const category = data.category;
  console.log('data:', data);
  console.log('category:', category);

  const categoryImageUrl = await getCldImageUrl({
    width: 512,
    height: 512,
    src: category.image,
  });

  console.log('url: ', categoryImageUrl);

  return (
    <>
      <section>
        <div
          className={`flex flex-col justify-center align-baseline py-15 bg-[url('https://res.cloudinary.com/dxgppguic/image/upload/c_limit,w_512/f_auto/q_auto/nvp8wircfesexgiflab1?_a=BAVAExAO0')] text-white overflow-hidden h-96 min-h-96 max-h-96 bg-center	bg-no-repeat bg-cover`}
        >
          <div className="flex justify-center">
            <h1 className="text-5xl mb-6">{category.name}</h1>
          </div>
        </div>
      </section>
      <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
        <div>
          <h1 className={`text-3xl`}>Category info:</h1>
          <br />
          <p className="badge badge-outline">Category ID: {category.id}</p>
          <h2 className={`text-2xl`}>Category name: {category.name}</h2>
          <p>Image URL: {category.image}</p>
        </div>
      </section>
    </>
  );
}
