import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './RegisterForm';

export default function Register() {
  // If there is a session already, route to home
  const fakeSessionToken = cookies().get('fakeSession');
  if (fakeSessionToken?.value) {
    console.log('Session token found. Redirecting to home path "/" ');
    redirect('/');
  }
  return (
    <div className="flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}
