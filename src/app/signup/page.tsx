'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), {
        email,
        createdAt: new Date(),
      });
      router.push('/dashboard'); // go to your protected page
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 w-full mb-4" />
      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded w-full">Sign Up</button>
    </div>
  );
}
