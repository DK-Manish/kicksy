import api from './axios';

export const getProductReviews = (slug) => api.get(`/products/${slug}/reviews/`);
export const createReview = (slug, data) => api.post(`/products/${slug}/reviews/create/`, data);
export const getWishlist = () => api.get('/wishlist/');
export const toggleWishlist = (slug) => api.post(`/products/${slug}/wishlist/`);