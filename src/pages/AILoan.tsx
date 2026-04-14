import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import { HelpCircle, CheckCircle, TrendingUp, DollarSign, Calculator, AlertCircle, BookOpen } from 'lucide-react';

export default function AILoan() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState('');

  // Your Business Data
  const businessData = {
    name: 'ABC Electronics & Retail',
    monthly_revenue: 850000,
    annual_revenue: 10200000,
    business_age_months: 36,
    monthly_profit: 102000,
    outstanding_receivables: 180000,
    current_inventory: 450000,
    existing_debt: 200000
  };

  // Eligibility Components Calculation
  const components = {
    revenue_stability: {
      score: 88,
      max: 100,
      weight: 25,
      label: 'Revenue Stability',
      description: 'How consistent and predictable your revenue is',
      factors: [
        { name: 'Monthly Revenue Consistency', value: '₹7-9.5L range', status: 'Strong', icon: '✓' },
        { name: 'Year-over-Year Growth', value: '15% growth', status: 'Good', icon: '✓' },
        { name: 'Seasonal Fluctuation', value: 'Managed', status: 'Good', icon: '✓' }
      ],
      calculation: 'Average of 3 months revenue / highest month revenue = 85% consistency = 88/100'
    },
    credit_behavior: {
      score: 92,
      max: 100,
      weight: 30,
      label: 'Credit Behavior',
      description: 'Your payment history and financial discipline',
      factors: [
        { name: 'Payment On-Time Rate', value: '98%', status: 'Excellent', icon: '✓' },
        { name: 'Default History', value: 'None', status: 'Excellent', icon: '✓' },
        { name: 'Credit Utilization', value: '35%', status: 'Healthy', icon: '✓' }
      ],
      calculation: 'On-time payments (40) + No defaults (30) + Good utilization (22) = 92/100'
    },
    business_age: {
      score: 75,
      max: 100,
      weight: 20,
      label: 'Business Age & Experience',
      description: 'How long your business has been operational',
      factors: [
        { name: 'Years in Operation', value: '3 years', status: 'Good', icon: '✓' },
        { name: 'Business Registration', value: 'GST, PAN, FSSAI', status: 'Registered', icon: '✓' },
        { name: 'Tax Compliance', value: 'All ITRs Filed', status: 'Good', icon: '✓' }
      ],
      calculation: 'Min 2 years required (20) + 3 years operation (30) + Full registration (25) = 75/100'
    },
    documentation: {
      score: 85,
      max: 100,
      weight: 15,
      label: 'Documentation Readiness',
      description: 'Completeness of required financial records',
      factors: [
        { name: 'Bank Statements', value: '24 months', status: 'Complete', icon: '✓' },
        { name: 'Income Tax Returns', value: '3 years', status: 'Filed', icon: '✓' },
        { name: 'Business Registration', value: 'GST Certificate', status: 'Available', icon: '✓' }
      ],
      calculation: 'Bank statements (30) + ITR/Tax docs (35) + Registrations (20) = 85/100'
    }
  };

  // Calculate Overall Eligibility Score
  const calculateOverallScore = () => {
    const weighted = 
      (components.revenue_stability.score * components.revenue_stability.weight +
       components.credit_behavior.score * components.credit_behavior.weight +
       components.business_age.score * components.business_age.weight +
       components.documentation.score * components.documentation.weight) / 100;
    return Math.round(weighted);
  };

  const overallScore = calculateOverallScore();
  const eligibleLoanAmount = 850000;

  // Loan Calculation Explanation
  const loanCalculation = {
    formula: 'Monthly Revenue × 10 × Repayment Capacity = Eligible Amount',
    steps: [
      {
        step: 1,
        title: 'Calculate Monthly Average Revenue',
        calculation: `₹${businessData.monthly_revenue.toLocaleString('en-IN')} (last 3 months average)`,
        explanation: 'Banks look at consistent revenue - average of last 3 months'
      },
      {
        step: 2,
        title: 'Monthly Profit After Tax',
        calculation: `₹${businessData.monthly_profit.toLocaleString('en-IN')} (EMI Repayment Capacity)`,
        explanation: 'After all expenses, how much can you pay monthly towards loan?'
      },
      {
        step: 3,
        title: 'Repayment Ratio (30-40% of profit)',
        calculation: `₹${(businessData.monthly_profit * 0.35).toLocaleString('en-IN')} per month (35% of profit)`,
        explanation: 'Banks recommend EMI should not exceed 35-40% of monthly profit'
      },
      {
        step: 4,
        title: 'Loan Tenure (Typically 3-5 years)',
        calculation: `EMI ₹${(businessData.monthly_profit * 0.35).toLocaleString('en-IN')} × 60 months = ₹${(businessData.monthly_profit * 0.35 * 60).toLocaleString('en-IN')}`,
        explanation: 'Total borrowable amount at 12% annual interest for 5 years'
      },
      {
        step: 5,
        title: 'Final Eligible Amount',
        calculation: `₹${eligibleLoanAmount.toLocaleString('en-IN')}`,
        explanation: 'This is what banks will approve based on your profile'
      }
    ]
  };

  // Eligibility Criteria Requirements
  const requirements = [
    { category: 'Age & Registration', items: ['Business must be 2+ years old', 'Valid GST Registration', 'PAN & Aadhar of owners'] },
    { category: 'Financial Health', items: ['Positive cash flow', 'Revenue ₹5L+ annually', 'Debt-to-Equity ratio < 2'] },
    { category: 'Banking', items: ['24 months bank statements', 'Regular account activity', 'No frequent overdrafts'] },
    { category: 'Documentation', items: ['3 years ITR filed', 'Business license', 'Property/Shop lease agreement'] }
  ];

  // What Affects Your Score
  const scoreFactors = [
    { factor: 'Consistent Monthly Revenue', impact: '+10-15 points', type: 'positive' },
    { factor: 'On-Time Payments', impact: '+15-20 points', type: 'positive' },
    { factor: 'Years in Business', impact: '+10-15 points', type: 'positive' },
    { factor: 'Complete Documentation', impact: '+10 points', type: 'positive' },
    { factor: 'Payment Defaults', impact: '-30-40 points', type: 'negative' },
    { factor: 'Low Revenue', impact: '-20-25 points', type: 'negative' },
    { factor: 'High Debt Ratio', impact: '-15-20 points', type: 'negative' },
    { factor: 'Incomplete Records', impact: '-10-15 points', type: 'negative' }
  ];

  // How to Improve
  const improvements = [
    { action: 'Maintain consistent monthly revenue', timeline: '3-6 months', impact: 'Increases revenue_stability score' },
    { action: 'Clear all outstanding dues on time', timeline: 'Immediate', impact: 'Boosts credit_behavior score' },
    { action: 'File GST & Income Tax Returns', timeline: 'Before applying', impact: 'Improves documentation score' },
    { action: 'Reduce existing debt', timeline: '3-6 months', impact: 'Improves debt ratios for higher loan amount' },
    { action: 'Maintain bank statements', timeline: 'Ongoing', impact: 'Strengthens all components' }
  ];

  const getStatusColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-700', label: 'Excellent' };
    if (score >= 70) return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Good' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Fair' };
    return { bg: 'bg-red-100', text: 'text-red-700', label: 'Poor' };
  };

  const overallStatus = getStatusColor(overallScore);

  return (
    <DashboardLayout title="Loan Eligibility - Complete Guide">
      <div className="space-y-6">
        
        {/* Main Score Card */}
        <Card padding="lg" className="bg-gradient-to-r from-violet-50 to-rose-50 border-2 border-violet-300">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Loan Eligibility Score</h2>
              <div className={`inline-block px-6 py-3 rounded-lg font-bold text-2xl ${overallStatus.bg} ${overallStatus.text} mb-4`}>
                {overallScore}/100 - {overallStatus.label}
              </div>
              <p className="text-gray-700 mb-3">Based on your business: <span className="font-semibold">{businessData.name}</span></p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Estimated Eligible Loan Amount:</p>
                <p className="text-3xl font-bold text-violet-600">₹{eligibleLoanAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-600 mt-1">At 12% interest for 5 years = ₹{Math.round(businessData.monthly_profit * 0.35).toLocaleString('en-IN')} EMI</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold text-violet-600 mb-2">{overallScore}</div>
              <div className="w-32 h-32 rounded-full border-8 border-violet-200 flex items-center justify-center">
                <TrendingUp size={60} className="text-violet-600" />
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
          {['overview', 'calculation', 'requirements', 'improvements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold whitespace-nowrap rounded-t-lg transition-all ${
                activeTab === tab
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Component Scores */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={24} className="text-violet-600" />
                Eligibility Components Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(components).map(([key, component]) => {
                  const status = getStatusColor(component.score);
                  return (
                    <Card key={key} padding="lg" className="border-l-4 border-l-violet-500">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{component.label}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${status.bg} ${status.text}`}>
                            {component.score}/{component.max}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-rose-500"
                            style={{ width: `${component.score}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Weight: {component.weight}% of total score</p>
                      </div>

                      {/* Factors */}
                      <button
                        onClick={() => setExpandedSection(expandedSection === key ? '' : key)}
                        className="text-violet-600 font-semibold text-sm hover:underline mb-3"
                      >
                        {expandedSection === key ? '▼ Hide Details' : '► Show Details'}
                      </button>

                      {expandedSection === key && (
                        <div className="bg-gray-50 p-3 rounded space-y-2 mb-3">
                          {component.factors.map((factor, idx) => (
                            <div key={idx} className="flex items-start justify-between text-sm">
                              <div>
                                <p className="font-semibold text-gray-900">{factor.name}</p>
                                <p className="text-gray-600">{factor.value}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                factor.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                                factor.status === 'Strong' ? 'bg-green-100 text-green-700' :
                                factor.status === 'Good' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {factor.status}
                              </span>
                            </div>
                          ))}
                          <div className="mt-3 pt-3 border-t border-gray-300">
                            <p className="text-xs font-semibold text-gray-700">How calculated:</p>
                            <p className="text-xs text-gray-600">{component.calculation}</p>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Score Factors */}
            <Card padding="lg" className="bg-blue-50 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-blue-600" />
                What Affects Your Eligibility Score?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scoreFactors.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${item.type === 'positive' ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-red-50 border-l-4 border-l-red-500'}`}>
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-900">{item.factor}</p>
                      <span className={`text-sm font-bold ${item.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Calculation Tab */}
        {activeTab === 'calculation' && (
          <div className="space-y-6">
            <Card padding="lg" className="bg-indigo-50 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Calculator size={24} className="text-indigo-600" />
                How is Your Loan Amount Calculated?
              </h3>
              <p className="text-gray-700 mb-4">
                Banks use a scientific formula to determine how much you can borrow:
              </p>
              <div className="bg-white p-4 rounded-lg mb-4 border-2 border-indigo-300">
                <p className="text-center font-bold text-lg text-indigo-600">{loanCalculation.formula}</p>
              </div>
            </Card>

            {/* Step by Step */}
            <div className="space-y-3">
              {loanCalculation.steps.map((step) => (
                <Card key={step.step} padding="md" className="border-l-4 border-l-indigo-500">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                      <div className="bg-indigo-50 p-3 rounded mb-2">
                        <p className="font-mono font-bold text-indigo-700">{step.calculation}</p>
                      </div>
                      <p className="text-sm text-gray-600">{step.explanation}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card padding="lg" className="bg-green-50 border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-3">Result</h3>
              <div className="text-center">
                <p className="text-5xl font-bold text-green-600 mb-2">₹{eligibleLoanAmount.toLocaleString('en-IN')}</p>
                <p className="text-gray-700">This is your approved loan amount</p>
              </div>
            </Card>
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Eligibility Requirements</h3>
            {requirements.map((req, idx) => (
              <Card key={idx} padding="lg" className="border-l-4 border-l-violet-500">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">{req.category}</h4>
                <ul className="space-y-2">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}

        {/* Improvements Tab */}
        {activeTab === 'improvements' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Improve Your Eligibility Score</h3>
            {improvements.map((imp, idx) => (
              <Card key={idx} padding="lg" className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900">{imp.action}</h4>
                  <span className="px-3 py-1 bg-green-200 text-green-700 text-xs font-bold rounded-full">
                    {imp.timeline}
                  </span>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-700"><span className="font-semibold">Impact:</span> {imp.impact}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
