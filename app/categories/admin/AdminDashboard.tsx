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
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <div>
        <h1 className="text-4xl mb-4">Admin dashboard</h1>
        <hr />
        <br />
        <h2 className="text-3xl pb-2">Create a new category</h2>

        <label>
          <span className="font-medium text-base">Category Name</span>
          <input
            value={name}
            className="input input-bordered w-full mb-2"
            onChange={(event) => {
              setName(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          <span className="label-text font-medium text-base">Image URL</span>
          <input
            value={image}
            className="input input-bordered w-full mb-2"
            onChange={(event) => {
              setImage(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <button
          className="btn btn-neutral"
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
                <div>
                  <label className="font-medium text-base" htmlFor="categoryId">
                    ID
                  </label>
                  <input
                    id="categoryId"
                    className="input input-bordered w-full mb-2"
                    value={onEditId}
                    onChange={(e) => {
                      setOnEditId(parseInt(e.currentTarget.value));
                    }}
                  />
                </div>
              ) : (
                <p>ID: {category.id}</p>
              )}
              {isEditing ? (
                <div>
                  <label
                    className="font-medium text-base"
                    htmlFor="categoryName"
                  >
                    Name
                  </label>
                  <input
                    id="categoryName"
                    className="input input-bordered w-full mb-2"
                    value={nameOnEditInput}
                    onChange={(e) => {
                      setNameOnEditInput(e.currentTarget.value);
                    }}
                  />
                </div>
              ) : (
                <p>Name: {category.name}</p>
              )}
              {isEditing ? (
                <div>
                  <label
                    className="font-medium text-base"
                    htmlFor="categoryImage"
                  >
                    Image URL
                  </label>
                  <input
                    id="categoryImage"
                    className="input input-bordered w-full mb-2"
                    value={imageOnEditInput}
                    onChange={(e) => {
                      setImageOnEditInput(e.currentTarget.value);
                    }}
                  />
                </div>
              ) : (
                <p>Image URL:{category.image}</p>
              )}
              <div>
                <button
                  className="btn btn-outline btn-error"
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

                <div className="flex flex-row gap-3">
                  {isEditing ? (
                    <button
                      className="btn btn-outline btn-success"
                      onClick={async () => {
                        await handleUpdateCategory();
                        setOnEditId(undefined);
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline"
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
              </div>
            </div>
          );
        })}
        <p className="text-error">{onError}</p>
      </div>
    </section>
  );
}
