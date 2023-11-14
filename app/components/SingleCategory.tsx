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
    width: 512,
    height: 512,
    src: publicId,
  });

  return (
    <Link href={`/categories/${id}`} className="col-span-2 m-2 text-center">
      <img
        className="border-4 border-white hover:border-primary rounded-md"
        src={url}
        alt={name}
      />

      <span>{name}</span>
    </Link>
  );
}
