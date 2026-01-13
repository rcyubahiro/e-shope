import { useCart } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const { showNotification } = useNotification();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    showNotification('Checkout feature coming soon!', 'info');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 py-12 text-xl">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
              />
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md ml-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Total: ${total.toFixed(2)}</h3>
            <button 
              onClick={handleCheckout}
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
