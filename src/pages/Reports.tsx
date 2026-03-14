import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const monthlyProfit = [
    { month: 'Jan', profit: 13000 },
    { month: 'Feb', profit: 17000 },
    { month: 'Mar', profit: 15000 },
    { month: 'Apr', profit: 23000 },
    { month: 'May', profit: 22000 },
    { month: 'Jun', profit: 30000 },
  ];
  
  const expenseDistribution = [
    { name: 'Inventory', value: 35000, color: '#0d9488' },
    { name: 'Marketing', value: 12000, color: '#0f1f3d' },
    { name: 'Operations', value: 18000, color: '#d4af37' },
    { name: 'Salaries', value: 25000, color: '#2d3748' },
    { name: 'Utilities', value: 8000, color: '#a0aec0' },
  ];
  
  const bestSellingProducts = [
    { product: 'Designer Sarees', units: 145, revenue: 362500 },
    { product: 'Kurti Collection', units: 128, revenue: 115072 },
    { product: 'Leather Handbags', units: 89, revenue: 133500 },
    { product: 'Cotton Fabric Rolls', units: 76, revenue: 34200 },
    { product: 'Embroidery Thread Set', units: 52, revenue: 18200 },
  ];
  
  const categoryRevenue = [
    { category: 'Jan', 'Finished Goods': 45000, 'Raw Materials': 12000, 'Products': 8000 },
    { category: 'Feb', 'Finished Goods': 52000, 'Raw Materials': 14000, 'Products': 9500 },
    { category: 'Mar', 'Finished Goods': 48000, 'Raw Materials': 13000, 'Products': 8800 },
    { category: 'Apr', 'Finished Goods': 61000, 'Raw Materials': 15000, 'Products': 11000 },
    { category: 'May', 'Finished Goods': 58000, 'Raw Materials': 16000, 'Products': 10500 },
    { category: 'Jun', 'Finished Goods': 70000, 'Raw Materials': 18000, 'Products': 12000 },
  ];
  
  const totalExpense = expenseDistribution.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <DashboardLayout title="Reports & Analytics">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[var(--color-gray-600)] mb-1">Reporting Period</p>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-[var(--color-teal)]" />
            <span className="font-medium">January 2026 - June 2026</span>
          </div>
        </div>
        <Button variant="primary" size="md">
          <Download size={16} className="mr-2" />
          Download Full Report
        </Button>
      </div>
      
      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Profit Chart */}
        <Card padding="lg">
          <div className="mb-6">
            <h3 className="mb-1">Monthly Profit Trend</h3>
            <p className="text-sm text-[var(--color-gray-600)]">Net profit over the last 6 months</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProfit}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#0d9488" strokeWidth={3} dot={{ fill: '#0d9488', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-gray-600)]">Average Monthly Profit</span>
              <span className="font-medium text-[var(--color-navy)]">₹20,000</span>
            </div>
          </div>
        </Card>
        
        {/* Expense Distribution */}
        <Card padding="lg">
          <div className="mb-6">
            <h3 className="mb-1">Expense Distribution</h3>
            <p className="text-sm text-[var(--color-gray-600)]">Breakdown by category</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
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
          
          <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-gray-600)]">Total Expenses</span>
              <span className="font-medium text-[var(--color-navy)]">₹{totalExpense.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Category Revenue */}
      <Card padding="lg" className="mb-8">
        <div className="mb-6">
          <h3 className="mb-1">Revenue by Category</h3>
          <p className="text-sm text-[var(--color-gray-600)]">Product category performance over time</p>
        </div>
        
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={categoryRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="category" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Finished Goods" fill="#0d9488" />
            <Bar dataKey="Raw Materials" fill="#0f1f3d" />
            <Bar dataKey="Products" fill="#d4af37" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      {/* Best Selling Products */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="mb-1">Best Selling Products</h3>
            <p className="text-sm text-[var(--color-gray-600)]">Top performers by revenue</p>
          </div>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-gray-200)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Product</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Units Sold</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Revenue</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-gray-600)]">Performance</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingProducts.map((product, index) => (
                <tr key={index} className="border-b border-[var(--color-gray-100)] hover:bg-[var(--color-gray-50)]">
                  <td className="py-4 px-4">
                    <div className="w-8 h-8 bg-[var(--color-teal)] bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-[var(--color-teal)]">{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-[var(--color-gray-900)]">{product.product}</td>
                  <td className="py-4 px-4 text-center text-sm text-[var(--color-gray-700)]">{product.units}</td>
                  <td className="py-4 px-4 text-right text-sm font-medium text-[var(--color-gray-900)]">
                    ₹{product.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      <TrendingUp size={16} />
                      <span className="text-sm">Strong</span>
                    </div>
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
