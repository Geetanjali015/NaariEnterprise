import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { Plus, Search, Package, AlertCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  status?: 'low' | 'good' | string;
}

export default function Inventory() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Finished Goods',
    stock: '',
    minStock: '',
    price: '',
    description: '',
  });

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/inventory', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      const productsWithStatus = data.map((p: any) => ({
        ...p,
        status: p.stock < p.minStock ? 'low' : 'good'
      }));
      setProducts(productsWithStatus);
    } catch (err) {
      setError('Failed to load products');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.stock || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5001/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          stock: parseInt(formData.stock),
          minStock: parseInt(formData.minStock) || 0,
          price: parseFloat(formData.price),
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add product');
      }

      await fetchProducts();
      
      setFormData({
        name: '',
        sku: '',
        category: 'Finished Goods',
        stock: '',
        minStock: '',
        price: '',
        description: '',
      });
      
      setShowAddModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
      console.error('Error:', err);
      alert(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      price: product.price.toString(),
      description: '',
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingId) return;
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5001/inventory/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          stock: parseInt(formData.stock),
          minStock: parseInt(formData.minStock),
          price: parseFloat(formData.price),
          description: formData.description,
        }),
      });

      if (!response.ok) throw new Error('Failed to update product');

      await fetchProducts();
      
      setFormData({
        name: '',
        sku: '',
        category: 'Finished Goods',
        stock: '',
        minStock: '',
        price: '',
        description: '',
      });
      setEditingId(null);
      setShowEditModal(false);
    } catch (err) {
      setError('Failed to update product');
      console.error('Error:', err);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5001/inventory/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete product');

      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error:', err);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <DashboardLayout title="Inventory Management"><div>Loading...</div></DashboardLayout>;
  }

  const mockProducts = [
    { id: 1, name: 'Cotton Fabric Rolls', sku: 'FAB-001', category: 'Raw Materials', stock: 12, minStock: 20, price: 450, status: 'low' },
    { id: 2, name: 'Designer Sarees', sku: 'SAR-023', category: 'Finished Goods', stock: 35, minStock: 15, price: 2500, status: 'good' },
    { id: 3, name: 'Packaging Boxes', sku: 'PKG-105', category: 'Supplies', stock: 45, minStock: 50, status: 'low', price: 25 },
    { id: 4, name: 'Embroidery Thread Set', sku: 'THD-089', category: 'Raw Materials', stock: 78, minStock: 30, price: 350, status: 'good' },
    { id: 5, name: 'Kurti Collection', sku: 'KRT-156', category: 'Finished Goods', stock: 52, minStock: 25, price: 899, status: 'good' },
    { id: 6, name: 'Organic Spices Mix', sku: 'SPC-042', category: 'Products', stock: 8, minStock: 15, price: 180, status: 'low' },
    { id: 7, name: 'Leather Handbags', sku: 'BAG-278', category: 'Finished Goods', stock: 24, minStock: 10, price: 1500, status: 'good' },
    { id: 8, name: 'Jewelry Display Stands', sku: 'DSP-021', category: 'Supplies', stock: 15, minStock: 8, price: 120, status: 'good' },
  ];
  
  const displayProducts = products.length > 0 ? filteredProducts : mockProducts;
  const totalValue = displayProducts.reduce((sum, p) => sum + (p.stock * p.price), 0);
  const lowStockCount = displayProducts.filter(p => p.status === 'low').length;
  
  return (
    <DashboardLayout title="Inventory Management">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Total Products</p>
              <h3 className="mb-2">{displayProducts.length}</h3>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {displayProducts.map((product) => (
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
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="text-[var(--color-teal)] hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:underline text-sm"
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
      </Card>
      
      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" padding="lg">
            <h3 className="mb-6">Edit Product</h3>
            
            <form onSubmit={handleUpdateProduct} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="edit-productName" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="edit-productName"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-sku" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="edit-sku"
                    value={formData.sku}
                    onChange={(e) => handleFormChange('sku', e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="PRD-001"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Category
                </label>
                <select
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
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
                  <label htmlFor="edit-stock" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    id="edit-stock"
                    value={formData.stock}
                    onChange={(e) => handleFormChange('stock', e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-minStock" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Minimum Stock
                  </label>
                  <input
                    type="number"
                    id="edit-minStock"
                    value={formData.minStock}
                    onChange={(e) => handleFormChange('minStock', e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="edit-price"
                    value={formData.price}
                    onChange={(e) => handleFormChange('price', e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="Add product description..."
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Update Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingId(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" padding="lg">
            <h3 className="mb-6">Add New Product</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
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
                    value={formData.sku}
                    onChange={(e) => handleFormChange('sku', e.target.value)}
                    required
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
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
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
                    value={formData.stock}
                    onChange={(e) => handleFormChange('stock', e.target.value)}
                    required
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
                    value={formData.minStock}
                    onChange={(e) => handleFormChange('minStock', e.target.value)}
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
                    value={formData.price}
                    onChange={(e) => handleFormChange('price', e.target.value)}
                    required
                    step="0.01"
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
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
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
