'use client';
import { getCldImageUrl } from 'next-cloudinary';
import Link from 'next/link';
import React from 'react';

export default function SingleCategory({
  id,
  name,
  publicId,
}: {
  id: number;
  name: string;
  publicId: string;
}) {
  const url = getCldImageUrl({
    width: 1024,
    height: 1024,
    src: publicId,
  });

  // console.log('name inside SingleCategory', name);
  // console.log('publicId inside SingleCategory', publicId);

  return (
    <Link href={`/categories/${id}`} className="col-span-2 m-2 text-center">
      <img src={url} alt={name} />

      <span>{name}</span>
    </Link>
  );
}
