// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '../../lib/authContext';

export default function Navbar() {
  const { user, loading, logout, signInWithGoogle } = useAuth();

  return (
    <nav style={{ padding: 16, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
      <Link href="/" style={{ fontWeight: 'bold' }}>
  Myanmar English Learn
</Link>


      {!loading && (
        <>
          {user ? (
            <>
              <span>Hi, {user.displayName}</span>
              <button style={{ marginLeft: 12 }} onClick={() => logout()}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => signInWithGoogle()}>Login with Google</button>
          )}
        </>
      )}
    </nav>
  );
}
