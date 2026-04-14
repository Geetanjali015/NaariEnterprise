import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Lightbulb, Zap, CheckSquare, TrendingUp, DollarSign, Activity, Target } from 'lucide-react';

export default function AIGuidance() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/ai/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard');
      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="AI Guidance">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your AI insights...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (score >= 40) return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  // Hardcoded data with rich metrics
  const mockDashboard = {
    health_score: { score: 74, label: 'Good' },
    active_insights: 2,
    loan_eligibility_score: 85,
    growth_potential: 37,
    recommendations_count: 5,
    checklist_tasks: 8,
    available_schemes: 4,
    key_metric: 'You are on track for growth - Your profit margin increased by 12% this month. Consider expanding to new product categories.',
  };

  const displayDashboard = dashboard || mockDashboard;
  const healthStatus = getHealthColor(displayDashboard?.health_score?.score || 0);

  const aiFeatures = [
    {
      id: 'insights',
      title: 'Business Insights',
      description: 'Smart insights about your expenses, revenue, and inventory',
      icon: <Lightbulb size={32} className="text-orange-500" />,
      count: displayDashboard?.active_insights || 2,
      color: 'from-orange-50 to-red-50',
      route: '/ai-insights'
    },
    {
      id: 'loan',
      title: 'Loan Eligibility',
      description: 'Check your business loan eligibility and eligible amount',
      icon: <DollarSign size={32} className="text-green-500" />,
      score: displayDashboard?.loan_eligibility_score || 85,
      color: 'from-green-50 to-teal-50',
      route: '/ai-loan'
    },
    {
      id: 'recommendations',
      title: 'Smart Recommendations',
      description: 'AI-powered recommendations to grow your business',
      icon: <Zap size={32} className="text-violet-500" />,
      count: displayDashboard?.recommendations_count || 5,
      color: 'from-violet-50 to-purple-50',
      route: '/ai-recommendations'
    },
    {
      id: 'checklist',
      title: 'Growth Checklist',
      description: 'Track your business growth milestones and goals',
      icon: <CheckSquare size={32} className="text-blue-500" />,
      count: displayDashboard?.checklist_tasks || 8,
      color: 'from-blue-50 to-indigo-50',
      route: '/ai-checklist'
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      description: 'Explore government loan schemes for your business',
      icon: <Target size={32} className="text-pink-500" />,
      count: displayDashboard?.available_schemes || 4,
      color: 'from-pink-50 to-rose-50',
      route: '/ai-schemes'
    },
    {
      id: 'health',
      title: 'Business Health',
      description: 'Detailed analysis of your business health metrics',
      icon: <Activity size={32} className="text-teal-500" />,
      score: displayDashboard?.health_score?.score || 74,
      color: 'from-teal-50 to-green-50',
      route: '/ai-health'
    }
  ];

  return (
    <DashboardLayout title="AI Business Guidance">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="lg" className={`${healthStatus.bg} border-2 ${healthStatus.border}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Business Health Score</p>
                <p className={`text-3xl font-bold ${healthStatus.color}`}>{displayDashboard?.health_score?.score || 0}</p>
                <p className={`text-xs font-semibold ${healthStatus.color} mt-1`}>{healthStatus.label}</p>
              </div>
              <Activity size={32} className={`${healthStatus.color} opacity-20`} />
            </div>
          </Card>

          <Card padding="lg" className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Active Insights</p>
                <p className="text-3xl font-bold text-orange-600">{displayDashboard?.active_insights || 0}</p>
                <p className="text-xs text-orange-600 font-semibold mt-1">New opportunities found</p>
              </div>
              <Lightbulb size={32} className="text-orange-400 opacity-20" />
            </div>
          </Card>

          <Card padding="lg" className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Loan Eligibility</p>
                <p className="text-3xl font-bold text-green-600">{displayDashboard?.loan_eligibility_score || 0}</p>
                <p className="text-xs text-green-600 font-semibold mt-1">Out of 100</p>
              </div>
              <DollarSign size={32} className="text-green-400 opacity-20" />
            </div>
          </Card>

          <Card padding="lg" className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Growth Potential</p>
                <p className="text-3xl font-bold text-purple-600">{displayDashboard?.growth_potential || 0}%</p>
                <p className="text-xs text-purple-600 font-semibold mt-1">Upside potential</p>
              </div>
              <TrendingUp size={32} className="text-purple-400 opacity-20" />
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiFeatures.map((feature) => (
              <div key={feature.id} onClick={() => navigate(feature.route)}>
                <Card padding="lg" className={`bg-gradient-to-br ${feature.color} border-2 border-gray-200 cursor-pointer hover:shadow-lg transition-all hover:border-violet-300`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-white p-3 rounded-lg">{feature.icon}</div>
                    {feature.count !== undefined && <StatusBadge status={feature.count > 0 ? 'success' : 'neutral'}>{feature.count}</StatusBadge>}
                    {feature.score !== undefined && <StatusBadge status={feature.score >= 60 ? 'success' : 'warning'}>{feature.score}</StatusBadge>}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700">Explore <span>→</span></div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {displayDashboard?.key_metric && (
          <Card padding="lg" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300">
            <div className="flex gap-4">
              <BarChart3 size={32} className="text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">AI Recommendation</h3>
                <p className="text-blue-800">{displayDashboard.key_metric}</p>
              </div>
            </div>
          </Card>
        )}

        <Card padding="lg">
          <h3 className="font-bold text-lg mb-4">🚀 Getting Started</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-l-violet-500 pl-4">
              <p className="font-semibold text-gray-900 mb-2">1. Review Your Insights</p>
              <p className="text-sm text-gray-700">Start by exploring the Business Insights section to understand your finances better.</p>
            </div>
            <div className="border-l-4 border-l-rose-500 pl-4">
              <p className="font-semibold text-gray-900 mb-2">2. Check Loan Options</p>
              <p className="text-sm text-gray-700">Explore your loan eligibility and government schemes available for your business type.</p>
            </div>
            <div className="border-l-4 border-l-orange-500 pl-4">
              <p className="font-semibold text-gray-900 mb-2">3. Follow Recommendations</p>
              <p className="text-sm text-gray-700">Implement AI recommendations to improve your business metrics and health score.</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
