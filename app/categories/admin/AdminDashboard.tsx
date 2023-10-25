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

// const deleteCategoryByIdMutation = gql`
//   mutation DeleteCategoryById($id: ID!) {
//     deleteCategoryById(id: $id) {
//       id
//     }
//   }
// `;

// const getCategories = gql`
//   query GetCategories {
//     categories {
//       id
//       name
//       image
//     }
//   }
// `;

// const updateCategoryByIdMutation = gql`
//   mutation UpdateCategory(
//     $id: ID!
//     $nameOnEditInput: String!
//     $imageOnEditInput: String!
//   ) {
//     updateCategoryById(
//       id: $id
//       name: $nameOnEditInput
//       image: $imageOnEditInput
//     ) {
//       id
//       name
//       image
//     }
//   }
// `;

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [onError, setOnError] = useState('');
  // const [nameOnEditInput, setNameOnEditInput] = useState('');
  // const [imageOnEditInput, setImageOnEditInput] = useState('');
  // const [onEditId, setOnEditId] = useState<number | undefined>();

  // const { data, refetch } = useSuspenseQuery<CategoryResponse>(getCategories);

  const [createCategoryHandler] = useMutation(createCategory, {
    variables: {
      name,
      image,
    },

    onError: (error) => {
      setOnError(error.message);
    },

    onCompleted: () => {
      setOnError('');
      setImage('');
      setName('');
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
          onChange={(event) => {
            setImage(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <button onClick={async () => await createCategoryHandler()}>
        Create Category
      </button>
      <br />
      <br />
      <hr />
      <br />
    </div>
  );

  // const [deleteCategoryMutationHandler] = useMutation(
  //   deleteCategoryByIdMutation,
  //   {
  //     onError: (error) => {
  //       setOnError(error.message);
  //     },

  //     onCompleted: async () => {
  //       setOnError('');
  //       await refetch();
  //     },
  //   },
  // );

  // const [handleUpdateCategory] = useMutation(updateCategoryByIdMutation, {
  //   variables: {
  //     id: onEditId,
  //     nameOnEditInput,
  //     imageOnEditInput,
  //   },

  //   onError: (error) => {
  //     setOnError(error.message);
  //     return;
  //   },

  //   onCompleted: async () => {
  //     setOnError('');
  //     await refetch();
  //   },
  // });

  // return (
  //   <div>
  //     AdminDashboard
  //     <br />
  //     <label>
  //       Category Name
  //       <input
  //         value={name}
  //         onChange={(event) => {
  //           setName(event.currentTarget.value);
  //         }}
  //       />
  //     </label>
  //     <br />
  //     <label>
  //       Image
  //       <input
  //         value={image}
  //         onChange={(event) => {
  //           setImage(event.currentTarget.value);
  //         }}
  //       />
  //     </label>
  //     <br />
  //     <br />
  //     <button onClick={async () => await createCategoryHandler()}>
  //       Create Category
  //     </button>
  //     <br />
  //     <br />
  //     <hr />
  //     <br />
  //     {data.categories.map((category) => {
  //       const isEditing = onEditId === category.id;
  //       return (
  //         <div key={`category-div-${category.id}`} className="categoryAdmin">
  //           {isEditing ? (
  //             <input
  //               value={nameOnEditInput}
  //               onChange={(event) => {
  //                 setNameOnEditInput(event.currentTarget.value);
  //               }}
  //             />
  //           ) : (
  //             <span>{category.name}</span>
  //           )}
  //           {isEditing ? (
  //             <input
  //               value={imageOnEditInput}
  //               onChange={(event) => {
  //                 setImageOnEditInput(event.currentTarget.value);
  //               }}
  //             />
  //           ) : (
  //             <span>{category.image}</span>
  //           )}

  //           <button
  //             onClick={async () => {
  //               await deleteCategoryMutationHandler({
  //                 variables: {
  //                   id: category.id,
  //                 },
  //               });
  //             }}
  //           >
  //             X
  //           </button>

  //           {isEditing ? (
  //             <button
  //               onClick={async () => {
  //                 await handleUpdateCategory();
  //                 setOnEditId(undefined);
  //               }}
  //             >
  //               Save
  //             </button>
  //           ) : (
  //             <button
  //               onClick={() => {
  //                 setOnEditId(category.id);
  //                 setNameOnEditInput(category.name);
  //                 // setAccessoryOnEditInput(category.accessory || '');
  //                 setImageOnEditInput(category.image);
  //               }}
  //             >
  //               Edit
  //             </button>
  //           )}
  //         </div>
  //       );
  //     })}
  //     <p className="error">{onError}</p>
  //   </div>
  // );
}
