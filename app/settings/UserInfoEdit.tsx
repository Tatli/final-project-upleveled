import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { User } from '../../util/types';

const updateUserById = gql`
  mutation UpdateUserById(
    $id: ID!
    $usernameOnEditInput: String!
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

export default function UserInfoEdit(
  { userId }: { userId: string },
  { user }: { user: User },
) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [phone, setPhone] = useState('');
  const [onError, setOnError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [handleUpdateUser] = useMutation(updateUserById, {
    variables: {
      id: userId,
      username,
      firstName,
      lastName,
      birthDate,
      address,
      postalCode,
      city,
      country,
      email,
      passwordHash,
      phone,
    },

    onError: (error) => {
      setOnError(error.message);
      return;
    },

    onCompleted: async () => {
      setOnError('');
      // await refetch();
    },
  });
  return (
    <div className="form-control w-full">
      {isEditing ? (
        <>
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            id="userName"
            value={username}
            // placeholder="Username"
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="firstName" className="label">
            <span className="label-text">First name</span>
          </label>
          <input
            id="firstName"
            value={firstName}
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="lastName" className="label">
            <span className="label-text">Last name</span>
          </label>
          <input
            id="lastName"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
            className="input input-bordered w-full mb-2"
          />

          <label htmlFor="birthDate" className="label">
            <span className="label-text">Birth date</span>
          </label>
          <input
            id="birthDate"
            value={birthDate}
            type="date"
            placeholder="Last name"
            onChange={(e) => {
              setBirthDate(e.currentTarget.value);
            }}
            className="input input-bordered w-full mb-2"
          />
        </>
      ) : (
        <>
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <span id="username" className="ml-2 label-text">
            {data.user.username}
          </span>

          <label htmlFor="firstName" className="label">
            <span className="label-text">First name</span>
          </label>
          <span id="firstName" className="ml-2 label-text">
            {data.user.firstName}
          </span>

          <label htmlFor="lastName" className="label">
            <span className="label-text">Last name</span>
          </label>
          <span id="lastName" className="ml-2 label-text">
            {data.user.lastName}
          </span>

          <label htmlFor="birthDate" className="label">
            <span className="label-text">Birth date</span>
          </label>
          <span id="birthDate" className="ml-2 label-text">
            {data.user.birthDate}
          </span>
        </>
      )}

      {isEditing ? (
        <button
          className="btn btn-outline btn-success"
          onClick={async () => {
            await setIsEditing(false);
            console.log(`Saving username. Value in input field: ${username}`);
          }}
        >
          Save
        </button>
      ) : (
        <button
          className="btn btn-outline"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}

      {/* ### Address ### */}
      <h2 className="text-2xl my-2">Address</h2>
      <label htmlFor="street" className="label">
        <span className="label-text">Street</span>
      </label>
      <input
        id="street"
        placeholder="Street"
        className="input input-bordered w-full mb-2"
      />
      <label htmlFor="city" className="label">
        <span className="label-text">City</span>
      </label>
      <input
        id="city"
        placeholder="City"
        className="input input-bordered w-full mb-2"
      />
      <label htmlFor="country" className="label">
        <span className="label-text">Country</span>
      </label>
      <input
        id="country"
        placeholder="Last name"
        className="input input-bordered w-full mb-2"
      />
      <label htmlFor="postalCode" className="label">
        <span className="label-text">Postal code</span>
      </label>
      <input
        id="postalCode"
        placeholder="Postal code"
        className="input input-bordered w-full mb-2"
      />
      <h2 className="text-2xl my-2">Private information</h2>
      <label htmlFor="email" className="label">
        <span className="label-text">Email</span>
      </label>
      <div className="join">
        <input
          id="email"
          type="email"
          value={email}
          placeholder="your@email.xyz"
          className="input input-bordered join-item w-full mb-2"
        />
        <button className="btn join-item rounded-r-full">Change</button>
      </div>

      <label htmlFor="password" className="label">
        <span className="label-text">Password</span>
      </label>
      <div className="join">
        <input
          id="password"
          type="password"
          placeholder="password"
          className="input input-bordered join-item w-full mb-2"
        />
        <button className="btn join-item rounded-r-full">Change</button>
      </div>

      <label htmlFor="phone" className="label">
        <span className="label-text">Phone</span>
      </label>
      <input
        id="phone"
        placeholder="06XX 123 456 78"
        className="input input-bordered w-full mb-2"
      />
      <button className="btn btn-primary my-4">Save</button>
    </div>
  );
}
