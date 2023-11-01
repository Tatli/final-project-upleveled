'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    // Take event and make request to register endpoint

    // prevent default event
    // first thing you should when running form element
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    const data = response.json();
    console.log(
      'handleRegister()/RegisterForm.tx -> data from response.json',
      data,
    );
  }
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={async (e) => await handleRegister(e)}
    >
      <label>
        Username
        <input
          onChange={(e) => {
            setUsername(e.currentTarget.value);
          }}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
      </label>

      <button>Register</button>
    </form>
  );
}
