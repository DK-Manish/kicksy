import api from './axios';

export const getProducts = (params) => api.get('/products/', { params });
export const getProduct = (slug) => api.get(`/products/${slug}/`);
export const getRelatedProducts = (slug) => api.get(`/products/${slug}/related/`);
export const getFeatured = () => api.get('/products/featured/');
export const getNewArrivals = () => api.get('/products/new-arrivals/');
export const getLimitedDrops = () => api.get('/products/limited-drops/');
export const getCategories = () => api.get('/products/categories/');
export const getBrands = () => api.get('/products/brands/');
export const getFacets = (params) => api.get('/products/facets/', { params });