'use client';
import { gql, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useState } from 'react';
import { CategoryResponse } from '../page';

const createCategory = gql`
  mutation CreateCategory($name: String!, $image: String!) {
    createCategory(name: $name, image: $image) {
      id
      name
      image
    }
  }
`;

const deleteCategoryById = gql`
  mutation DeleteCategoryById($id: ID!) {
    deleteCategoryById(id: $id) {
      id
    }
  }
`;

const getCategories = gql`
  query GetCategories {
    categories {
      id
      name
      image
    }
  }
`;

const updateCategoryById = gql`
  mutation UpdateCategoryById(
    $id: ID!
    $nameOnEditInput: String!
    $imageOnEditInput: String!
  ) {
    updateCategoryById(
      id: $id
      name: $nameOnEditInput
      image: $imageOnEditInput
    ) {
      id
      name
      image
    }
  }
`;

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [onError, setOnError] = useState('');
  const [nameOnEditInput, setNameOnEditInput] = useState('');
  const [imageOnEditInput, setImageOnEditInput] = useState('');
  const [onEditId, setOnEditId] = useState<number | undefined>();

  const { data, refetch } = useSuspenseQuery<CategoryResponse>(getCategories);

  const [handleCreateCategory] = useMutation(createCategory, {
    variables: {
      name,
      image,
    },

    onError: (error) => {
      setOnError(error.message);
    },

    onCompleted: async () => {
      setOnError('');
      setImage('');
      setName('');
      await refetch();
    },
  });

  const [handleUpdateCategory] = useMutation(updateCategoryById, {
    variables: {
      id: onEditId,
      nameOnEditInput,
      imageOnEditInput,
    },

    onError: (error) => {
      setOnError(error.message);
      return;
    },

    onCompleted: async () => {
      setOnError('');
      await refetch();
    },
  });

  const [handleDeleteCategory] = useMutation(deleteCategoryById, {
    onError: (error) => {
      setOnError(error.message);
    },

    onCompleted: async () => {
      setOnError('');
      await refetch();
    },
  });

  return (
    <div>
      AdminDashboard
      <br />
      <label>
        Category Name
        <input
          value={name}
          className="input input-bordered"
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Image
        <input
          value={image}
          className="input input-bordered"
          onChange={(event) => {
            setImage(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <button
        className="btn btn-primary"
        onClick={async () => await handleCreateCategory()}
      >
        Create Category
      </button>
      <br />
      <br />
      <hr />
      <br />
      {data.categories.map((category) => {
        const isEditing = onEditId === category.id;
        return (
          <div key={`category-id-${category.id}`} className="mb-2">
            {isEditing ? (
              <input
                className="input rounded-full bg-neutral-50	text-slate-700"
                value={onEditId}
                onChange={(e) => {
                  setOnEditId(parseInt(e.currentTarget.value));
                }}
              />
            ) : (
              <p>ID: {category.id}</p>
            )}
            {isEditing ? (
              <input
                className="input rounded-full bg-neutral-50	text-slate-700"
                value={nameOnEditInput}
                onChange={(e) => {
                  setNameOnEditInput(e.currentTarget.value);
                }}
              />
            ) : (
              <p>Name: {category.name}</p>
            )}
            {isEditing ? (
              <input
                className="input rounded-full bg-neutral-50	text-slate-700"
                value={imageOnEditInput}
                onChange={(e) => {
                  setImageOnEditInput(e.currentTarget.value);
                }}
              />
            ) : (
              <p>Image URL:{category.image}</p>
            )}

            <button
              className="btn py-2 px-4 border border-gray-400 border-b-4rounded shadow"
              onClick={async () => {
                await handleDeleteCategory({
                  variables: {
                    id: category.id,
                  },
                });
              }}
            >
              Delete
            </button>

            {isEditing ? (
              <button
                onClick={async () => {
                  await handleUpdateCategory();
                  setOnEditId(undefined);
                }}
              >
                {' '}
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setOnEditId(category.id);
                  setNameOnEditInput(category.name);
                  setImageOnEditInput(category.image);
                }}
              >
                Edit
              </button>
            )}
          </div>
        );
      })}
      <p className="text-error">{onError}</p>
    </div>
  );
}
