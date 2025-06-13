'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../../../../lib/firebase';

interface Lesson {
  id: string;
  title: string;
  description: string;
}

interface Exercise {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export default function LessonPage() {
  const params = useParams();
  const { courseId, lessonId } = params as { courseId: string; lessonId: string };

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchLessonAndExercises = async () => {
      // Fetch lesson
      const lessonRef = doc(db, 'courses', courseId, 'lessons', lessonId);
      const lessonSnap = await getDoc(lessonRef);
      if (lessonSnap.exists()) {
        setLesson({ id: lessonSnap.id, ...(lessonSnap.data() as Lesson) });
      }

      // Fetch exercises inside this lesson
      const exercisesCol = collection(db, 'courses', courseId, 'lessons', lessonId, 'exercises');
      const exercisesSnap = await getDocs(exercisesCol);
      setExercises(
        exercisesSnap.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Exercise),
        }))
      );
    };

    fetchLessonAndExercises();
  }, [courseId, lessonId]);

  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>

      <h2>Exercises</h2>
      {exercises.length === 0 && <p>No exercises found.</p>}
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id} style={{ marginBottom: 20 }}>
            <p><b>Q:</b> {exercise.question}</p>
            <ul>
              {exercise.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
