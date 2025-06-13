// app/api/auth/login/route.ts
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return NextResponse.json({ uid: userCred.user.uid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
