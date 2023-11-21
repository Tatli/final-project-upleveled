'use client';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const registerMutation = gql`
  mutation Register(
    $username: String!
    $password: String!
    $email: String!
    $image: String!
  ) {
    register(
      username: $username
      passwordHash: $password
      email: $email
      image: $image
    ) {
      id
      username
      email
      image
    }
  }
`;

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('users/default-avatar');
  const [onError, setOnError] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [acceptAgreements, setAcceptAgreements] = useState(false);
  const [onCompleted, setOnCompleted] = useState('');
  const router = useRouter();

  const [registerHandler] = useMutation(registerMutation, {
    variables: {
      username,
      password,
      email,
      image,
    },

    onError: (error) => {
      console.log('username in onError: ', username);
      console.log('password in onError: ', password);
      console.log('email in onError: ', email);
      console.log('image in onError: ', image);
      console.log('error: ', error.message);
      setOnError(error.message);
    },

    onCompleted: () => {
      // This might not be needed
      console.log('onCompleted in registerHandler in RegisterForm');
      console.log('username in onCompleted: ', username);
      console.log('password in onCompleted: ', password);
      console.log('email in onCompleted: ', email);
      console.log('image in onCompleted: ', email);
      setOnCompleted(onCompleted.message);
      router.refresh();
    },
  });
  return (
    <div className="grid grid-cols-12 pt-16">
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />

      <div className="sm:col-span-10 xl:col-span-8 2xl:col-span-6">
        <h1 className="text-5xl pb-4">Register</h1>
        <hr />
        <br />
        <div className="form-control w-full">
          <label>
            <span className="label-text font-medium text-base">Username</span>
            <input
              className="input input-bordered w-full"
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <label className="label-text">
            <span className="font-medium text-base">Password</span>
            <input
              className="input input-bordered w-full"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
            />
          </label>
          <br />
          <label className="label-text">
            <span className="font-medium text-base">Email</span>
            <input
              className="input input-bordered w-full"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
            />
          </label>
          <div className="flex flex-col align-baseline mt-1">
            <div>
              <label className="cursor-pointer">
                <input
                  className="checkbox checkbox-primary mt-2"
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.currentTarget.checked)}
                />
                <span className="label-text mb-1 ml-1">
                  Sign up for Newsletter
                </span>
              </label>
            </div>
            <div>
              <label className="cursor-pointer">
                <input
                  className="checkbox checkbox-primary mt-2"
                  type="checkbox"
                  checked={acceptAgreements}
                  onChange={(e) => setAcceptAgreements(e.currentTarget.checked)}
                />
                <span className="label-text mb-1 ml-1">
                  By continuing, I agree to the Firsthand Account{' '}
                  <Link
                    className="text-primary hover:text-primary-focus"
                    href="/register"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    className="text-primary hover:text-primary-focus"
                    href="/register"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary my-4 text-white"
            onClick={async () => {
              await registerHandler();
            }}
          >
            Register
          </button>
        </div>
        Already have a user?{' '}
        <Link className="text-primary hover:text-primary-focus" href="/login">
          Login here
        </Link>
        {onError ? (
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{onError}</span>
          </div>
        ) : (
          <div className="error">{onError}</div>
        )}
        {onCompleted ? (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your signup has been completed!</span>
          </div>
        ) : (
          <div className="success">{onCompleted}</div>
        )}
      </div>
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />
    </div>
  );
}
