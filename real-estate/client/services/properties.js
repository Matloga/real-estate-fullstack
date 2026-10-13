import api from "./api";

export const getProperties = (params = {}) => api.get("/properties", { params });
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (data, token) => api.post("/properties", data, { headers: { Authorization: `Bearer ${token}` } });
export const getNearby = (params) => api.get("/properties/nearby/search", { params });
