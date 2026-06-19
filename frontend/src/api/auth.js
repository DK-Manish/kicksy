import api from './axios';

export const register = (data) => api.post('/auth/register/', data);
export const login = (data) => api.post('/auth/login/', data);
export const logout = (refreshToken) => api.post('/auth/logout/', { refresh: refreshToken });
export const getMe = () => api.get('/auth/me/');
export const updateProfile = (data) => api.patch('/auth/me/', data);
export const changePassword = (data) => api.post('/auth/me/change-password/', data);
export const getAddresses = () => api.get('/auth/me/addresses/');
export const addAddress = (data) => api.post('/auth/me/addresses/', data);
export const updateAddress = (id, data) => api.patch(`/auth/me/addresses/${id}/`, data);
export const deleteAddress = (id) => api.delete(`/auth/me/addresses/${id}/`);
export const forgotPassword = (email) => api.post('/auth/forgot-password/', { email });
export const resetPassword = (data) => api.post('/auth/reset-password/', data);