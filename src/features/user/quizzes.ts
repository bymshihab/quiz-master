export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  registered: boolean;
  questions: Question[];
  coverImage: string;
  takeTime: number;
}
