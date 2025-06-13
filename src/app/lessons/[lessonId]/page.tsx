// app/lessons/[lessonId]/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; // Adjust the import path as necessary
import { Exercise, Lesson } from '../../../types/models';

export default function LessonPage() {
  const params = useParams();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
      if (lessonDoc.exists()) {
        setLesson(lessonDoc.data() as Lesson);
      }
    };

    const fetchExercises = async () => {
      const exercisesCol = collection(db, 'exercises');
      const q = query(exercisesCol, where('lessonId', '==', lessonId));
      const snapshot = await getDocs(q);
      setExercises(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Exercise) })));
    };

    fetchLesson();
    fetchExercises();
  }, [lessonId]);

  const handleOptionClick = useCallback(() => {
    if (!selectedOption) return;

    if (selectedOption === exercises[currentIndex].answer) {
      setCorrectCount((prev) => prev + 1);
    }
    setSelectedOption(null);
    setCurrentIndex((prev) => prev + 1);
  }, [selectedOption, exercises, currentIndex]);

  if (!lesson) return <p>Loading lesson...</p>;
  if (exercises.length === 0) return <p>No exercises found.</p>;
  if (currentIndex >= exercises.length)
    return (
      <main style={{ padding: 20 }}>
        <h1>{lesson.title} - Completed!</h1>
        <p>
          You scored {correctCount} / {exercises.length}
        </p>
      </main>
    );

  const currentExercise = exercises[currentIndex];

  return (
    <main style={{ padding: 20 }}>
      <h1>{lesson.title}</h1>
      <p>{currentExercise.question}</p>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {currentExercise.options.map((option) => (
          <li key={option} style={{ margin: '8px 0' }}>
            <button
              onClick={() => setSelectedOption(option)}
              disabled={selectedOption !== null}
              style={{
                backgroundColor: selectedOption === option ? (option === currentExercise.answer ? 'green' : 'red') : 'initial',
                color: selectedOption === option ? 'white' : 'black',
                padding: '8px 16px',
                borderRadius: 4,
                border: '1px solid #ddd',
                cursor: selectedOption === null ? 'pointer' : 'default',
                width: '100%',
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {selectedOption && (
        <button onClick={handleOptionClick} style={{ marginTop: 20 }}>
          Next
        </button>
      )}
    </main>
  );
}
