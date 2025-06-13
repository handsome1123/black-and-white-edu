// app/context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthCtx = createContext<{ user: User | null }>({ user: null });
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  return <AuthCtx.Provider value={{ user }}>{children}</AuthCtx.Provider>;
}
