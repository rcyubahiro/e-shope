import { useState, useEffect, useMemo } from 'react';
import { useProduct, useCart, useAuth } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/SortOptions';
import { Link, useSearchParams } from 'react-router-dom';

export default function Home() {
  const { products, loading, error } = useProduct();
  const { addToCart, isInWishlist } = useCart();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [sortConfig, setSortConfig] = useState({ field: '', order: 'asc' });

  // Filter and sort products based on search query and sort config
  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply client-side sorting if needed (as backup to API sorting)
    if (sortConfig.field) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortConfig.field];
        const bVal = b[sortConfig.field];
        
        if (typeof aVal === 'string') {
          return sortConfig.order === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return sortConfig.order === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [products, searchQuery, sortConfig]);

  // Show notification when search is performed
  useEffect(() => {
    if (searchQuery.trim()) {
      showNotification(`Found ${filteredAndSortedProducts.length} results for "${searchQuery}"`, 'info');
    }
  }, [searchQuery]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl text-gray-600">Loading products...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-xl text-red-600">Error: {error}</div>;

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Shop Amazing Products</h1>
            <p className="text-xl mb-6">Discover thousands of products at unbeatable prices</p>
            {!user && (
              <div className="bg-white text-blue-900 px-6 py-4 rounded-lg mb-4 font-semibold flex flex-col gap-2">
                <div>
                  🔐 <Link to="/login" className="underline font-bold">Sign in</Link> or create an account to add items to cart & wishlist
                </div>
                <div className="text-sm">
                  <Link to="/admin/login" className="text-blue-950 hover:underline font-bold">
                    🛡️ Admin Login →
                  </Link>
                </div>
              </div>
            )}
            <div className="flex gap-4">
              <span className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold text-lg">
                ⚡ Fast Delivery
              </span>
              <span className="bg-blue-950 text-white px-6 py-3 rounded-full font-bold text-lg">
                🎁 Best Deals
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter />
            <SortOptions onSort={setSortConfig} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchQuery ? `Search Results: "${searchQuery}"` : 'Featured Products'}
                </h2>
                <p className="text-gray-600">{filteredAndSortedProducts.length} items available</p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts && filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddCart={addToCart}
                    isWishlisted={isInWishlist(product.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg mb-2">No products found</p>
                  {searchQuery && (
                    <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Clear search and view all products
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">Unbeatable deals every day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
