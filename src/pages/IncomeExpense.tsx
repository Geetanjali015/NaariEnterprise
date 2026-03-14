import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { Plus, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

export default function IncomeExpense() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  
  const transactions = [
    { id: 1, date: '2026-01-09', type: 'Income', category: 'Product Sales', description: 'Fashion accessories sale', amount: 12500 },
    { id: 2, date: '2026-01-08', type: 'Expense', category: 'Inventory', description: 'Fabric purchase', amount: 8000 },
    { id: 3, date: '2026-01-08', type: 'Income', category: 'Service', description: 'Consultation fee', amount: 5500 },
    { id: 4, date: '2026-01-07', type: 'Expense', category: 'Marketing', description: 'Social media ads', amount: 2000 },
    { id: 5, date: '2026-01-07', type: 'Income', category: 'Product Sales', description: 'Online order', amount: 8200 },
    { id: 6, date: '2026-01-06', type: 'Expense', category: 'Operations', description: 'Rent payment', amount: 15000 },
    { id: 7, date: '2026-01-05', type: 'Income', category: 'Product Sales', description: 'Wholesale order', amount: 25000 },
    { id: 8, date: '2026-01-05', type: 'Expense', category: 'Utilities', description: 'Electricity bill', amount: 1800 },
  ];
  
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;
  
  return (
    <DashboardLayout title="Income & Expense Management">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Total Income</p>
              <h3 className="mb-2">₹{totalIncome.toLocaleString()}</h3>
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
              <h3 className="mb-2">₹{totalExpense.toLocaleString()}</h3>
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
              <h3 className="mb-2">₹{netProfit.toLocaleString()}</h3>
              <div className="flex items-center gap-1 text-sm text-[var(--color-teal)]">
                <TrendingUp size={16} />
                <span>{((netProfit / totalIncome) * 100).toFixed(1)}% margin</span>
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
                    <StatusBadge status={transaction.type === 'Income' ? 'success' : 'error'}>
                      {transaction.type}
                    </StatusBadge>
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.category}</td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.description}</td>
                  <td className={`py-4 px-4 text-sm text-right font-medium ${
                    transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'Income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
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
      
      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-lg w-full" padding="lg">
            <h3 className="mb-6">Add New Transaction</h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Transaction Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTransactionType('income')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      transactionType === 'income'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionType('expense')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      transactionType === 'expense'
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
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                >
                  {transactionType === 'income' ? (
                    <>
                      <option>Product Sales</option>
                      <option>Service Revenue</option>
                      <option>Consulting</option>
                      <option>Other Income</option>
                    </>
                  ) : (
                    <>
                      <option>Inventory</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                      <option>Utilities</option>
                      <option>Salaries</option>
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
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Description
                </label>
                <textarea
                  id="description"
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
