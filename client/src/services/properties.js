import api from './api.js';

export const getProperties = async (params = {}) => {
  const { data } = await api.get('/properties', { params });
  return data;
};

export const getPropertyById = async (id) => {
  const { data } = await api.get(`/properties/${id}`);
  return data;
};

export const getMyProperties = async () => {
  const { data } = await api.get('/properties/mine/list');
  return data;
};

export const createProperty = async (payload) => {
  const { data } = await api.post('/properties', payload);
  return data;
};

export const updateProperty = async (id, payload) => {
  const { data } = await api.put(`/properties/${id}`, payload);
  return data;
};

export const deleteProperty = async (id) => {
  const { data } = await api.delete(`/properties/${id}`);
  return data;
};

export const getFavorites = async () => {
  const { data } = await api.get('/favorites');
  return data;
};

export const addFavorite = async (propertyId) => {
  const { data } = await api.post(`/favorites/${propertyId}`);
  return data;
};

export const removeFavorite = async (propertyId) => {
  const { data } = await api.delete(`/favorites/${propertyId}`);
  return data;
};

export const createInquiry = async (payload) => {
  const { data } = await api.post('/inquiries', payload);
  return data;
};

export const getInquiries = async () => {
  const { data } = await api.get('/inquiries');
  return data;
};
