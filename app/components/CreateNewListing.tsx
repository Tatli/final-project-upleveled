'use client';
import { gql, useMutation } from '@apollo/client';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CategoriesDialog from './CategoriesDialog';

const createListing = gql`
  mutation CreateListing(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $userId: Int
    $categoryId: Int
  ) {
    createListing(
      title: $title
      price: $price
      description: $description
      image: $image
      userId: $userId
      categoryId: $categoryId
    ) {
      id
      title
      price
      description
      image
      userId
      categoryId
    }
  }
`;

export default function CreateNewListing({
  loggedInUserId,
}: {
  loggedInUserId: number;
}) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [handleCreateListing] = useMutation(createListing, {
    variables: {
      title,
      price,
      description,
      image,
      userId: parseInt(loggedInUserId),
      categoryId,
    },

    onError: (error) => {
      setOnError(error.message);
      return;
    },

    onCompleted: async () => {
      setOnError('');
      router.refresh();
    },
  });

  return (
    <div className="sm:col-span-10 xl:col-span-8 2xl:col-span-6">
      <h1 className="text-5xl pb-4">Create a new listing</h1>
      <hr />
      <br />
      <h2 className="text-3xl pb-2">Listing details</h2>
      <div className="form-control w-full gap-1">
        <label htmlFor="title">
          <span className="label-text font-medium text-base">Title</span>
        </label>
        <input
          value={title}
          id="title"
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="e.g. Levi's 501 jeans, black, size 32"
          className="input input-bordered w-full mb-2"
        />
        <span className="text-sm text-slate-500">
          ℹ A meaningful title helps searchers find your ad faster and increases
          your chances of making a sale.
        </span>

        <label htmlFor="price">
          <span className="label-text font-medium text-base">Price</span>
        </label>
        <div className="join">
          <button className="btn join-item rounded-r-full ">$</button>
          <input
            value={price}
            type="number"
            id="price"
            className="input input-bordered w-1/3 mb-2"
            onChange={(e) => {
              setPrice(Number(e.target.value));
              console.log('price: ', price);
            }}
          />
        </div>

        <label htmlFor="category">
          <span id="category" className="label-text font-medium text-base">
            Category
          </span>
        </label>
        <CategoriesDialog
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <label htmlFor="description">
          <span id="description" className="label-text font-medium text-base">
            Description
          </span>
        </label>
        <textarea
          value={description}
          className="textarea textarea-primary"
          onChange={(e) => {
            setDescription(e.currentTarget.value);
            console.log('description:', description);
          }}
          placeholder="e.g. dimensions, size, reasons for sale, defects/defects if any."
        />

        <label htmlFor="image">
          <span className="label-text font-medium text-base ">Image</span>
        </label>
        <CldUploadButton
          className="btn btn-outline btn-primary text-white font-bold py-2 px-4 rounded-xl w-1/4"
          onError={(error) => {
            console.log(error);
          }}
          onSuccess={(result) => {
            if (typeof result.info === 'object' && 'public_id' in result.info) {
              const publicId: string = result.info.public_id as string;
              console.log('result.info.public_id: ', publicId);
              setImage(publicId);
            }
          }}
          uploadPreset="uwugz2aw"
        />

        <br />

        <h2 className="text-3xl my-2">Contact and place of sale</h2>

        <div className="flex gap-2 flex-col">
          <div className="grid grid-cols-2">
            <div className="col-span-1 py-2 px-1">
              <span className="font-medium text-base">Name</span>
              <p>user.firstname</p>
            </div>

            <div className="col-span-1 py-2 px-1">
              <span className="font-medium text-base">Email</span>
              <p>your@email.xyz</p>
            </div>
          </div>
          <div className="py-2 px-1">
            <span className="text-sm text-slate-500">
              ℹ You can change your name and email address in your profile
              settings
            </span>
          </div>

          <label htmlFor="country" className="label">
            <span className="label-text font-medium text-base">Country</span>
          </label>
          <select
            id="country"
            className="select select-bordered w-full max-w-xs"
          >
            <option>Austria</option>
            <option>Turkey</option>
          </select>

          <label htmlFor="street" className="label">
            <span className="label-text font-medium text-base">Street</span>
          </label>
          <input
            id="street"
            placeholder="Street name"
            className="input input-bordered w-full mb-2"
          />

          <div className="flex gap-2 ">
            <label htmlFor="postal" className="label">
              <span className="label-text font-medium text-base">
                Postal code
              </span>
            </label>
            <input
              id="postal"
              placeholder="12345"
              className="input input-bordered w-full mb-2"
            />
            <label htmlFor="location" className="label">
              <span className="label-text font-medium text-base">Location</span>
            </label>
            <input
              id="location"
              placeholder="location"
              className="input input-bordered w-full mb-2"
            />
          </div>
        </div>
        <button
          onClick={async () => {
            await handleCreateListing();
          }}
          className="btn btn-primary my-4 text-white"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
