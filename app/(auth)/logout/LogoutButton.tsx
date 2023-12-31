'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        formAction={async () => {
          await logout();
          router.push('/login');
        }}
      >
        Logout
      </button>
    </form>
  );
}
