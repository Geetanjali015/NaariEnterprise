import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { Plus, Search, Package, AlertCircle } from 'lucide-react';

export default function Inventory() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const products = [
    { id: 1, name: 'Cotton Fabric Rolls', sku: 'FAB-001', category: 'Raw Materials', stock: 12, minStock: 20, price: 450, status: 'low' },
    { id: 2, name: 'Designer Sarees', sku: 'SAR-023', category: 'Finished Goods', stock: 35, minStock: 15, price: 2500, status: 'good' },
    { id: 3, name: 'Packaging Boxes', sku: 'PKG-105', category: 'Supplies', stock: 45, minStock: 50, status: 'low', price: 25 },
    { id: 4, name: 'Embroidery Thread Set', sku: 'THD-089', category: 'Raw Materials', stock: 78, minStock: 30, price: 350, status: 'good' },
    { id: 5, name: 'Kurti Collection', sku: 'KRT-156', category: 'Finished Goods', stock: 52, minStock: 25, price: 899, status: 'good' },
    { id: 6, name: 'Organic Spices Mix', sku: 'SPC-042', category: 'Products', stock: 8, minStock: 15, price: 180, status: 'low' },
    { id: 7, name: 'Leather Handbags', sku: 'BAG-278', category: 'Finished Goods', stock: 24, minStock: 10, price: 1500, status: 'good' },
    { id: 8, name: 'Jewelry Display Stands', sku: 'DSP-021', category: 'Supplies', stock: 15, minStock: 8, price: 120, status: 'good' },
  ];
  
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0);
  const lowStockCount = products.filter(p => p.status === 'low').length;
  
  return (
    <DashboardLayout title="Inventory Management">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Total Products</p>
              <h3 className="mb-2">{products.length}</h3>
              <p className="text-sm text-[var(--color-gray-600)]">Active items</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-[var(--color-teal)]" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Inventory Value</p>
              <h3 className="mb-2">₹{totalValue.toLocaleString()}</h3>
              <p className="text-sm text-[var(--color-gray-600)]">Total stock value</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Low Stock Alerts</p>
              <h3 className="mb-2">{lowStockCount}</h3>
              <p className="text-sm text-yellow-600">Items need reorder</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Product Table */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h3>Product Inventory</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-500)]" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] w-64"
              />
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-gray-200)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Category</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Stock</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Min Stock</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Price</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)] font-mono">{product.sku}</td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-900)] font-medium">{product.name}</td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{product.category}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-medium ${product.status === 'low' ? 'text-yellow-600' : 'text-[var(--color-gray-900)]'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-[var(--color-gray-700)]">{product.minStock}</td>
                  <td className="py-4 px-4 text-sm text-right font-medium text-[var(--color-gray-900)]">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <StatusBadge status={product.status === 'low' ? 'warning' : 'success'}>
                      {product.status === 'low' ? 'Low Stock' : 'In Stock'}
                    </StatusBadge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-[var(--color-teal)] hover:underline text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" padding="lg">
            <h3 className="mb-6">Add New Product</h3>
            
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="PRD-001"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                >
                  <option>Finished Goods</option>
                  <option>Raw Materials</option>
                  <option>Supplies</option>
                  <option>Products</option>
                </select>
              </div>
              
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label htmlFor="minStock" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Minimum Stock
                  </label>
                  <input
                    type="number"
                    id="minStock"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="Add product description..."
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Add Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
