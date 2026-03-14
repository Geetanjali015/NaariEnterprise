import { Sparkles, TrendingUp, DollarSign, Award, CheckCircle2, ExternalLink, Building2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const loanRecommendations = [
  {
    type: 'Business Loan',
    eligibility: 'High',
    amount: '₹5,00,000 - ₹10,00,000',
    rate: '9.5% - 12%',
    provider: 'MUDRA Scheme',
  },
  {
    type: 'Working Capital',
    eligibility: 'Medium',
    amount: '₹2,00,000 - ₹5,00,000',
    rate: '10% - 14%',
    provider: 'Stand-Up India',
  },
  {
    type: 'Equipment Finance',
    eligibility: 'High',
    amount: '₹3,00,000 - ₹7,00,000',
    rate: '11% - 15%',
    provider: 'SIDBI',
  },
];

const govSchemes = [
  {
    name: 'MUDRA Yojana',
    category: 'Micro-Finance',
    benefit: 'Loans up to ₹10 lakhs for micro-enterprises',
    status: 'Active',
  },
  {
    name: 'Stand-Up India',
    category: 'Women Entrepreneurship',
    benefit: 'Loans between ₹10 lakh to ₹1 crore',
    status: 'Active',
  },
  {
    name: 'Mahila Udyam Nidhi Scheme',
    category: 'Small Enterprises',
    benefit: 'Support for women-owned small enterprises',
    status: 'Active',
  },
  {
    name: 'Trade Related Entrepreneurship',
    category: 'Training & Support',
    benefit: 'Free training and mentorship programs',
    status: 'Active',
  },
];

const aiRecommendations = [
  {
    title: 'Optimize Inventory Turnover',
    description: 'Your best-selling items have a 3-day turnover. Consider increasing stock of Designer Saree Collection by 40%.',
    priority: 'High',
    impact: 'Revenue +15%',
  },
  {
    title: 'Reduce Marketing Spend',
    description: 'Social media ads showing 8% ROI. Consider organic content strategy to reduce costs by 30%.',
    priority: 'Medium',
    impact: 'Cost -₹15,000/month',
  },
  {
    title: 'Expand Product Line',
    description: 'Customer analytics suggest demand for eco-friendly packaging. New product line could generate additional revenue.',
    priority: 'Medium',
    impact: 'Revenue +10%',
  },
  {
    title: 'Seasonal Pricing Strategy',
    description: 'Historical data shows 25% higher sales during festive season. Implement dynamic pricing for maximum profit.',
    priority: 'High',
    impact: 'Profit +20%',
  },
];

const growthChecklist = [
  { task: 'Set up digital payment systems', completed: true },
  { task: 'Register for GST', completed: true },
  { task: 'Establish social media presence', completed: true },
  { task: 'Implement inventory management', completed: true },
  { task: 'Apply for business loan', completed: false },
  { task: 'Expand to online marketplace', completed: false },
  { task: 'Hire first employee', completed: false },
  { task: 'Register trademark/brand', completed: false },
];

export function AIGuidancePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          <h1 className="text-3xl font-bold text-[#0F172A]">AI Financial Guidance</h1>
        </div>
        <p className="text-gray-600">Intelligent insights and recommendations powered by AI to grow your business</p>
      </div>

      {/* Business Health Score */}
      <Card className="p-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-300 mb-2">Business Health Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">82</span>
              <span className="text-2xl text-[#D4AF37]">/100</span>
            </div>
            <p className="text-gray-300 mt-2">Strong performance with room for optimization</p>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37] flex items-center justify-center">
            <Award className="w-10 h-10 text-[#D4AF37]" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400">Revenue Growth</p>
            <p className="text-lg font-bold text-[#14B8A6]">+18%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Profit Margin</p>
            <p className="text-lg font-bold text-[#14B8A6]">36%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Cash Flow</p>
            <p className="text-lg font-bold text-[#14B8A6]">Healthy</p>
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">AI-Powered Business Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {aiRecommendations.map((rec, index) => (
            <Card key={index} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-[#0F172A] flex-1">{rec.title}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  rec.priority === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {rec.priority} Priority
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#14B8A6]">{rec.impact}</span>
                <Button size="sm" variant="outline" className="text-[#0F172A] border-[#0F172A]">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Loan Eligibility */}
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-[#14B8A6]" />
          Loan Eligibility & Recommendations
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {loanRecommendations.map((loan, index) => (
            <Card key={index} className="p-5 border-l-4 border-l-[#14B8A6]">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-[#0F172A]">{loan.type}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  loan.eligibility === 'High' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {loan.eligibility}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Loan Amount</p>
                  <p className="font-medium text-[#0F172A]">{loan.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Interest Rate</p>
                  <p className="font-medium text-[#0F172A]">{loan.rate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Provider</p>
                  <p className="font-medium text-[#0F172A]">{loan.provider}</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-[#0F172A] hover:bg-[#1E293B] text-white">
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Government Schemes */}
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-[#D4AF37]" />
          Government Schemes for Women Entrepreneurs
        </h2>
        <Card className="p-6">
          <div className="space-y-4">
            {govSchemes.map((scheme, index) => (
              <div 
                key={index} 
                className="flex items-start justify-between p-4 rounded-lg border border-gray-200 hover:border-[#0F172A] hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A]">{scheme.name}</h3>
                      <p className="text-sm text-gray-600">{scheme.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 ml-13">{scheme.benefit}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-[#0F172A] hover:text-[#14B8A6]">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Growth Checklist */}
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#14B8A6]" />
          Business Growth Checklist
        </h2>
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {growthChecklist.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  item.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.completed 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}>
                  {item.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <span className={`text-sm ${
                  item.completed 
                    ? 'text-green-900 font-medium line-through' 
                    : 'text-gray-900'
                }`}>
                  {item.task}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#0F172A] rounded-lg text-white">
            <p className="text-sm">
              <span className="font-bold text-[#D4AF37]">4 of 8</span> milestones completed. 
              Keep going! Complete remaining tasks to unlock new growth opportunities.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
