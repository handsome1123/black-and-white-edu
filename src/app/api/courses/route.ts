import { db } from "@/lib/firebase"; // adjust based on your project
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const coursesRef = collection(db, "courses");
  const snapshot = await getDocs(coursesRef);

  const courses = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(courses);
}
