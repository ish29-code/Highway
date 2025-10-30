import axios from 'axios';

// Set your backend base URL here
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const api = axios.create({ baseURL: API_BASE });

// For admin protected routes
export function authHeaders() {
  const token = localStorage.getItem('bookit_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
