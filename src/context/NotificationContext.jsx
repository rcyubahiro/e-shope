import { createContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : notification.type === 'error'
                ? 'bg-red-500 text-white'
                : notification.type === 'warning'
                ? 'bg-yellow-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span>
                {notification.type === 'success' && <CheckCircle className="w-6 h-6" />}
                {notification.type === 'error' && <XCircle className="w-6 h-6" />}
                {notification.type === 'warning' && <AlertTriangle className="w-6 h-6" />}
                {notification.type === 'info' && <Info className="w-6 h-6" />}
              </span>
              <p className="font-semibold">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 hover:opacity-75"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
