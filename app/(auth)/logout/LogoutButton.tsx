'use client';

import { redirect, useRouter } from 'next/navigation';
import { logout } from './action';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        formAction={async () => {
          await logout();
          redirect('/');
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
