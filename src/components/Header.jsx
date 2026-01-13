import { useAuth, useCart } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Settings, ShoppingCart, Search, MapPin, ShoppingBasket, Hand, Home } from 'lucide-react';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { cart, wishlist } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    showNotification('Logged out successfully', 'info');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="bg-blue-950 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span><MapPin /> Kigali, Rwanda</span>
          </div>
          <div className="flex gap-4">
            {user && <span><Hand/> Hi, {user.firstName}!</span>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-3xl"><ShoppingBasket /></span>
            <span className="text-2xl font-bold">E-Shop</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-5 pr-32 py-3 rounded-full text-white-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-900 hover:bg-blue-950 text-white-700 px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </form>

          <nav className="flex items-center gap-4 flex-shrink-0">
            {user ? (
              <>
                <Link to="/cart" className="flex flex-col items-center hover:text-gray-200 transition-colors relative">
                  <div className="relative">
                    <span className="text-2xl"><ShoppingCart /></span>
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-white text-blue-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold">${cartTotal.toFixed(2)}</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center hover:text-gray-200 transition-colors">
                  <span className="text-2xl"><Heart /></span>
                  <span className="text-xs">Wishlist ({wishlist.length})</span>
                </Link>
                <Link 
                  to={isAdmin() ? "/admin/dashboard" : "/dashboard"} 
                  className="flex flex-col items-center hover:text-gray-200 transition-colors"
                >
                  <span className="text-2xl"><Settings /></span>
                  <span className="text-xs">{isAdmin() ? 'Admin Panel' : 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-3 rounded font-semibold transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>

      {user && (
        <div className="bg-blue-950 border-t border-blue-900">
          <div className="container mx-auto px-4">
            <nav className="flex gap-6 py-3 text-sm">
              <Link to="/" className="hover:text-gray-200 transition-colors font-medium flex items-center gap-2">
                <Heart className="w-4 h-4" /> Home
              </Link>
              {!isAdmin() && (
                <>
                  <Link to="/cart" className="hover:text-gray-200 transition-colors font-medium">
                    Shopping Cart
                  </Link>
                  <Link to="/wishlist" className="hover:text-gray-200 transition-colors font-medium">
                    My Wishlist
                  </Link>
                </>
              )}
              <Link to={isAdmin() ? "/admin/dashboard" : "/dashboard"} className="hover:text-gray-200 transition-colors font-medium">
                {isAdmin() ? 'Admin Dashboard' : 'My Dashboard'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
