"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">👋 Hello, {user.email}</h1>
      <p>Your progress and XP will go here (coming soon).</p>
    </div>
  );
}
