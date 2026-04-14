import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { Plus, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
}

export default function IncomeExpense() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, profit: 0, margin: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    category: 'Product Sales',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
      description: transaction.description,
      date: transaction.date,
    });
    setShowEditModal(true);
  };

  const handleUpdateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingId) return;
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5001/transactions/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: formData.type,
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        }),
      });

      if (!response.ok) throw new Error('Failed to update transaction');

      await fetchTransactions();
      await fetchSummary();
      
      setFormData({
        type: 'income',
        amount: '',
        category: 'Product Sales',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setEditingId(null);
      setShowEditModal(false);
    } catch (err) {
      setError('Failed to update transaction');
      console.error('Error:', err);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5001/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete transaction');

      await fetchTransactions();
      await fetchSummary();
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error:', err);
    }
  };

  // Fetch transactions
  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch transactions');
      
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/transactions/summary', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch summary');
      
      const data = await response.json();
      setSummary(data);
    } catch (err) {
      console.error('Summary error:', err);
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5001/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: formData.type,
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        }),
      });

      if (!response.ok) throw new Error('Failed to add transaction');

      // Refresh data
      await fetchTransactions();
      await fetchSummary();
      
      // Reset form
      setFormData({
        type: 'income',
        amount: '',
        category: 'Product Sales',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error:', err);
    }
  };

  const categories = {
    income: ['Product Sales', 'Service', 'Consulting', 'Other Income'],
    expense: ['Inventory', 'Marketing', 'Operations', 'Utilities', 'Other Expense'],
  };

  if (loading) {
    return <DashboardLayout title="Income & Expense Management"><div>Loading...</div></DashboardLayout>;
  }
  
  return (
    <DashboardLayout title="Income & Expense Management">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Total Income</p>
              <h3 className="mb-2">₹{summary.totalIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h3>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                <span>This month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Total Expenses</p>
              <h3 className="mb-2">₹{summary.totalExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h3>
              <div className="flex items-center gap-1 text-sm text-red-600">
                <TrendingDown size={16} />
                <span>This month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Net Profit</p>
              <h3 className="mb-2">₹{summary.profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h3>
              <div className="flex items-center gap-1 text-sm text-[var(--color-teal)]">
                <TrendingUp size={16} />
                <span>{summary.margin}% margin</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-[var(--color-teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-[var(--color-teal)]" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Transactions Table */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h3>All Transactions</h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
              <Plus size={16} className="mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-gray-200)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Description</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.date}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={transaction.type === 'income' ? 'success' : 'error'}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </StatusBadge>
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.category}</td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.description}</td>
                  <td className={`py-4 px-4 text-sm text-right font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditTransaction(transaction)}
                        className="text-[var(--color-teal)] hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTransaction(transaction.id)}
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
      
      
      {/* Edit Transaction Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-lg w-full" padding="lg">
            <h3 className="mb-6">Edit Transaction</h3>
            
            <form onSubmit={handleUpdateTransaction} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Transaction Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleFormChange('type', 'income')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'income'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormChange('type', 'expense')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'expense'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]'
                    }`}
                  >
                    Expense
                  </button>
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
                  {formData.type === 'income' ? (
                    <>
                      <option>Product Sales</option>
                      <option>Service</option>
                      <option>Consulting</option>
                      <option>Other Income</option>
                    </>
                  ) : (
                    <>
                      <option>Inventory</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                      <option>Utilities</option>
                      <option>Other Expense</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label htmlFor="edit-amount" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  id="edit-amount"
                  value={formData.amount}
                  onChange={(e) => handleFormChange('amount', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="Add transaction details..."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="edit-date" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="edit-date"
                  value={formData.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Update Transaction
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
      
      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-lg w-full" padding="lg">
            <h3 className="mb-6">Add New Transaction</h3>
            
            <form onSubmit={handleAddTransaction} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Transaction Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleFormChange('type', 'income')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'income'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormChange('type', 'expense')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'expense'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]'
                    }`}
                  >
                    Expense
                  </button>
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
                  {formData.type === 'income' ? (
                    <>
                      <option>Product Sales</option>
                      <option>Service</option>
                      <option>Consulting</option>
                      <option>Other Income</option>
                    </>
                  ) : (
                    <>
                      <option>Inventory</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                      <option>Utilities</option>
                      <option>Other Expense</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => handleFormChange('amount', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="Add transaction details..."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Add Transaction
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
