// app/api/auth/logout/route.ts
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut(auth);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
