import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Brain, TrendingUp, CheckCircle, AlertCircle, ExternalLink, Lightbulb, Target } from 'lucide-react';

export default function AIGuidance() {
  const loanEligibility = {
    eligible: true,
    amount: 500000,
    score: 78,
    factors: [
      { name: 'Business Revenue', status: 'good', description: 'Consistent monthly revenue growth' },
      { name: 'Credit History', status: 'good', description: 'Strong repayment track record' },
      { name: 'Business Age', status: 'moderate', description: '2 years in operation' },
      { name: 'Documentation', status: 'good', description: 'All documents complete' },
    ]
  };
  
  const governmentSchemes = [
    {
      name: 'MUDRA Yojana',
      type: 'Loan Scheme',
      eligibility: 'High',
      maxAmount: '₹10 Lakhs',
      description: 'Micro-units development refinance scheme for small businesses',
      link: '#'
    },
    {
      name: 'Stand-Up India',
      type: 'Credit Support',
      eligibility: 'Medium',
      maxAmount: '₹1 Crore',
      description: 'Loans for women entrepreneurs in manufacturing, services, or trading',
      link: '#'
    },
    {
      name: 'CGTMSE',
      type: 'Credit Guarantee',
      eligibility: 'High',
      maxAmount: '₹2 Crore',
      description: 'Collateral-free loans for MSMEs',
      link: '#'
    },
    {
      name: 'Mahila Udyam Nidhi Scheme',
      type: 'Subsidy',
      eligibility: 'High',
      maxAmount: '₹10 Lakhs',
      description: 'Special scheme for women entrepreneurs with subsidy benefits',
      link: '#'
    }
  ];
  
  const recommendations = [
    {
      category: 'Cost Optimization',
      priority: 'high',
      insights: [
        'Reduce inventory holding costs by optimizing stock levels',
        'Negotiate better rates with current suppliers (potential 12% savings)',
        'Consider bulk purchasing for frequently used materials'
      ]
    },
    {
      category: 'Revenue Growth',
      priority: 'high',
      insights: [
        'Expand product line based on best-sellers analysis',
        'Increase marketing budget for high-performing categories',
        'Target online sales channels to reach wider audience'
      ]
    },
    {
      category: 'Operations',
      priority: 'medium',
      insights: [
        'Automate invoice generation to save 5 hours/week',
        'Implement inventory alert system for better stock management',
        'Consider hiring part-time help during peak seasons'
      ]
    }
  ];
  
  const growthChecklist = [
    { task: 'Register for GST', completed: true },
    { task: 'Open business bank account', completed: true },
    { task: 'Set up digital payment systems', completed: true },
    { task: 'Create social media presence', completed: false },
    { task: 'Build professional website', completed: false },
    { task: 'Apply for MSME registration', completed: false },
    { task: 'Explore export opportunities', completed: false },
  ];
  
  const completedTasks = growthChecklist.filter(t => t.completed).length;
  const progressPercentage = (completedTasks / growthChecklist.length) * 100;
  
  return (
    <DashboardLayout title="AI Financial Guidance">
      {/* AI Insights Header */}
      <Card className="mb-8" padding="lg">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-[var(--color-teal)] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain size={32} className="text-[var(--color-teal)]" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2">AI-Powered Business Intelligence</h3>
            <p className="text-[var(--color-gray-600)] mb-4">
              Our AI analyzes your business data to provide personalized recommendations, 
              financial insights, and growth opportunities tailored specifically for your business.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm text-[var(--color-gray-700)]">12 Active Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-[var(--color-teal)]" />
                <span className="text-sm text-[var(--color-gray-700)]">23% Growth Potential</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Loan Eligibility */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2" padding="lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="mb-1">Loan Eligibility Analysis</h3>
              <p className="text-sm text-[var(--color-gray-600)]">Based on your business performance</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${loanEligibility.eligible ? 'bg-green-50' : 'bg-red-50'}`}>
              <span className={`font-medium ${loanEligibility.eligible ? 'text-green-700' : 'text-red-700'}`}>
                {loanEligibility.eligible ? 'Eligible' : 'Not Eligible'}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-end gap-4 mb-3">
              <div>
                <p className="text-sm text-[var(--color-gray-600)] mb-1">Eligible Amount</p>
                <h2 className="text-[var(--color-navy)]">₹{(loanEligibility.amount / 100000).toFixed(1)}L</h2>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-gray-600)]">Eligibility Score</span>
                  <span className="text-sm font-medium text-[var(--color-navy)]">{loanEligibility.score}/100</span>
                </div>
                <div className="w-full bg-[var(--color-gray-200)] rounded-full h-3">
                  <div 
                    className="bg-[var(--color-teal)] h-3 rounded-full transition-all"
                    style={{ width: `${loanEligibility.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {loanEligibility.factors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-[var(--color-gray-50)] rounded-lg">
                <div className="mt-1">
                  {factor.status === 'good' ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[var(--color-gray-900)] mb-1">{factor.name}</p>
                  <p className="text-sm text-[var(--color-gray-600)]">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-[var(--color-gray-200)]">
            <Button variant="primary" size="md">
              Apply for Business Loan
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
        
        {/* Growth Checklist */}
        <Card padding="lg">
          <div className="mb-6">
            <h3 className="mb-1">Growth Checklist</h3>
            <p className="text-sm text-[var(--color-gray-600)]">Your business expansion roadmap</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--color-gray-600)]">Progress</span>
              <span className="text-sm font-medium text-[var(--color-navy)]">{completedTasks}/{growthChecklist.length}</span>
            </div>
            <div className="w-full bg-[var(--color-gray-200)] rounded-full h-2">
              <div 
                className="bg-[var(--color-teal)] h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            {growthChecklist.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  readOnly
                  className="w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-teal)] focus:ring-[var(--color-teal)]"
                />
                <span className={`text-sm ${item.completed ? 'text-[var(--color-gray-500)] line-through' : 'text-[var(--color-gray-700)]'}`}>
                  {item.task}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* AI Recommendations */}
      <Card padding="lg" className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb size={24} className="text-[var(--color-teal)]" />
          <div>
            <h3 className="mb-1">AI Business Recommendations</h3>
            <p className="text-sm text-[var(--color-gray-600)]">Actionable insights to grow your business</p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-[var(--color-gray-200)] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[var(--color-navy)]">{rec.category}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'high' 
                    ? 'bg-red-50 text-red-700' 
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>
              <ul className="space-y-3">
                {rec.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-gray-700)]">
                    <Target size={16} className="text-[var(--color-teal)] mt-0.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Government Schemes */}
      <Card padding="lg">
        <div className="mb-6">
          <h3 className="mb-1">Government Schemes & Benefits</h3>
          <p className="text-sm text-[var(--color-gray-600)]">Financial support programs available for your business</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-4">
          {governmentSchemes.map((scheme, index) => (
            <div key={index} className="border border-[var(--color-gray-200)] rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-[var(--color-navy)] mb-1">{scheme.name}</h4>
                  <p className="text-sm text-[var(--color-gray-600)]">{scheme.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scheme.eligibility === 'High' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {scheme.eligibility} Match
                </span>
              </div>
              
              <p className="text-sm text-[var(--color-gray-700)] mb-3">{scheme.description}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-[var(--color-gray-200)]">
                <span className="text-sm font-medium text-[var(--color-navy)]">Max: {scheme.maxAmount}</span>
                <Button variant="outline" size="sm">
                  Learn More
                  <ExternalLink size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
