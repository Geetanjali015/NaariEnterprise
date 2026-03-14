import { useState } from 'react';
import { Plus, Search, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { StatusBadge } from './StatusBadge';

const products = [
  { id: 1, name: 'Designer Saree Collection', sku: 'SAR-001', stock: 3, price: 8500, status: 'low' as const },
  { id: 2, name: 'Organic Face Cream', sku: 'BEA-012', stock: 8, price: 1200, status: 'low' as const },
  { id: 3, name: 'Handmade Jewelry Set', sku: 'JEW-034', stock: 5, price: 3500, status: 'low' as const },
  { id: 4, name: 'Cotton Kurta Set', sku: 'APP-045', stock: 45, price: 2200, status: 'active' as const },
  { id: 5, name: 'Herbal Tea Collection', sku: 'FOO-023', stock: 67, price: 450, status: 'active' as const },
  { id: 6, name: 'Handwoven Basket', sku: 'CRA-089', stock: 0, price: 1800, status: 'out' as const },
  { id: 7, name: 'Natural Lip Balm', sku: 'BEA-056', stock: 120, price: 250, status: 'active' as const },
  { id: 8, name: 'Embroidered Cushion Cover', sku: 'HOM-078', stock: 28, price: 850, status: 'active' as const },
  { id: 9, name: 'Organic Honey', sku: 'FOO-091', stock: 34, price: 650, status: 'active' as const },
  { id: 10, name: 'Silver Anklet', sku: 'JEW-102', stock: 12, price: 4500, status: 'active' as const },
];

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    stock: '',
    price: '',
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle product addition
    setIsAddDialogOpen(false);
    setNewProduct({ name: '', sku: '', stock: '', price: '' });
  };

  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0);
  const lowStockCount = products.filter(p => p.status === 'low').length;
  const outOfStockCount = products.filter(p => p.status === 'out').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label>SKU</Label>
                <Input
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  placeholder="e.g., PRD-001"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="0"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="0"
                  className="mt-1"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white">
                Add Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-[#0F172A]">
          <p className="text-sm text-gray-600 mb-2">Total Products</p>
          <p className="text-3xl font-bold text-[#0F172A]">{products.length}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-[#14B8A6]">
          <p className="text-sm text-gray-600 mb-2">Inventory Value</p>
          <p className="text-3xl font-bold text-[#14B8A6]">₹{totalValue.toLocaleString('en-IN')}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500">
          <p className="text-sm text-gray-600 mb-2">Low Stock</p>
          <p className="text-3xl font-bold text-amber-600">{lowStockCount}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600">{outOfStockCount}</p>
        </Card>
      </div>

      {/* Alert for Low/Out Stock */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <Card className="p-4 bg-amber-50 border-l-4 border-l-amber-500">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">Inventory Alert</p>
              <p className="text-sm text-amber-700 mt-1">
                {lowStockCount > 0 && `${lowStockCount} product(s) running low on stock. `}
                {outOfStockCount > 0 && `${outOfStockCount} product(s) out of stock.`}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search products by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Products Table */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">SKU</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Total Value</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                  <td className="py-3 px-4 text-sm text-[#0F172A] font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{product.sku}</td>
                  <td className="py-3 px-4 text-sm text-center">
                    <span className={`font-bold ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock < 10 ? 'text-amber-600' :
                      'text-gray-900'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-gray-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">
                    ₹{(product.stock * product.price).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={product.status}>
                      {product.status === 'active' ? 'In Stock' :
                       product.status === 'low' ? 'Low Stock' :
                       'Out of Stock'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
