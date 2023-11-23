import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const sessionToken = cookies().get('sessionToken');

  if (sessionToken?.value) {
    redirect('/');
  }
  return <LoginForm />;
}
