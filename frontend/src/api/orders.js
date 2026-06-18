import api from './axios';

export const getOrders = () => api.get('/orders/');
export const getOrder = (orderNumber) => api.get(`/orders/${orderNumber}/`);
export const createOrder = (data) => api.post('/orders/create/', data);
export const cancelOrder = (orderNumber) => api.post(`/orders/${orderNumber}/cancel/`);