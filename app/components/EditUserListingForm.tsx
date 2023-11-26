import 'react-toastify/dist/ReactToastify.css';
import { ApolloQueryResult, gql, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Listing, Status } from '../../util/types';
import CategoriesDialog from './CategoriesDialog';
import { EditUserListingContext } from './EditUserListing';

const getStatuses = gql`
  query GetStatuses {
    getStatuses {
      id
      name
    }
  }
`;

const updateListingById = gql`
  mutation UpdateListingById(
    $id: ID!
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $updatedAt: Date
    $categoryId: Int
    $statusId: Int
  ) {
    updateListingById(
      id: $id
      title: $title
      price: $price
      description: $description
      image: $image
      updatedAt: $updatedAt
      categoryId: $categoryId
      statusId: $statusId
    ) {
      id
      title
      price
      image
      description
      views
      createdAt
      updatedAt
      userId
      statusId
      categoryId
      categoryName
      username
      statusName
    }
  }
`;

const updateListingImageByListingId = gql`
  mutation UpdateListingImageByListingId($id: ID!, $image: String!) {
    updateListingImageByListingId(id: $id, image: $image) {
      id
      image
    }
  }
`;

function renderListingStatus(status) {
  switch (status) {
    case 'Active':
      return <p>🟢 Active</p>;
    case 'Sold':
      return <p>🔴 Sold</p>;
    case 'Inactive':
      return <p>⚫ Inactive</p>;
    default:
      return <p>Status Unknown</p>;
  }
}

export default function EditUserListingForm({ listing }: { listing: Listing }) {
  const [title, setTitle] = useState(listing.title || '');
  const [price, setPrice] = useState(listing.price);
  const [description, setDescription] = useState(listing.description);
  const [image, setImage] = useState(listing.image);
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString());
  const [statusId, setStatusId] = useState(listing.statusId);
  const [categoryId, setCategoryId] = useState(listing.categoryId);
  const [categoryName, setCategoryName] = useState(listing.categoryName);
  const [onError, setOnError] = useState('');

  const { data: dataStatuses } = useSuspenseQuery<Status[]>(getStatuses);
  const statuses = dataStatuses.getStatuses;

  const { refetch } = useContext(EditUserListingContext);
  const notify = () => toast('Wow so easy!');

  const [handleUpdateListingImageByListingId] = useMutation(
    updateListingImageByListingId,
    {
      variables: {
        id: listing.id,
        image,
      },

      onError: (error) => {
        setOnError(error.message);
        return;
      },

      onCompleted: async () => {
        setOnError('');
        toast.success('Listing image updated successfully');
        await refetch();
      },
    },
  );

  const [handleUpdateListing] = useMutation(updateListingById, {
    variables: {
      id: listing.id,
      title,
      price,
      description,
      image,
      updatedAt,
      categoryId,
      statusId,
    },

    onError: (error) => {
      setOnError(error.message);
      toast.warn(error.message);
      return;
    },

    onCompleted: async () => {
      setOnError('');
      toast.success('Listing updated successfully');
      await refetch();
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="form-control w-full gap-1">
        {/* Title */}
        <label htmlFor="title">
          <span className="label-text font-bold text-base">Title</span>
        </label>
        <input
          value={title}
          id="title"
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="input input-bordered w-full"
        />
        <span className="text-sm text-slate-500 mb-2">
          ℹ A meaningful title helps searchers find your ad faster and increases
          your chances of making a sale.
        </span>
        {/* Price */}
        <label htmlFor="price">
          <span className="label-text font-bold text-base">Price</span>
        </label>
        <div className="join">
          <button className="btn join-item rounded-r-full ">$</button>
          <input
            value={price}
            type="number"
            id="price"
            min={1}
            className="input input-bordered w-1/3 mb-2"
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
        </div>
        {/* Category */}
        <label htmlFor="category">
          <span id="category" className="label-text font-bold text-base">
            Category
          </span>
        </label>
        <p className="text-sm font-bold">New Category: </p>
        <CategoriesDialog
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <p className="text-sm">
          <span className="font-medium">Current Category: </span>{' '}
          {listing.categoryName}
        </p>
        {/* Description */}
        <label htmlFor="description">
          <span id="description" className="label-text font-bold text-base">
            Description
          </span>
        </label>
        <textarea
          value={description}
          className="textarea textarea-primary mb-2"
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
          placeholder="e.g. dimensions, size, reasons for sale, defects/defects if any."
        />
        {/* Status */}
        <label htmlFor="description">
          <span id="description" className="label-text font-bold text-base">
            Status
          </span>
        </label>
        <p className="text-sm font-bold">New Status: </p>
        <select
          id="profileType"
          className="select select-bordered w-1/6 mb-2"
          value={statusId}
          onChange={(e) => {
            setStatusId(parseInt(e.currentTarget.value));
          }}
        >
          {statuses.map((status) => {
            return (
              <option key={`role-id-${status.id}`} value={status.id}>
                {status.name}
              </option>
            );
          })}
        </select>
        <div className="text-sm">
          <span className="font-medium">
            Current Status: {renderListingStatus(listing.statusName)}
          </span>
        </div>
        {/* Image */}
        <label htmlFor="image">
          <span className="label-text font-bold text-base ">Image</span>
        </label>
        {/* Consider scaling image relative to parent anchor element https://stackoverflow.com/questions/19192892/css-how-can-i-set-image-size-relative-to-parent-height */}
        <CldImage
          width="300"
          height="150"
          src={image}
          sizes="100vw"
          alt="Description of my image"
        />
        <CldUploadButton
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-1/4"
          onError={(error) => {
            console.log(error);
          }}
          onSuccess={async (result) => {
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
        <button
          className="btn btn-primary text-white font-bold py-2 px-4 w-1/4"
          onClick={async () => {
            await handleUpdateListingImageByListingId();
          }}
        >
          Update
        </button>
        <span className="text-sm text-slate-500">
          ℹ Images help potential customers better imagine your product
        </span>

        <button
          onClick={async () => {
            setUpdatedAt(new Date().toISOString());
            await handleUpdateListing();
          }}
          className="btn btn-primary my-4 text-white"
        >
          Save
        </button>
      </div>
    </>
  );
}
