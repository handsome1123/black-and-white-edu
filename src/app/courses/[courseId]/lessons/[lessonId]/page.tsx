'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../lib/firebase';
import type { Exercise } from '../../../../../types/models';

export default function LessonPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const lessonId = params?.lessonId as string;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!courseId || !lessonId) return;

    const fetchExercises = async () => {
      const exercisesCol = collection(db, 'courses', courseId, 'lessons', lessonId, 'exercises');
      const snapshot = await getDocs(exercisesCol);
      const exercisesList = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Exercise, 'id'>;
        return { id: doc.id, ...data };
      });
      setExercises(exercisesList);
      setLoading(false);
    };

    fetchExercises();
  }, [courseId, lessonId]);

  const handleAnswer = (option: string) => {
    const currentExercise = exercises[currentIndex];
    setSelected(option);
    setIsCorrect(option === currentExercise.answer);
  };

  const handleNext = () => {
    setSelected(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (currentIndex >= exercises.length) return <p>🎉 Lesson Completed!</p>;

  const currentExercise = exercises[currentIndex];

  return (
    <div style={{ padding: 20 }}>
      <h1>Lesson: {lessonId}</h1>
      <h3>Question {currentIndex + 1} of {exercises.length}</h3>
      <p>{currentExercise.question}</p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {currentExercise.options.map((opt, i) => (
          <li key={i} style={{ margin: '10px 0' }}>
            <button
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
              style={{
                padding: 10,
                width: '100%',
                backgroundColor: selected === opt 
                  ? (opt === currentExercise.answer ? '#a8e6a1' : '#f5a1a1')
                  : '#f0f0f0',
              }}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div>
          {isCorrect ? <p style={{ color: 'green' }}>✅ Correct!</p> : <p style={{ color: 'red' }}>❌ Incorrect!</p>}
          <button onClick={handleNext} style={{ marginTop: 10 }}>Next</button>
        </div>
      )}
    </div>
  );
}
