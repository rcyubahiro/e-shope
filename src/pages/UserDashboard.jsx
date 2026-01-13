import { useAuth, useCart } from '../hooks/useContexts';
import { Package, Heart, ShoppingCart, User, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();
  const { cart, wishlist } = useCart();

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const userStats = [
    {
      title: 'Cart Items',
      value: cart.length,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      link: '/cart'
    },
    {
      title: 'Wishlist',
      value: wishlist.length,
      icon: Heart,
      color: 'bg-red-500',
      link: '/wishlist'
    },
    {
      title: 'Cart Total',
      value: `$${cartTotal.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/cart'
    },
    {
      title: 'Orders',
      value: '0',
      icon: Package,
      color: 'bg-purple-500',
      link: '#'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user?.firstName}!</h1>
          <p className="text-gray-600">Manage your shopping activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link 
                key={index} 
                to={stat.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" /> Recent Cart Items
            </h2>
            {cart.length > 0 ? (
              <div className="space-y-3">
                {cart.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b last:border-b-0">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/cart" 
                  className="block text-center bg-blue-900 hover:bg-blue-950 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link 
                  to="/" 
                  className="inline-block bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6" /> Wishlist Items
            </h2>
            {wishlist.length > 0 ? (
              <div className="space-y-3">
                {wishlist.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b last:border-b-0">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">${item.price}</p>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/wishlist" 
                  className="block text-center bg-blue-900 hover:bg-blue-950 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  View Wishlist
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                <Link 
                  to="/" 
                  className="inline-block bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-6 h-6" /> Account Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Personal Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Username:</strong> {user?.username}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Shopping Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Cart Items:</strong> {cart.length}</p>
                <p><strong>Wishlist Items:</strong> {wishlist.length}</p>
                <p><strong>Total Orders:</strong> 0</p>
                <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
