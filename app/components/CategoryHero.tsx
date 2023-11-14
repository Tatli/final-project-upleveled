'use client';

import { getCldImageUrl } from 'next-cloudinary';
import React from 'react';

export default function CategoryHero({
  id,
  name,
  publicId,
}: {
  id: number;
  name: string;
  publicId: string;
}) {
  const url = getCldImageUrl({
    width: 512,
    height: 512,
    src: publicId,
  });

  return (
    <>
      {/* <section>
        <div className="flex flex-col justify-center align-baseline py-15 bg-[url('https://images.pexels.com/photos/6069544/pexels-photo-6069544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] text-white overflow-hidden h-96 min-h-96 max-h-96 bg-center	bg-no-repeat bg-cover">
          <div className="flex justify-center">
            <h1 className="text-5xl mb-6">{data.category.name}</h1>
          </div>
        </div>
      </section>
      <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
        <div>
          <h1 className={`text-3xl`}>Category info:</h1>
          <br />
          <p className="badge badge-outline">Category ID: {data.category.id}</p>
          <h2 className={`text-2xl`}>Category name: {data.category.name}</h2>
          <p>Image URL: {data.category.image}</p>
        </div>
      </section> */}
    </>
  );
}
