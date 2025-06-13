// app/page.tsx
'use client';

import { useAuth } from '../lib/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to Myanmar English Learning App</h1>
      <p>Please log in to start learning English.</p>
      <a href="/courses">Go to Courses</a>
    </main>
  );
}
