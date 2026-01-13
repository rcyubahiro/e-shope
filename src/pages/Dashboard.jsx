import { useEffect, useState } from 'react';
import { useProduct } from '../hooks/useContexts';
import { useNotification } from '../hooks/useNotification';
import ProductForm from '../components/ProductForm';
import DashboardProductList from '../components/DashboardProductList';
import UserActivityMonitor from '../components/UserActivityMonitor';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  FileText, 
  Truck, 
  Shield, 
  BarChart3,
  Tag,
  Settings,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export default function Dashboard() {
  const { products, createProduct, updateProduct, deleteProduct } = useProduct();
  const { showNotification } = useNotification();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (formData) => {
    setIsSubmitting(true);
    try {
      await createProduct(formData);
      setShowForm(false);
      showNotification('Product created successfully via API!', 'success');
    } catch (error) {
      showNotification('Failed to create product: ' + error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (formData) => {
    if (editingProduct) {
      setIsSubmitting(true);
      try {
        await updateProduct(editingProduct.id, formData);
        setEditingProduct(null);
        setShowForm(false);
        showNotification('Product updated successfully via API!', 'success');
      } catch (error) {
        showNotification('Failed to update product: ' + error.message, 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        showNotification('Product deleted successfully via API!', 'success');
      } catch (error) {
        showNotification('Failed to delete product: ' + error.message, 'error');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Mock data for dashboard stats
  const stats = [
    { 
      title: 'Total Products', 
      value: products.length, 
      icon: Package, 
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      title: 'Total Orders', 
      value: '1,234', 
      icon: ShoppingCart, 
      color: 'bg-green-500',
      change: '+8%'
    },
    { 
      title: 'Total Customers', 
      value: '856', 
      icon: Users, 
      color: 'bg-purple-500',
      change: '+23%'
    },
    { 
      title: 'Revenue', 
      value: '$45,678', 
      icon: DollarSign, 
      color: 'bg-yellow-500',
      change: '+15%'
    },
  ];

  const adminSections = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'user-activity', name: 'User Activity Monitor', icon: Users },
    { id: 'products', name: 'Product Management', icon: Package },
    { id: 'orders', name: 'Order Management', icon: ShoppingCart },
    { id: 'customers', name: 'Customer Management', icon: Users },
    { id: 'payments', name: 'Payment & Finance', icon: CreditCard },
    { id: 'content', name: 'Content Management', icon: FileText },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck },
    { id: 'security', name: 'Security & System', icon: Shield },
    { id: 'analytics', name: 'Analytics & Reports', icon: TrendingUp },
    { id: 'marketing', name: 'Marketing & Promos', icon: Tag },
    { id: 'settings', name: 'System Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your e-commerce platform</p>
        </div>

        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-x-auto">
          <div className="flex border-b border-gray-200">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveTab(section.id);
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === section.id
                      ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('products')}
                      className="w-full bg-blue-900 hover:bg-blue-950 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <Package className="w-5 h-5" /> Manage Products
                    </button>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" /> View Orders
                    </button>
                    <button 
                      onClick={() => setActiveTab('customers')}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <Users className="w-5 h-5" /> Manage Customers
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2 pb-3 border-b">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span>New product added: "Wireless Headphones"</span>
                    </div>
                    <div className="flex items-center gap-2 pb-3 border-b">
                      <ShoppingCart className="w-4 h-4 text-green-600" />
                      <span>Order #1234 marked as shipped</span>
                    </div>
                    <div className="flex items-center gap-2 pb-3 border-b">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>New customer registered: John Doe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-yellow-600" />
                      <span>Payment received: $299.99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'user-activity' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">User Activity Monitor</h2>
              <UserActivityMonitor />
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                {!showForm && (
                  <button 
                    className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                    onClick={() => setShowForm(true)}
                  >
                    <Package className="w-5 h-5" /> Add New Product
                  </button>
                )}
              </div>

              {showForm && (
                <ProductForm
                  product={editingProduct}
                  onSubmit={editingProduct ? handleUpdate : handleCreate}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                />
              )}

              {!showForm && (
                <DashboardProductList
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
              <div className="text-gray-600">
                <div className="grid gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">Order #1234</h3>
                        <p className="text-sm text-gray-500">Customer: John Doe</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Pending
                      </span>
                    </div>
                    <div className="text-sm">
                      <p>Total: $299.99</p>
                      <p>Date: Jan 12, 2026</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold">
                        Mark as Shipped
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold">
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Orders</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4">john@example.com</td>
                      <td className="py-3 px-4">12</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-900 hover:text-blue-950 font-semibold text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['payments', 'content', 'shipping', 'security', 'analytics', 'marketing', 'settings'].includes(activeTab) && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {adminSections.find(s => s.id === activeTab)?.name}
              </h2>
              <div className="text-center py-12">
                <div className="inline-block p-6 bg-blue-50 rounded-full mb-4">
                  {(() => {
                    const Icon = adminSections.find(s => s.id === activeTab)?.icon;
                    return Icon ? <Icon className="w-12 h-12 text-blue-900" /> : null;
                  })()}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  This section is under development. Advanced features for {adminSections.find(s => s.id === activeTab)?.name.toLowerCase()} will be available soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
