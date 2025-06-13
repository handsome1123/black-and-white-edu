'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 w-full mb-4" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </div>
  );
}
