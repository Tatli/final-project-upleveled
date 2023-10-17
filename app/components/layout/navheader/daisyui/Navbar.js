import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Secondhand
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li className="pr-5">
            <Link href="/register">Register</Link>
          </li>
          <li>
            <details>
              <summary className="mx-2">Username</summary>
              <ul className="bg-base-100 z-10">
                <li>
                  <Link href="/profile">View Profile</Link>
                </li>
                <li>
                  <Link href="/offers">Offers</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
