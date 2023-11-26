import { gql, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import React, { use, useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
    $password: String
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
      password: $password
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

const updateUserImageByUserId = gql`
  mutation UpdateUserImageByUserId($id: ID!, $image: String!) {
    updateUserImageByUserId(id: $id, image: $image) {
      id
      image
    }
  }
`;

export default function UserInfoEdit({ user }: { user: User }) {
  const formattedBirthDate = user.birthDate?.toString().split('T')[0];

  console.log('user.image inside UserInfoEdit', user.image);

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthDate, setBirthDate] = useState(formattedBirthDate);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(user.phone);
  const [roleId, setRoleId] = useState(user.roleId);
  const [onError, setOnError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (user.image === null || !user.image) {
      setImage('users/default-avatar');
    } else {
      setImage(user.image);
    }
  }, []);

  const userRoleId = user.roleId;

  const { data } = useSuspenseQuery<Role[]>(getRoles);
  const roles = data.roles;

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
      password,
      phone,
      roleId,
    },

    onError: (error) => {
      setOnError(error.message);
      toast.warn(error.message);
      return;
    },

    onCompleted: async () => {
      setOnError('');
      setPassword('');
      toast.success(' Profile updated successfully');
      // await refetch();
    },
  });

  const [handleUpdateUserImageByUserId] = useMutation(updateUserImageByUserId, {
    variables: {
      id: user.id,
      image,
    },

    onError: (error) => {
      setOnError(error.message);
      return;
    },

    onCompleted: async () => {
      console.log(image);
      setOnError('');
      toast.success('Image updated successfully');
      // await refetch();
    },
  });

  return (
    <div className="grid grid-cols-12 pt-16">
      <div className="sm:col-span-12 md:col-span-2 col-span-2 mx-8">
        <h1 className="text-3xl pb-4">Settings</h1>
        <hr />
        <br />
        <div className="text-primary sm:hidden md:block ">Profile</div>
      </div>
      <div className="sm:col-span-12 md:col-span-6 mx-8">
        <h1 className="text-3xl pb-4">Profile</h1>
        <hr />
        <br />

        <form
          className="form-control w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            await setIsEditing(false);
            await handleUpdateUser();
          }}
        >
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
                type="password"
                placeholder="New password"
                className="input input-bordered join-item w-full mb-2"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
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
                placeholder="Country"
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
            <>
              <button className="btn btn-outline btn-success mt-2">Save</button>
              <button
                className="btn btn-outline mt-2"
                onClick={(e) => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline mt-2"
              onClick={(e) => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>
          )}
          <p className="text-error">{onError}</p>

          {/* <button className="btn btn-primary my-4">Save</button> */}
        </form>
      </div>

      <div className="sm:col-span-12 md:col-span-4 mx-8">
        <h2 className="text-2xl mb-4 sm:mt-8">Profile picture</h2>

        <div className="flex flex-col justify-center">
          <CldImage
            className="mx-auto mb-4"
            src={image}
            width={200}
            height={361}
            alt={`Picture of the user ${user.username}`}
          />
          <CldUploadButton
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold w-full mx-auto mb-2 py-2"
            onError={(error) => {
              console.log(error);
            }}
            onSuccess={async (result) => {
              if (
                typeof result.info === 'object' &&
                'public_id' in result.info &&
                result.info.public_id
              ) {
                console.log('inside: ', result.info.public_id.toString());
                setImage(result.info.public_id.toString());
                console.log('image inside cld upload onSuccess: ', image);
              }
            }}
            uploadPreset="uwugz2aw"
          />
          <button
            className="btn btn-primary text-white font-bold px-4 w-full mx-auto"
            onClick={async () => {
              await handleUpdateUserImageByUserId();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
