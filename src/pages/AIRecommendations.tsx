import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import { Lightbulb, Zap, TrendingUp } from 'lucide-react';

export default function AIRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const mockRecommendations = [
    {
      id: 1,
      category: 'Cost Optimization',
      title: 'Negotiate Supplier Rates',
      description: 'You\'ve purchased from the same supplier for 8 months. Time to negotiate better rates.',
      action_items: ['Request rate reduction quotes', 'Compare with alternative suppliers', 'Prepare to commit longer term'],
      priority: 'high',
      impact_percentage: 18,
      implementation_time: '1-2 weeks'
    },
    {
      id: 2,
      category: 'Revenue Growth',
      title: 'Expand Best-Selling Category',
      description: 'Electronics products showed 38% growth. Increase inventory allocation here.',
      action_items: ['Analyze top-selling SKUs', 'Increase purchase orders', 'Add complementary products'],
      priority: 'high',
      impact_percentage: 25,
      implementation_time: '2-3 weeks'
    },
    {
      id: 3,
      category: 'Operations',
      title: 'Implement Digital Invoicing',
      description: 'Currently spending 6 hours/week on manual billing. Automate with digital invoicing.',
      action_items: ['Evaluate invoicing software', 'Train team on new system', 'Migrate existing records'],
      priority: 'medium',
      impact_percentage: 12,
      implementation_time: '1 week'
    },
    {
      id: 4,
      category: 'Revenue Growth',
      title: 'Launch Seasonal Promotion',
      description: 'Sales peak in week 3 of each month. Plan promotions around this pattern.',
      action_items: ['Design seasonal offers', 'Plan inventory around peaks', 'Create marketing calendar'],
      priority: 'medium',
      impact_percentage: 15,
      implementation_time: '10 days'
    },
    {
      id: 5,
      category: 'Cost Optimization',
      title: 'Reduce Slow-Moving Inventory',
      description: 'Clear ₹45,000 in stock not sold in 90 days. Run targeted clearance sale.',
      action_items: ['Identify slow items', 'Set competitive pricing', 'Run email campaign'],
      priority: 'medium',
      impact_percentage: 8,
      implementation_time: '3-5 days'
    }
  ];

  const categories = ['All', ...new Set(mockRecommendations.map(r => r.category))];
  const filtered = selectedCategory === 'All' 
    ? mockRecommendations 
    : mockRecommendations.filter(r => r.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 20) return 'text-green-600 font-bold';
    if (impact >= 10) return 'text-blue-600 font-bold';
    return 'text-gray-600';
  };

  return (
    <DashboardLayout title="Smart Recommendations">
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-rose)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((rec) => (
            <Card key={rec.id} padding="lg" className="border-l-4 border-l-[var(--color-violet)]">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="text-orange-600" size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{rec.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm border font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{rec.description}</p>

                  {rec.action_items && rec.action_items.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Action Steps:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {rec.action_items.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-[var(--color-violet)]">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Expected Impact</p>
                      <p className={getImpactColor(rec.impact_percentage)}>
                        +{rec.impact_percentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Implementation Time</p>
                      <p className="font-semibold text-gray-800">{rec.implementation_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card padding="lg" className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Implementation Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Start with high-priority, quick-win recommendations</li>
            <li>✓ Track the impact of each recommendation you implement</li>
            <li>✓ Adjust based on your specific business needs</li>
            <li>✓ Review recommendations monthly as your business grows</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
