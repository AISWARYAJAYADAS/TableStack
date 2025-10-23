// In src/types/auth.types.ts
export interface User {
  sub: string | undefined; // Allow undefined
  email: string;
  name: string;
  picture?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
