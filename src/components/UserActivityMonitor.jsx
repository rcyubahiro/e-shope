import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useContexts';
import { Users, ShoppingCart, Heart, TrendingUp, RefreshCw } from 'lucide-react';

export default function UserActivityMonitor() {
  const { getAllUsersActivity } = useCart();
  const [userActivities, setUserActivities] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refreshData = () => {
    const activities = getAllUsersActivity();
    setUserActivities(activities);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    refreshData();
    
    // Auto-refresh every 5 seconds for live updates
    const interval = setInterval(refreshData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const totalStats = {
    activeUsers: userActivities.length,
    totalCartItems: userActivities.reduce((sum, user) => sum + user.cartCount, 0),
    totalWishlistItems: userActivities.reduce((sum, user) => sum + user.wishlistCount, 0),
    totalRevenue: userActivities.reduce((sum, user) => sum + user.cartTotal, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-700">Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">{totalStats.activeUsers}</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-700">Cart Items</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">{totalStats.totalCartItems}</p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-red-600" />
            <h3 className="font-semibold text-gray-700">Wishlist Items</h3>
          </div>
          <p className="text-3xl font-bold text-red-900">{totalStats.totalWishlistItems}</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
            <h3 className="font-semibold text-gray-700">Potential Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-900">${totalStats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Live User Activity</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* User Activities List */}
      {userActivities.length > 0 ? (
        <div className="space-y-4">
          {userActivities.map((activity) => (
            <div 
              key={activity.userId} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedUser(expandedUser === activity.userId ? null : activity.userId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {activity.firstName} {activity.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">@{activity.username} • {activity.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-green-600">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-bold text-lg">{activity.cartCount}</span>
                      </div>
                      <p className="text-xs text-gray-600">Cart Items</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-red-600">
                        <Heart className="w-5 h-5" />
                        <span className="font-bold text-lg">{activity.wishlistCount}</span>
                      </div>
                      <p className="text-xs text-gray-600">Wishlist</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-lg text-blue-900">
                        ${activity.cartTotal.toFixed(2)}
                      </div>
                      <p className="text-xs text-gray-600">Cart Total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedUser === activity.userId && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Cart Items */}
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" /> Cart Items ({activity.cartItems.length})
                      </h5>
                      {activity.cartItems.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {activity.cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200">
                              <img 
                                src={item.thumbnail} 
                                alt={item.title} 
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-gray-800 line-clamp-1">{item.title}</p>
                                <p className="text-xs text-gray-600">
                                  Qty: {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No items in cart</p>
                      )}
                    </div>

                    {/* Wishlist Items */}
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5" /> Wishlist Items ({activity.wishlistItems.length})
                      </h5>
                      {activity.wishlistItems.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {activity.wishlistItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200">
                              <img 
                                src={item.thumbnail} 
                                alt={item.title} 
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-gray-800 line-clamp-1">{item.title}</p>
                                <p className="text-xs text-gray-600">${item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No items in wishlist</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Users</h3>
          <p className="text-gray-600">No users have items in their cart or wishlist yet.</p>
        </div>
      )}
    </div>
  );
}
