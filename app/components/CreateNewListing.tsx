'use client';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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

const getUser = gql`
  query User($loggedInUserId: ID!) {
    user(id: $loggedInUserId) {
      id
      username
      email
      address
      postalCode
      city
      country
      phone
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
  const [image, setImage] = useState('listings/default-listing-placeholder');
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
      toast.warn(error.message);
      return;
    },

    onCompleted: async () => {
      setOnError('');
      setTitle('');
      setPrice(0);
      setCategoryId(0);
      setDescription('');
      setImage('listings/default-listing-placeholder');
      toast.success('Listing created successfully');
      router.refresh();
    },
  });

  const { data, loading, error } = useQuery(getUser, {
    variables: { loggedInUserId },
  });

  if (loading) {
    <div>User information loading...</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }

  return (
    <div className="sm:col-span-10 xl:col-span-8 2xl:col-span-6">
      <ToastContainer />
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
          <span className="label-text font-medium text-base ">Price</span>
        </label>
        <div className="join">
          <button className="btn join-item rounded-r-full ">$</button>
          <input
            value={price}
            type="number"
            id="price"
            min={1}
            className="input input-bordered sm:w-full lg:w-1/2 2xl:w-1/3 mb-2"
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
        <CldImage
          width="300"
          height="150"
          src={image}
          sizes="100vw"
          alt="Description of my image"
        />
        <CldUploadButton
          className="btn btn-primary text-white font-bold py-2 px-4 sm:w-full md:w-2/4 lg:w-1/4 xl:w-2/6 2xl:w-1/6 "
          onError={(error) => {
            console.log(error);
          }}
          onSuccess={(result) => {
            if (
              typeof result.info === 'object' &&
              'public_id' in result.info &&
              result.info.public_id
            ) {
              setImage(result.info.public_id.toString());
            }
          }}
          uploadPreset="uwugz2aw"
        />
        <span className="text-sm text-slate-500">
          ℹ Images help potential customers better imagine your product
        </span>

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
