export interface Product {
  id?: number;
  name: string;
  price: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  error?: string;
}

export interface User {
  username: string;
  token: string;
}
