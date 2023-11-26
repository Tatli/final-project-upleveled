'use server';
import { gql } from '@apollo/client';
import { getCldImageUrl } from 'next-cloudinary';
import Head from 'next/head';
// import Image from 'next/image';
import { getClient } from '../../../util/apolloClient';
import CategoryHero from '../../components/CategoryHero';
import DisplayListingsPerCategory from '../../components/DisplayListingsPerCategory';

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

  const categoryId = Number(props.params.categoryId);
  console.log('categoryId inside CategoryPage: ', categoryId);

  const category = data.category;

  const categoryImageUrl = await getCldImageUrl({
    width: 1024,
    height: 1024,
    src: category.image,
  });

  console.log('url: ', categoryImageUrl);

  const sectionStyle = {
    backgroundImage: `url('${categoryImageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '384px', // Adjust as needed
    // Other styles as required
  };

  return (
    <>
      {console.log(
        'category.name inside [categoryId] before Head: ',
        category.name,
      )}
      <Head>
        <title>{`${category.name} | Firsthand`}</title>
        <meta
          name="description"
          content={`Explore our ${category.name} listings`}
        />
      </Head>
      <section style={sectionStyle}>
        <div
          className={`flex flex-col justify-center align-baseline py-15 text-white overflow-hidden h-96 min-h-96 max-h-96`}
        >
          <div className="flex justify-center">
            <h1 className="text-5xl mb-6">{category.name}</h1>
          </div>
        </div>
      </section>
      <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
        <DisplayListingsPerCategory categoryId={categoryId} />
      </section>
    </>
  );
}
