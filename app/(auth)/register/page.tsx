import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './RegisterForm';

export default function Register() {
  // If there is a session already, route to home
  const sessionToken = cookies().get('sessionToken');
  if (sessionToken?.value) {
    console.log('Session token found. Redirecting to home path "/" ');
    redirect('/');
  }
  return <RegisterForm />;
}
