import { useCart, useAuth } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddCart, isWishlisted }) {
  const { addToWishlist, removeFromWishlist, cart } = useCart();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleWishlistToggle = () => {
    if (!user) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      showNotification('Please login to manage wishlist', 'warning');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
      showNotification('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      showNotification('Added to wishlist ', 'success');
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      showNotification('Please login to add items to cart', 'warning');
      return;
    }

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    onAddCart(product);
    
    if (existingItem) {
      showNotification(`Quantity increased for ${product.title}`, 'success');
    } else {
      showNotification(`${product.title} added to cart!`, 'success');
    }
  };

  const discount = Math.floor(Math.random() * 30) + 10; // Random discount for visual effect

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {showLoginMessage && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-gray-900 px-4 py-2 text-center text-sm font-semibold z-10 animate-pulse">
          Please <button onClick={() => navigate('/login')} className="underline font-bold">login</button> to continue
        </div>
      )}
      
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
        {discount > 20 && (
          <div className="absolute top-2 left-2 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110"
          onClick={handleWishlistToggle}
          title={user ? (isWishlisted ? 'Remove from wishlist' : 'Add to wishlist') : 'Login to add to wishlist'}
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-blue-900 stroke-blue-900' : 'stroke-gray-600'}`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">{product.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {discount > 20 && (
            <span className="text-sm text-gray-400 line-through">${(product.price * 1.3).toFixed(2)}</span>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            className="flex-1 bg-blue-900 hover:bg-blue-950 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            onClick={handleAddToCart}
            title={user ? 'Add to cart' : 'Login to add to cart'}
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
          <button
            className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isWishlisted 
                ? 'bg-blue-900 hover:bg-blue-950 text-white shadow-md' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            onClick={handleWishlistToggle}
            title={user ? (isWishlisted ? 'Remove from wishlist' : 'Add to wishlist') : 'Login to add to wishlist'}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-white stroke-white' : 'stroke-gray-700'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
