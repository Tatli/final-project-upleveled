'use client';
import React, { useState } from 'react';
import Categories from './Categories';

export default function Listing() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [userId, setUserId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [statusId, setStatusId] = useState(0);
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
          id="title"
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
          <input id="price" className="input input-bordered w-1/3 mb-2" />
        </div>

        <label htmlFor="category">
          <span id="category" className="label-text font-medium text-base">
            Category
          </span>
        </label>
        <Categories />
        <label htmlFor="description">
          <span id="description" className="label-text font-medium text-base">
            Description
          </span>
        </label>
        <textarea
          className="textarea textarea-primary"
          placeholder="e.g. dimensions, size, reasons for sale, defects/defects if any."
        />

        <label htmlFor="image">
          <span className="label-text font-medium text-base ">Image</span>
        </label>
        <input
          id="image"
          type="file"
          className="file-input file-input-bordered file-input-sm w-1/2 "
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
        <button className="btn btn-primary my-4 text-white">Publish</button>
      </div>
    </div>
  );
}
