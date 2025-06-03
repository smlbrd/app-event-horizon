export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface UserCreation {
  email: string;
  password: string;
}
