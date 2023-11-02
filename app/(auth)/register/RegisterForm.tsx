'use client';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const registerMutation = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(username: $username, password_hash: $password, email: $email) {
      id
      username
      email
    }
  }
`;

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [onError, setOnError] = useState('');
  const router = useRouter();

  const [registerHandler] = useMutation(registerMutation, {
    variables: {
      username,
      password,
      email,
    },

    onError: (error) => {
      console.log('username in onError: ', username);
      console.log('password in onError: ', password);
      console.log('email in onError: ', email);
      setOnError(error.message);
    },

    onCompleted: () => {
      // This might not be needed
      console.log('onCompleted in registerHandler in RegisterForm');
      console.log('username in onCompleted: ', username);
      console.log('password in onCompleted: ', password);
      console.log('email in onCompleted: ', email);
      router.refresh();
    },
  });
  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>
          username
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
        </label>

        <br />

        <label>
          password
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>

        <br />

        <label>
          email
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
          />
        </label>

        <button
          onClick={async () => {
            await registerHandler();
          }}
        >
          Register
        </button>
      </div>
      <div className="error">{onError}</div>
      {onError ===
      'duplicate key value violates unique constraint "users_username_key"' ? (
        <div>Username already taken</div>
      ) : (
        false
      )}
    </div>
  );
}
