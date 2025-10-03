import axios from 'axios';
import type { Product, LoginRequest, LoginResponse } from '../types';

// Configuração do axios para autenticação
const authApi = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configuração do axios para produtos
const productsApi = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autorização nos produtos
productsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Serviços de autenticação
export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await authApi.post('/auth/login', credentials);
    return response.data;
  },
};

// Serviços de produtos
export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await productsApi.get('/products');
    return response.data;
  },

  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await productsApi.post('/products/add', product);
    return response.data;
  },
};