import { Download, TrendingUp, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', income: 45000, expense: 32000, profit: 13000 },
  { month: 'Feb', income: 52000, expense: 35000, profit: 17000 },
  { month: 'Mar', income: 48000, expense: 31000, profit: 17000 },
  { month: 'Apr', income: 61000, expense: 38000, profit: 23000 },
  { month: 'May', income: 58000, expense: 36000, profit: 22000 },
  { month: 'Jun', income: 67000, expense: 40000, profit: 27000 },
];

const expenseDistribution = [
  { name: 'Inventory', value: 45, color: '#0F172A' },
  { name: 'Marketing', value: 20, color: '#14B8A6' },
  { name: 'Operations', value: 15, color: '#D4AF37' },
  { name: 'Logistics', value: 12, color: '#4B5563' },
  { name: 'Utilities', value: 8, color: '#94A3B8' },
];

const bestSelling = [
  { name: 'Designer Saree Collection', units: 45, revenue: 382500 },
  { name: 'Cotton Kurta Set', units: 89, revenue: 195800 },
  { name: 'Natural Lip Balm', units: 234, revenue: 58500 },
  { name: 'Organic Honey', units: 167, revenue: 108550 },
  { name: 'Handmade Jewelry Set', units: 52, revenue: 182000 },
];

export function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your business performance</p>
        </div>
        <Button variant="outline" className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-[#14B8A6]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-[#0F172A]">₹3,31,000</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+18.2%</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#14B8A6]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-[#0F172A]">₹2,12,000</p>
              <p className="text-sm text-gray-600 mt-2">64% of revenue</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#D4AF37]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Profit</p>
              <p className="text-2xl font-bold text-[#14B8A6]">₹1,19,000</p>
              <p className="text-sm text-gray-600 mt-2">36% margin</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#0F172A]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Monthly Growth</p>
              <p className="text-2xl font-bold text-[#0F172A]">14.5%</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>Trending up</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Period Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Reporting Period:</span>
          <span className="text-sm text-[#0F172A] font-bold">January - June 2026</span>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Profit Chart */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Monthly Financial Performance</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Bar dataKey="income" fill="#14B8A6" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#EF4444" name="Expense" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#0F172A" name="Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Expense Distribution Pie Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={expenseDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Profit Trend Line Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Profit Trend Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#14B8A6" 
              strokeWidth={3}
              name="Monthly Profit"
              dot={{ fill: '#14B8A6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Best Selling Products */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product Name</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Units Sold</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {bestSelling.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 last:border-0">
                  <td className="py-3 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-[#D4AF37] text-[#0F172A]' :
                      index === 1 ? 'bg-gray-300 text-gray-800' :
                      index === 2 ? 'bg-amber-200 text-amber-900' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#0F172A] font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-600 font-medium">{product.units}</td>
                  <td className="py-3 px-4 text-sm text-right font-bold text-[#14B8A6]">
                    ₹{product.revenue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-[#14B8A6]/10 to-white border-l-4 border-l-[#14B8A6]">
          <h3 className="font-bold text-[#0F172A] mb-2">Best Performing Month</h3>
          <p className="text-2xl font-bold text-[#14B8A6] mb-2">June 2026</p>
          <p className="text-sm text-gray-600">
            Achieved highest revenue of ₹67,000 with a profit margin of 40.3%
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-[#D4AF37]/10 to-white border-l-4 border-l-[#D4AF37]">
          <h3 className="font-bold text-[#0F172A] mb-2">Growth Opportunity</h3>
          <p className="text-2xl font-bold text-[#D4AF37] mb-2">Inventory Optimization</p>
          <p className="text-sm text-gray-600">
            45% of expenses on inventory. Consider lean inventory management strategies.
          </p>
        </Card>
      </div>
    </div>
  );
}
