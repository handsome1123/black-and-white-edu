// app/api/auth/signup/route.ts
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      createdAt: new Date(),
    });

    return NextResponse.json({ uid: userCred.user.uid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
