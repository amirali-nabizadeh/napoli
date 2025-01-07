export interface User {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  userId: number;
}

export interface FormInterface {
  name: string;
  grade: number;
  major: number;
  description: string;
  status: string;
  formId: number;
}

export type Login = Pick<
  User,
  'username' | 'password' | 'email' | 'isAdmin' | 'userId'
>;

export type Signup = Pick<
  User,
  'username' | 'password' | 'email' | 'isAdmin' | 'userId'
>;
