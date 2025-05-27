export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface UserCreation {
  username: string;
  name: string;
  password: string;
  email: string;
}
