'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
}

export default function LessonsPage() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const fetchLessons = async () => {
      try {
        const lessonsCol = collection(db, 'courses', courseId, 'lessons');
        const lessonsSnapshot = await getDocs(lessonsCol);
        const lessonsList = lessonsSnapshot.docs.map(doc => {
          const { id, ...data } = doc.data() as Lesson;
          return {
            id: doc.id,
            ...data,
          };
        });
        setLessons(lessonsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading) return <p>Loading lessons...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Lessons</h1>
      {lessons.length === 0 && <p>No lessons found.</p>}
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id} style={{ marginBottom: 10 }}>
            <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                {lesson.title}
              </div>
            </Link>
            <p>{lesson.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
