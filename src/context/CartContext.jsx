import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Track current logged-in user
  const getCurrentUserId = () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).id : null;
  };

  const [currentUserId, setCurrentUserId] = useState(getCurrentUserId);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart and wishlist for current user
  const loadUserData = (userId) => {
    if (!userId) {
      setCart([]);
      setWishlist([]);
      return;
    }

    // Load user-specific cart
    const allCarts = localStorage.getItem('userCarts');
    if (allCarts) {
      const carts = JSON.parse(allCarts);
      setCart(carts[userId] || []);
    } else {
      setCart([]);
    }

    // Load user-specific wishlist
    const allWishlists = localStorage.getItem('userWishlists');
    if (allWishlists) {
      const wishlists = JSON.parse(allWishlists);
      setWishlist(wishlists[userId] || []);
    } else {
      setWishlist([]);
    }
  };

  // Monitor user login/logout
  useEffect(() => {
    loadUserData(currentUserId);

    // Listen for user changes (login/logout)
    const checkUserChange = setInterval(() => {
      const newUserId = getCurrentUserId();
      if (newUserId !== currentUserId) {
        setCurrentUserId(newUserId);
        loadUserData(newUserId);
      }
    }, 500);

    return () => clearInterval(checkUserChange);
  }, [currentUserId]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!currentUserId) return;

    const allCarts = localStorage.getItem('userCarts');
    const carts = allCarts ? JSON.parse(allCarts) : {};
    carts[currentUserId] = cart;
    localStorage.setItem('userCarts', JSON.stringify(carts));
  }, [cart, currentUserId]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (!currentUserId) return;

    const allWishlists = localStorage.getItem('userWishlists');
    const wishlists = allWishlists ? JSON.parse(allWishlists) : {};
    wishlists[currentUserId] = wishlist;
    localStorage.setItem('userWishlists', JSON.stringify(wishlists));
  }, [wishlist, currentUserId]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Admin function to get all users' activity
  const getAllUsersActivity = () => {
    const allCarts = localStorage.getItem('userCarts');
    const allWishlists = localStorage.getItem('userWishlists');
    const registeredUsers = localStorage.getItem('registeredUsers');
    
    const carts = allCarts ? JSON.parse(allCarts) : {};
    const wishlists = allWishlists ? JSON.parse(allWishlists) : {};
    const users = registeredUsers ? JSON.parse(registeredUsers) : [];
    
    // Combine user data with their cart and wishlist
    const userActivity = Object.keys(carts).map(userId => {
      const user = users.find(u => u.id === userId) || { 
        username: 'Unknown User', 
        email: 'N/A',
        firstName: 'Unknown'
      };
      
      return {
        userId,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        cartItems: carts[userId] || [],
        wishlistItems: wishlists[userId] || [],
        cartTotal: (carts[userId] || []).reduce((sum, item) => sum + (item.price * item.quantity), 0),
        cartCount: (carts[userId] || []).reduce((sum, item) => sum + item.quantity, 0),
        wishlistCount: (wishlists[userId] || []).length
      };
    });

    // Also include users with wishlists but no cart
    Object.keys(wishlists).forEach(userId => {
      if (!carts[userId]) {
        const user = users.find(u => u.id === userId) || { 
          username: 'Unknown User', 
          email: 'N/A',
          firstName: 'Unknown'
        };
        
        userActivity.push({
          userId,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          cartItems: [],
          wishlistItems: wishlists[userId] || [],
          cartTotal: 0,
          cartCount: 0,
          wishlistCount: (wishlists[userId] || []).length
        });
      }
    });

    return userActivity.filter(activity => activity.cartCount > 0 || activity.wishlistCount > 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearCart,
      getAllUsersActivity
    }}>
      {children}
    </CartContext.Provider>
  );
};
