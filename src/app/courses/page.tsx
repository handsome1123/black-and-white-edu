'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCol = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesCol);
      setCourses(
        coursesSnapshot.docs.map((doc) => {
          const { id, ...data } = doc.data() as Course & { id?: string };
          return {
            id: doc.id,
            ...data,
          };
        })
      );
    };
    fetchCourses();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Courses</h1>
      {courses.length === 0 && <p>No courses found.</p>}
      <ul>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: 10 }}>
            <Link href={`/courses/${course.id}`}>
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                {course.title}
              </div>
            </Link>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
