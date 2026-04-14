import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import { Activity, TrendingUp, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';

export default function AIHealth() {
  const mockHealthData = {
    overall_score: 74,
    status: 'Good',
    last_updated: '2024-01-15',
    components: [
      {
        id: 1,
        name: 'Revenue Health',
        score: 82,
        status: 'Excellent',
        icon: '📈',
        details: 'Consistent growth with 28% YoY increase. Peak seasons well-managed.',
        trend: 'up',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-l-green-500'
      },
      {
        id: 2,
        name: 'Cash Flow',
        score: 68,
        status: 'Good',
        icon: '💰',
        details: 'Average days payable: 45 days. Receivables collecting within 30 days.',
        trend: 'stable',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-l-blue-500'
      },
      {
        id: 3,
        name: 'Profitability',
        score: 71,
        status: 'Good',
        icon: '💵',
        details: 'Net margin: 12%, Gross margin: 38%. Within industry benchmarks.',
        trend: 'up',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-l-emerald-500'
      },
      {
        id: 4,
        name: 'Inventory Management',
        score: 65,
        status: 'Good',
        icon: '📦',
        details: '₹2,45,000 in slow-moving stock. Turnover ratio: 5.2x annually.',
        trend: 'down',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-l-orange-500'
      },
      {
        id: 5,
        name: 'Debt Management',
        score: 79,
        status: 'Excellent',
        icon: '📊',
        details: 'Debt-to-Equity: 0.42. Low leverage with manageable monthly payments.',
        trend: 'up',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-l-purple-500'
      },
      {
        id: 6,
        name: 'Customer Health',
        score: 75,
        status: 'Good',
        icon: '👥',
        details: 'Repeat customer rate: 62%. Average order value stable at ₹8,500.',
        trend: 'up',
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        borderColor: 'border-l-pink-500'
      }
    ],
    risks: [
      {
        id: 1,
        title: 'Seasonal Revenue Fluctuation',
        severity: 'Medium',
        description: 'Q3 typically shows 35% drop. Consider counter-seasonal offerings.',
        recommendation: 'Develop off-season product mix'
      },
      {
        id: 2,
        title: 'Concentration Risk',
        severity: 'Low',
        description: 'Top 3 customers represent 28% of revenue. Diversify customer base.',
        recommendation: 'Execute targeted acquisition campaigns'
      },
      {
        id: 3,
        title: 'Slow-Moving Inventory',
        severity: 'Medium',
        description: '₹2,45,000 inventory not moving for 6+ months',
        recommendation: 'Run clearance sales, consider donation for tax benefit'
      }
    ],
    improvements: [
      {
        id: 1,
        metric: 'Increase Revenue by 25%',
        current: '₹85 lakhs',
        target: '₹1.06 crores',
        timeline: '12 months',
        actions: ['Expand product lines', 'Increase marketing budget', 'Open new channels']
      },
      {
        id: 2,
        metric: 'Reduce Inventory Holding',
        current: '₹8.5L average',
        target: '₹6.5L average',
        timeline: '6 months',
        actions: ['Clear slow-moving stock', 'Optimize procurement', 'Implement JIT']
      },
      {
        id: 3,
        metric: 'Improve Profitability to 15%',
        current: '12% net margin',
        target: '15% net margin',
        timeline: '9 months',
        actions: ['Negotiate supplier rates', 'Reduce operational costs', 'Increase efficiency']
      }
    ]
  };

  const getStatusColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Critical';
  };

  return (
    <DashboardLayout title="Business Health Analysis">
      <div className="space-y-6">
        {/* Overall Score */}
        <Card padding="lg" className="bg-gradient-to-r from-violet-50 via-rose-50 to-orange-50 border-2 border-violet-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">Overall Business Health Score</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-violet-700">{mockHealthData.overall_score}</span>
                <span className={`text-2xl font-semibold ${getStatusColor(mockHealthData.overall_score)}`}>
                  {getStatusLabel(mockHealthData.overall_score)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">Last assessed: {mockHealthData.last_updated}</p>
            </div>
            <Activity size={80} className="text-violet-400 opacity-50" />
          </div>
        </Card>

        {/* Health Components */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-violet-600" />
            Health Components
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockHealthData.components.map((component) => (
              <Card key={component.id} padding="md" className={`${component.bgColor} border-l-4 ${component.borderColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl">{component.icon}</span>
                    <h4 className="font-semibold text-gray-900 text-sm mt-1">{component.name}</h4>
                  </div>
                  {component.trend === 'up' && <TrendingUp size={18} className="text-green-600" />}
                  {component.trend === 'down' && <TrendingDown size={18} className="text-orange-600" />}
                  {component.trend === 'stable' && <span className="text-blue-600">→</span>}
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-2xl font-bold text-gray-900">{component.score}</span>
                    <span className={`text-xs font-semibold ${component.color}`}>{component.status}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${component.color.replace('text', 'bg')}`}
                      style={{ width: `${component.score}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{component.details}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            Risk Assessment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockHealthData.risks.map((risk) => (
              <Card key={risk.id} padding="md" className="border-l-4 border-l-red-500 bg-red-50">
                <div className="mb-2">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{risk.title}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      risk.severity === 'High' ? 'bg-red-200 text-red-700' :
                      risk.severity === 'Medium' ? 'bg-orange-200 text-orange-700' :
                      'bg-yellow-200 text-yellow-700'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{risk.description}</p>
                  <div className="bg-white p-2 rounded text-sm">
                    <p className="font-semibold text-violet-600">✓ Recommendation:</p>
                    <p className="text-gray-700">{risk.recommendation}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Improvement Opportunities */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-600" />
            Growth Opportunities
          </h3>
          <div className="space-y-4">
            {mockHealthData.improvements.map((improvement) => (
              <Card key={improvement.id} padding="lg" className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{improvement.metric}</h4>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Current</p>
                      <p className="font-semibold text-gray-900">{improvement.current}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl text-green-600">→</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Target</p>
                      <p className="font-semibold text-gray-900">{improvement.target}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">Expected completion: {improvement.timeline}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Action Items:</p>
                  <ul className="space-y-2">
                    {improvement.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 font-bold mt-0.5">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Health Score Breakdown */}
        <Card padding="lg" className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200">
          <h3 className="font-bold text-gray-900 mb-4">📊 Score Calculation Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-800 mb-2">Components (40% weight):</p>
              <ul className="text-gray-700 space-y-1">
                <li>• Revenue Growth: 15%</li>
                <li>• Profitability: 12%</li>
                <li>• Customer Retention: 8%</li>
                <li>• Efficiency: 5%</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">Financial Health (60% weight):</p>
              <ul className="text-gray-700 space-y-1">
                <li>• Cash Flow Management: 20%</li>
                <li>• Debt Management: 15%</li>
                <li>• Inventory Health: 15%</li>
                <li>• Risk Assessment: 10%</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
