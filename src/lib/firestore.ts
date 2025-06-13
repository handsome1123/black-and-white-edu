// lib/firestore.ts or utils/firestore.ts
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getLesson(courseId: string, lessonId: string) {
  const ref = doc(db, `courses/${courseId}/lessons/${lessonId}`);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  } else {
    throw new Error("Lesson not found");
  }
}
