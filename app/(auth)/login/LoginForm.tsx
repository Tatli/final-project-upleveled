'use client';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password_hash: $password) {
      id
      username
      passwordHash
      email
    }
  }
`;

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [loginHandler] = useMutation(loginMutation, {
    variables: {
      username,
      password,
    },

    onError: (error) => {
      console.log('username in onError: ', username);
      console.log('password in onError: ', password);
      setOnError(error.message);
    },

    onCompleted: () => {
      // This might not be needed
      console.log('onCompleted in loginHandler in LoginForm');
      router.refresh();
    },
  });
  return (
    <div className="grid grid-cols-12 pt-16">
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />

      <div className="sm:col-span-10 xl:col-span-8 2xl:col-span-6">
        <h1 className="text-5xl pb-4">Login</h1>
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
          <div className="flex flex-row justify-between">
            <div>
              <label className="cursor-pointer">
                <input
                  className="checkbox checkbox-primary mt-2"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.currentTarget.checked)}
                />
                <span className="label-text mb-1 ml-1">Remember me</span>
              </label>
            </div>

            <div className="mt-2">
              <Link
                className="text-primary hover:text-primary-focus"
                href="/forgot"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            className="btn btn-primary my-4 text-white"
            onClick={async () => {
              await loginHandler();
            }}
          >
            Login
          </button>
        </div>
        <div className="error">{onError}</div>
        No user yet?{' '}
        <Link
          className="text-primary hover:text-primary-focus"
          href="/register"
        >
          Sign up now
        </Link>
      </div>
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />
    </div>
  );
}
