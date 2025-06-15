'use client';

import { AuthProvider, useAuth } from '../../context/AuthContext';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

export default function AuthPage() {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: 20 }}>
      {!user ? (
        <>
          <h1>Please sign in</h1>
          <button
            onClick={handleLogin}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              cursor: 'pointer',
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#4285F4',
              color: 'white',
            }}
          >
            Sign in with Google
          </button>
        </>
      ) : (
        <>
          <h1>Welcome, {user.displayName}</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              cursor: 'pointer',
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#EA4335',
              color: 'white',
            }}
          >
            Logout
          </button>
        </>
      )}
    </main>
  );
}
