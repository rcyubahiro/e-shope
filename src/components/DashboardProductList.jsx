import { Star } from 'lucide-react';

export default function DashboardProductList({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Products ({products.length})</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{product.id}</td>
                  <td className="py-3 px-4">{product.title}</td>
                  <td className="py-3 px-4">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price || 0).toFixed(2)}</td>
                  <td className="py-3 px-4 flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {typeof product.rating === 'number' ? product.rating : parseFloat(product.rating || 0)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-900 hover:bg-blue-950 text-white py-1 px-3 rounded transition-colors"
                        onClick={() => onEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded transition-colors"
                        onClick={() => onDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
