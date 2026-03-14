import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { TrendingUp, TrendingDown, Package, AlertCircle, Plus, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const performanceData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 58000, expenses: 36000 },
    { month: 'Jun', revenue: 70000, expenses: 40000 },
  ];
  
  const recentTransactions = [
    { id: 1, type: 'Income', description: 'Product Sales', amount: 12500, date: '2026-01-09' },
    { id: 2, type: 'Expense', description: 'Inventory Purchase', amount: -8000, date: '2026-01-08' },
    { id: 3, type: 'Income', description: 'Service Revenue', amount: 5500, date: '2026-01-07' },
    { id: 4, type: 'Expense', description: 'Marketing', amount: -2000, date: '2026-01-06' },
  ];
  
  const lowStockItems = [
    { name: 'Cotton Fabric Rolls', current: 12, minimum: 20 },
    { name: 'Packaging Boxes', current: 45, minimum: 50 },
    { name: 'Organic Spices Mix', current: 8, minimum: 15 },
  ];
  
  return (
    <DashboardLayout title="Dashboard">
      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Today's Revenue</p>
              <h3 className="mb-1">₹12,500</h3>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                <span>+18% from yesterday</span>
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
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Monthly Profit</p>
              <h3 className="mb-1">₹30,000</h3>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} />
                <span>+12% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-[var(--color-teal)] bg-opacity-10 rounded-lg flex items-center justify-center">
              <ArrowUpRight size={24} className="text-[var(--color-teal)]" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Inventory Status</p>
              <h3 className="mb-1">148 Items</h3>
              <div className="flex items-center gap-1 text-sm text-yellow-600">
                <AlertCircle size={16} />
                <span>3 low stock alerts</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-600)] mb-1">Today's Expenses</p>
              <h3 className="mb-1">₹3,200</h3>
              <div className="flex items-center gap-1 text-sm text-red-600">
                <TrendingDown size={16} />
                <span>-5% from yesterday</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-2" padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="mb-1">Business Performance</h3>
              <p className="text-sm text-[var(--color-gray-600)]">Revenue vs Expenses (Last 6 Months)</p>
            </div>
            <select className="px-4 py-2 border border-[var(--color-gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#0d9488" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#colorExpenses)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--color-teal)] rounded-full"></div>
              <span className="text-sm text-[var(--color-gray-600)]">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-[var(--color-gray-600)]">Expenses</span>
            </div>
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card padding="lg">
          <h3 className="mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="primary" size="md" className="w-full justify-start">
              <Plus size={20} className="mr-2" />
              Add Income
            </Button>
            <Button variant="outline" size="md" className="w-full justify-start">
              <Plus size={20} className="mr-2" />
              Add Expense
            </Button>
            <Button variant="outline" size="md" className="w-full justify-start">
              <Plus size={20} className="mr-2" />
              Add Product
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[var(--color-gray-200)]">
            <h4 className="mb-4">Low Stock Alerts</h4>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-[var(--color-gray-900)]">{item.name}</p>
                  <p className="text-xs text-[var(--color-gray-600)] mt-1">
                    Current: {item.current} | Min: {item.minimum}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h3>Recent Transactions</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-gray-200)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Description</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.date}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'Income' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--color-gray-700)]">{transaction.description}</td>
                  <td className={`py-4 px-4 text-sm text-right font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₹{Math.abs(transaction.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
