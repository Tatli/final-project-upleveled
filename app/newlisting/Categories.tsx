'use client';
import { gql, useSuspenseQuery } from '@apollo/client';
import React from 'react';
import { CategoriesProps, CategoryResponse } from '../../util/types';

const getCategories = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export default function Categories({
  categoryId,
  setCategoryId,
}: CategoriesProps) {
  const { data } = useSuspenseQuery<CategoryResponse>(getCategories);
  // console.log('data: ', data);
  const categories = data.categories;
  // console.log('categories: ', categories);

  // console.log('Props: categoryId: ', categoryId);

  return (
    <>
      <button
        className="btn btn-primary text-white w-1/2"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        Show Categories
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Categories</h3>
          <p className="py-3">Please choose a category:</p>
          {categories.map((category) => {
            return (
              <div
                className="flex align-baseline py-1"
                key={`category-id-${category.id}`}
              >
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary mr-2"
                  onChange={(e) => {
                    console.log(
                      `Category inside dialog with id ${category.id} has been checked`,
                    );
                    setCategoryId(parseInt(category.id));
                    console.log(`Value inside categoryId: `, categoryId);
                  }}
                />
                <span>{category.name}</span>
              </div>
            );
          })}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
