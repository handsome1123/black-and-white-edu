// app/api/courses/[courseId]/lessons/route.ts
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const lessonsRef = collection(db, "courses", params.courseId, "lessons");
  const snapshot = await getDocs(lessonsRef);
  const lessons = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return NextResponse.json(lessons);
}
