// app/dashboard/page.tsx
'use client';

import { useAuth } from '../../lib/authContext';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserProfile } from '../../types/models';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // No profile found, create default profile
          const defaultProfile: UserProfile = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            xp: 0,
            streak: 0,
          };
          setProfile(defaultProfile);
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login first.</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.displayName}!</p>
      {profile ? (
        <>
          <p>XP: {profile.xp}</p>
          <p>Streak: {profile.streak} days</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </main>
  );
}
