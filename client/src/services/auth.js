import api from './api.js';

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  persist(data);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  persist(data);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const updateMe = async (payload) => {
  const { data } = await api.put('/auth/me', payload);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = () => localStorage.getItem('token');

export const getCurrentUser = () => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

const persist = ({ token, user }) => {
  if (token) localStorage.setItem('token', token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
};
