export interface FlussonicAuth {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  expires_at?: string;
  error?: string;
}