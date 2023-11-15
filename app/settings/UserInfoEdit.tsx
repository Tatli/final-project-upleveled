import { gql, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { useState } from 'react';
import { Role, User } from '../../util/types';

const getRoles = gql`
  query GetRoles {
    roles {
      id
      name
    }
  }
`;

const getRoleById = gql`
  query GetRoleById($roleId: ID!) {
    role(id: $roleId) {
      id
      name
    }
  }
`;

const updateUserById = gql`
  mutation UpdateUserById(
    $id: ID!
    $username: String
    $firstName: String
    $lastName: String
    $birthDate: Date
    $address: String
    $postalCode: String
    $city: String
    $country: String
    $email: String
    $passwordHash: String
    $phone: String
    $roleId: Int
  ) {
    updateUserById(
      id: $id
      username: $username
      firstName: $firstName
      lastName: $lastName
      birthDate: $birthDate
      address: $address
      postalCode: $postalCode
      city: $city
      country: $country
      email: $email
      passwordHash: $passwordHash
      phone: $phone
      roleId: $roleId
    ) {
      id
      username
      firstName
      lastName
      birthDate
      address
      postalCode
      city
      country
      email
      passwordHash
      phone
      roleId
    }
  }
`;

export default function UserInfoEdit({ user }: { user: User }) {
  const formattedBirthDate = user.birthDate?.toString().split('T')[0];

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthDate, setBirthDate] = useState(formattedBirthDate);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [email, setEmail] = useState(user.email);
  const [passwordHash, setPasswordHash] = useState(user.passwordHash);
  const [phone, setPhone] = useState(user.phone);
  const [roleId, setRoleId] = useState(user.roleId); // Add Profile Type from API
  const [onError, setOnError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useSuspenseQuery<Role[]>(getRoles);
  const roles = data.roles;

  const userRoleId = user.roleId;

  const { data: dataUserRole } = useSuspenseQuery<Role>(getRoleById, {
    variables: { roleId: userRoleId },
  });

  const userRole = dataUserRole.role;

  const [handleUpdateUser] = useMutation(updateUserById, {
    variables: {
      id: user.id,
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
      roleId,
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
    <div className="col-span-5">
      <h1 className="text-3xl pb-4">Profile</h1>
      <hr />
      <br />

      <div className="form-control w-full">
        {isEditing ? (
          <>
            <h2 className="text-2xl ">User Information</h2>

            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
              className="input input-bordered w-full mb-2"
            />

            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              placeholder="New password"
              className="input input-bordered join-item w-full mb-2"
              onChange={(e) => {
                setPasswordHash(e.currentTarget.value);
              }}
            />

            <label htmlFor="profileType" className="label">
              <span className="label-text">Profile type</span>
            </label>
            <select
              id="profileType"
              className="select select-bordered w-full mb-2"
              value={roleId}
              onChange={(e) => {
                setRoleId(parseInt(e.currentTarget.value));
              }}
            >
              {roles.map((role) => {
                return (
                  <option key={`role-id-${role.id}`} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </select>

            {/* Personal Information */}
            <h2 className="text-2xl mt-4">Personal Information</h2>
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
              <span className="label-text">Birth Date</span>
            </label>
            <input
              id="birthDate"
              value={birthDate}
              type="date"
              placeholder="Birth Date"
              onChange={(e) => {
                setBirthDate(e.currentTarget.value);
              }}
              className="input input-bordered w-full mb-2"
            />
            {/* Contact Information */}
            <h2 className="text-2xl mt-4">Contact Information</h2>
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="your@email.xyz"
              className="input input-bordered join-item w-full mb-2"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />

            <label htmlFor="phone" className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              value={phone}
              id="phone"
              placeholder="06XX 123 456 78"
              className="input input-bordered w-full mb-2"
              onChange={(e) => {
                setPhone(e.currentTarget.value);
              }}
            />

            {/* ### Address ### */}
            <h2 className="text-2xl mt-4">Address</h2>
            <label htmlFor="address" className="label">
              <span className="label-text">Street</span>
            </label>
            <input
              value={address}
              id="address"
              placeholder="Street Name 1/2"
              className="input input-bordered w-full mb-2"
              onChange={(e) => {
                setAddress(e.currentTarget.value);
              }}
            />

            <label htmlFor="city" className="label">
              <span className="label-text">City</span>
            </label>
            <input
              value={city}
              id="city"
              placeholder="City"
              className="input input-bordered w-full mb-2"
              onChange={(e) => {
                setCity(e.currentTarget.value);
              }}
            />

            <label htmlFor="country" className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              value={country}
              id="country"
              placeholder="Last name"
              className="input input-bordered w-full mb-2"
              onChange={(e) => {
                setCountry(e.currentTarget.value);
              }}
            />

            <label htmlFor="postalCode" className="label">
              <span className="label-text">Postal code</span>
            </label>
            <input
              value={postalCode}
              id="postalCode"
              placeholder="Postal code"
              className="input input-bordered w-full mb-2"
              onChange={(e) => {
                setPostalCode(e.currentTarget.value);
              }}
            />
          </>
        ) : (
          <>
            {/* User Information */}
            <h2 className="text-2xl ">User Information</h2>
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              value={username}
              // placeholder="Username"
              className="input input-bordered w-full mb-2"
              disabled
            />

            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              placeholder="Password"
              className="input input-bordered join-item w-full mb-2"
              disabled
            />

            <label htmlFor="profileType" className="label">
              <span className="label-text">Profile type</span>
            </label>
            <input
              id="profileType"
              value={userRole.name}
              // placeholder="Username"
              className="input input-bordered w-full mb-2"
              disabled
            />

            {/* Personal Information */}
            <h2 className="text-2xl mt-4">Personal Information</h2>

            <label htmlFor="firstName" className="label">
              <span className="label-text">First name</span>
            </label>
            <input
              id="firstName"
              value={firstName}
              placeholder="First name"
              className="input input-bordered w-full mb-2"
              disabled
            />

            <label htmlFor="lastName" className="label">
              <span className="label-text">Last name</span>
            </label>
            <input
              id="lastName"
              value={lastName}
              placeholder="Last name"
              className="input input-bordered w-full mb-2"
              disabled
            />

            <label htmlFor="birthDate" className="label">
              <span className="label-text">Birth Date</span>
            </label>
            <input
              id="birthDate"
              value={birthDate}
              type="date"
              placeholder="Last name"
              className="input input-bordered w-full mb-2"
              disabled
            />

            {/* Contact Information */}
            <h2 className="text-2xl mt-4">Contact Information</h2>

            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              value={email}
              placeholder="your@mail.xyz"
              className="input input-bordered w-full mb-2"
              disabled
            />

            <label htmlFor="phone" className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              id="birthDate"
              value={phone}
              placeholder="Phone number"
              className="input input-bordered w-full mb-2"
              disabled
            />

            {/* ### Address ### */}
            <h2 className="text-2xl mt-4">Address</h2>

            <label htmlFor="address" className="label">
              <span className="label-text">Street</span>
            </label>
            <input
              id="address"
              value={address}
              placeholder="Street Name 1/2"
              className="input input-bordered w-full mb-2"
              disabled
            />

            <label htmlFor="city" className="label">
              <span className="label-text">City</span>
            </label>
            <input
              id="city"
              value={city}
              placeholder="City"
              className="input input-bordered w-full mb-2"
              disabled
            />
            <label htmlFor="country" className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              id="country"
              value={country}
              placeholder="Country"
              className="input input-bordered w-full mb-2"
              disabled
            />
            <label htmlFor="postalCode" className="label">
              <span className="label-text">Postal code</span>
            </label>
            <input
              id="postalCode"
              value={postalCode}
              placeholder="City"
              className="input input-bordered w-full mb-2"
              disabled
            />
          </>
        )}

        {isEditing ? (
          <button
            className="btn btn-outline btn-success mt-2"
            onClick={async () => {
              await setIsEditing(false);
              await handleUpdateUser();
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="btn btn-outline mt-2"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
        <p className="text-error">{onError}</p>

        {/* <button className="btn btn-primary my-4">Save</button> */}
      </div>
    </div>
  );
}
