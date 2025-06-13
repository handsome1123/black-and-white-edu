// app/api/courses/[id]/lessons/[lessonId]/route.ts
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string; lessonId: string } }
) {
  const ref = doc(db, `courses/${params.id}/lessons/${params.lessonId}`);
  const snap = await getDoc(ref);

  if (!snap.exists()) return NextResponse.json({ error: "Lesson not found" }, { status: 404 });

  return NextResponse.json(snap.data());
}
