export interface Course {
  id: string;
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
}

export interface Exercise {
  id: string;
  question: string;
  options: string[];
  answer: string;
}
