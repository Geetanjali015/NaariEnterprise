import { useState } from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const transactions = [
  { id: 1, date: '2026-01-09', type: 'income', category: 'Product Sales', description: 'Sale #1234', amount: 12500 },
  { id: 2, date: '2026-01-08', type: 'expense', category: 'Inventory', description: 'Stock purchase', amount: 8000 },
  { id: 3, date: '2026-01-08', type: 'income', category: 'Product Sales', description: 'Sale #1235', amount: 15000 },
  { id: 4, date: '2026-01-07', type: 'expense', category: 'Marketing', description: 'Social media ads', amount: 3500 },
  { id: 5, date: '2026-01-07', type: 'income', category: 'Product Sales', description: 'Sale #1236', amount: 9800 },
  { id: 6, date: '2026-01-06', type: 'expense', category: 'Operations', description: 'Packaging materials', amount: 2200 },
  { id: 7, date: '2026-01-06', type: 'income', category: 'Product Sales', description: 'Sale #1237', amount: 18500 },
  { id: 8, date: '2026-01-05', type: 'expense', category: 'Utilities', description: 'Internet & phone', amount: 1500 },
  { id: 9, date: '2026-01-05', type: 'income', category: 'Product Sales', description: 'Sale #1238', amount: 11200 },
  { id: 10, date: '2026-01-04', type: 'expense', category: 'Logistics', description: 'Delivery charges', amount: 4500 },
];

export function IncomeExpensePage() {
  const [filterType, setFilterType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredTransactions = transactions.filter(t => 
    filterType === 'all' || t.type === filterType
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transaction addition
    setIsAddDialogOpen(false);
    setNewTransaction({
      type: 'income',
      category: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Income & Expense</h1>
          <p className="text-gray-600 mt-1">Track and manage your business transactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select 
                  value={newTransaction.type} 
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Category</Label>
                <Select 
                  value={newTransaction.category} 
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {newTransaction.type === 'income' ? (
                      <>
                        <SelectItem value="Product Sales">Product Sales</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Other Income">Other Income</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Inventory">Inventory</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="Other Expense">Other Expense</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  placeholder="Enter description"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  placeholder="0"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white">
                Add Transaction
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Total Income</p>
          <p className="text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString('en-IN')}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Total Expense</p>
          <p className="text-3xl font-bold text-red-600">₹{totalExpense.toLocaleString('en-IN')}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-[#0F172A]">
          <p className="text-sm text-gray-600 mb-2">Net Profit</p>
          <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-[#14B8A6]' : 'text-red-600'}`}>
            ₹{netProfit.toLocaleString('en-IN')}
          </p>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
                <SelectItem value="expense">Expense Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="ml-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.category}</td>
                  <td className="py-3 px-4 text-sm text-[#0F172A] font-medium">{transaction.description}</td>
                  <td className={`py-3 px-4 text-sm font-bold text-right ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
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
