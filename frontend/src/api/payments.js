import api from './axios';

export const getPaymentConfig = () => api.get('/payments/config/');
export const createPaymentIntent = (orderNumber) => api.post('/payments/create-intent/', { order_number: orderNumber });