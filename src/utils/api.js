import axios from './axiosConfig';

const API_URL = 'https://dummyjson.com';

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken,
    });
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAllProducts: async (params = {}) => {
    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category, params = {}) => {
    const response = await axios.get(`${API_URL}/products/category/${category}`, { params });
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: { q: query },
    });
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await axios.post(`${API_URL}/products/add`, productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post(`${API_URL}/users/add`, userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  },
};

// Carts API
export const cartsAPI = {
  getUserCarts: async (userId) => {
    const response = await axios.get(`${API_URL}/carts/user/${userId}`);
    return response.data;
  },

  createCart: async (cartData) => {
    const response = await axios.post(`${API_URL}/carts/add`, cartData);
    return response.data;
  },

  updateCart: async (id, cartData) => {
    const response = await axios.put(`${API_URL}/carts/${id}`, cartData);
    return response.data;
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  users: usersAPI,
  carts: cartsAPI,
};
