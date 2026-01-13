import { useProduct } from '../hooks/useContexts';

export default function CategoryFilter() {
  const { categories, selectedCategory, fetchProductsByCategory, fetchProducts } = useProduct();

  const handleCategoryChange = (category) => {
    if (category === null) {
      fetchProducts();
    } else {
      fetchProductsByCategory(category);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
        📂 Departments
      </h3>
      <button
        className={`block w-full text-left px-4 py-3 rounded mb-2 transition-colors font-medium ${
          selectedCategory === null 
            ? 'bg-blue-900 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
        }`}
        onClick={() => handleCategoryChange(null)}
      >
        🏪 All Products
      </button>
      {categories && Array.isArray(categories) && categories.map((category) => {
        // Handle both string and object formats
        const categoryName = typeof category === 'string' ? category : category.slug || category.name;
        return (
          <button
            key={categoryName}
            className={`block w-full text-left px-4 py-3 rounded mb-2 transition-colors capitalize ${
              selectedCategory === categoryName 
                ? 'bg-blue-900 text-white font-semibold' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
            onClick={() => handleCategoryChange(categoryName)}
          >
            {categoryName}
          </button>
        );
      })}
    </div>
  );
}
