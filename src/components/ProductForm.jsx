import { useState, useEffect } from 'react';

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    rating: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        thumbnail: product.thumbnail || '',
        rating: product.rating || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      price: '',
      thumbnail: '',
      rating: ''
    });
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-6 mb-6" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {product ? 'Edit Product' : 'Create New Product'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Product Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Thumbnail URL</label>
        <input
          type="url"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex gap-4">
        <button 
          type="submit" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition-colors"
        >
          {product ? 'Update Product' : 'Create Product'}
        </button>
        <button 
          type="button" 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
