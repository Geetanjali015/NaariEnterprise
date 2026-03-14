import { TrendingUp, TrendingDown, Package, Plus, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 67000 },
];

const recentTransactions = [
  { id: 1, type: 'income', description: 'Product Sale - #1234', amount: 12500, date: '2026-01-09' },
  { id: 2, type: 'expense', description: 'Inventory Purchase', amount: -8000, date: '2026-01-08' },
  { id: 3, type: 'income', description: 'Product Sale - #1235', amount: 15000, date: '2026-01-08' },
  { id: 4, type: 'expense', description: 'Marketing - Social Media', amount: -3500, date: '2026-01-07' },
  { id: 5, type: 'income', description: 'Product Sale - #1236', amount: 9800, date: '2026-01-07' },
];

const lowStockItems = [
  { name: 'Designer Saree Collection', stock: 3, critical: true },
  { name: 'Organic Face Cream', stock: 8, critical: false },
  { name: 'Handmade Jewelry Set', stock: 5, critical: true },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-[#14B8A6]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Revenue</p>
              <p className="text-2xl font-bold text-[#0F172A]">₹12,500</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#14B8A6]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#D4AF37]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Profit</p>
              <p className="text-2xl font-bold text-[#0F172A]">₹67,000</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+8.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#0F172A]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Products</p>
              <p className="text-2xl font-bold text-[#0F172A]">248</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                <span>32 categories</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-[#0F172A]/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-[#0F172A]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Low Stock Alert</p>
              <p className="text-2xl font-bold text-[#0F172A]">3</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>Needs attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Income
          </Button>
          <Button variant="outline" className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
          <Button variant="outline" className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#14B8A6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0F172A]">{item.name}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {item.stock} units remaining
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.critical 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.critical ? 'Critical' : 'Low'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-sm text-[#0F172A] font-medium">
                    {transaction.description}
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
                  <td className={`py-3 px-4 text-sm font-bold text-right ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
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
