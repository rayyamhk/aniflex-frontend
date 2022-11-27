type Role = 'user' | 'admin';

export type User = {
  id: string,
  email: string,
  role: Role,
  createdAt: string,
};