import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import LoginForm from './LoginForm';

export function generateMetadata() {
  return {
    title: `Login`,
    description: `Login page`,
  };
}

export default function LoginPage() {
  const sessionToken = cookies().get('sessionToken');

  if (sessionToken?.value) {
    redirect('/');
  }
  return <LoginForm />;
}
