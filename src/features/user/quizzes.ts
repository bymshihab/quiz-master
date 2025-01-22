export interface Question {
  id: number;
  text: string;
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
  isActive: boolean;
}
