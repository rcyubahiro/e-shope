import { useNotification } from '../hooks/useNotification';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const { showNotification } = useNotification();

  const handleRemove = () => {
    onRemove(item.id);
    showNotification(`${item.title} removed from cart`, 'info');
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      handleRemove();
    } else {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
      <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-bold text-lg text-gray-800">{item.title}</h4>
        <p className="text-blue-900 font-semibold">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={handleDecrement}
          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          min="1"
          className="w-16 text-center border border-gray-300 rounded py-1"
        />
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded transition-colors"
        >
          +
        </button>
      </div>
      <div className="text-lg font-bold text-gray-800 w-24 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  );
}
