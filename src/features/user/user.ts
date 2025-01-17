interface IProfile {
  id: number;
  userId: number;
  avatar: string;
  bio: string;
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

interface INotification {
  id: number;
  userId: number;
  date: string;
  message: string;
}

interface IMessage {
  id: number;
  userId: number;
  date: string;
  message: string;
}

interface IUser {
  Id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  registered: boolean;
  quizzes: number[];
  results: number[];
}
