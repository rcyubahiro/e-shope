import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const API_URL = 'https://dummyjson.com';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch all products with optional sorting
  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(null);
    try {
      // Build query params for sorting
      const queryParams = { ...params };
      if (params.sortBy) {
        queryParams.sortBy = params.sortBy;
        queryParams.order = params.order || 'asc';
      }
      const response = await axios.get(`${API_URL}/products`, { params: queryParams });
      setProducts(response.data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products by category with optional sorting
  const fetchProductsByCategory = useCallback(async (category, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Build query params for sorting
      const queryParams = { ...params };
      if (params.sortBy) {
        queryParams.sortBy = params.sortBy;
        queryParams.order = params.order || 'asc';
      }
      const response = await axios.get(`${API_URL}/products/category/${category}`, { params: queryParams });
      setProducts(response.data.products);
      setSelectedCategory(category);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/products/categories`);
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Initialize data on mount only once
  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/products/categories`)
        ]);
        setProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
        setIsInitialized(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!isInitialized) {
      initData();
    }
  }, [isInitialized]);

  // Create product using DummyJSON API
  const createProduct = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/products/add`, product);
      const newProduct = response.data;
      // Add to local state for immediate UI update
      setProducts([newProduct, ...products]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update product using DummyJSON API
  const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, updatedData);
      const updated = response.data;
      // Update local state for immediate UI update
      setProducts(products.map(product =>
        product.id === id ? { ...product, ...updated } : product
      ));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete product using DummyJSON API
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      // Remove from local state for immediate UI update
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      error,
      selectedCategory,
      fetchProducts,
      fetchProductsByCategory,
      fetchCategories,
      createProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};
