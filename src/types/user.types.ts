export interface User {
  id: string;
  email: string;
  role: string;
}

export interface UserCreation {
  email: string;
  password: string;
}
