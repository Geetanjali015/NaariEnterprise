import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';

export default function AIInsights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded insights data
  const mockInsights = [
    {
      id: 1,
      title: 'High Expense Alert',
      description: 'Your transportation costs have increased by 25% compared to last month. Consider optimizing delivery routes or consolidating shipments.',
      category: 'Expenses',
      priority: 'high',
      status: 'active',
      impact_score: 92
    },
    {
      id: 2,
      title: 'Strong Revenue Growth',
      description: 'Your product sales in the electronics category grew by 38% this month. Consider increasing inventory for these products.',
      category: 'Revenue',
      priority: 'high',
      status: 'active',
      impact_score: 88
    },
    {
      id: 3,
      title: 'Inventory Optimization',
      description: 'You have ₹45,000 in slow-moving inventory. These items haven\'t sold in 90 days. Consider running a clearance sale.',
      category: 'Inventory',
      priority: 'medium',
      status: 'active',
      impact_score: 65
    },
    {
      id: 4,
      title: 'Seasonal Trend Detected',
      description: 'Monthly sales typically peak in the third week. Plan your inventory and marketing campaigns accordingly.',
      category: 'Trends',
      priority: 'medium',
      status: 'active',
      impact_score: 72
    }
  ];

  const displayInsights = insights.length > 0 ? insights : mockInsights;

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/ai/insights', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch insights');

      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/ai/insights/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update');

      fetchInsights();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <DashboardLayout title="AI Insights"><div>Loading...</div></DashboardLayout>;
  }

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <DashboardLayout title="Business Insights">
      {displayInsights.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto text-[var(--color-gray-400)] mb-4" />
            <p className="text-[var(--color-gray-600)]">No insights yet. Add some transactions to get started!</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayInsights.map((insight) => (
            <Card key={insight.id} className={`border-2 ${priorityColor(insight.priority)}`} padding="lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{insight.title}</h3>
                    <StatusBadge status={insight.priority === 'high' ? 'error' : insight.priority === 'medium' ? 'warning' : 'success'}>
                      {insight.priority.toUpperCase()}
                    </StatusBadge>
                    <span className="text-sm bg-[var(--color-teal)] bg-opacity-20 text-[var(--color-teal)] px-2 py-1 rounded">
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-[var(--color-gray-700)] mb-3">{insight.description}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-[var(--color-teal)]" />
                    <span className="text-sm text-[var(--color-gray-600)]">
                      Potential Impact: {insight.impact_score}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleStatusChange(insight.id, 'applied')}
                    className="px-3 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 text-sm font-medium"
                  >
                    Applied
                  </button>
                  <button
                    onClick={() => handleStatusChange(insight.id, 'ignored')}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm font-medium"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
