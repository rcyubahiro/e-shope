import { useCart } from '../hooks/useContexts';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 py-12 text-xl">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddCart={addToCart}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
