import { useProduct } from '../hooks/useContexts';
import { ArrowUpDown, DollarSign, Gem, Star, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import { useState } from 'react';

export default function SortOptions({ onSort }) {
  const { fetchProducts, selectedCategory, fetchProductsByCategory } = useProduct();
  const [selectedSort, setSelectedSort] = useState('');

  const handleSort = (sortBy, order, id) => {
    setSelectedSort(id);
    const params = { sortBy, order };
    
    // If a category is selected, fetch category products with sorting
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory, params);
    } else {
      // Otherwise fetch all products with sorting
      fetchProducts(params);
    }
    
    if (onSort) onSort({ field: sortBy, order });
  };

  const sortOptions = [
    { id: 'price-asc', sortBy: 'price', order: 'asc', icon: DollarSign, label: 'Price: Low to High' },
    { id: 'price-desc', sortBy: 'price', order: 'desc', icon: Gem, label: 'Price: High to Low' },
    { id: 'rating-desc', sortBy: 'rating', order: 'desc', icon: Star, label: 'Top Rated', starred: true },
    { id: 'title-asc', sortBy: 'title', order: 'asc', icon: ArrowDownAZ, label: 'Name: A to Z' },
    { id: 'title-desc', sortBy: 'title', order: 'desc', icon: ArrowUpZA, label: 'Name: Z to A' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2">
        <ArrowUpDown className="w-5 h-5" /> Sort By
      </h3>
      <div className="space-y-3">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <label 
              key={option.id}
              className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded border border-gray-200 transition-colors cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                checked={selectedSort === option.id}
                onChange={() => handleSort(option.sortBy, option.order, option.id)}
                className="w-4 h-4 text-blue-900 focus:ring-blue-900 focus:ring-2"
              />
              <Icon className={`w-4 h-4 ${option.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
