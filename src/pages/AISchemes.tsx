import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import { ExternalLink, IndianRupee, DollarSign } from 'lucide-react';

export default function AISchemes() {
  const mockSchemes = [
    {
      id: 1,
      name: 'MUDRA Loan - Shishu',
      description: 'Loans up to ₹50,000 for micro-enterprises without collateral',
      loan_amount_min: 50000,
      loan_amount_max: 500000,
      interest_rate: 10.5,
      eligibility_criteria: 'First-generation entrepreneurs, any business type, no collateral required',
      business_types: ['Retail', 'Services', 'Manufacturing'],
      revenue_range: 'Up to ₹5 lakhs',
      url: 'https://www.mudra.org.in'
    },
    {
      id: 2,
      name: 'Stand-Up India Scheme',
      description: 'Special scheme for SC/ST entrepreneurs and women',
      loan_amount_min: 1000000,
      loan_amount_max: 10000000,
      interest_rate: 7.5,
      eligibility_criteria: 'SC/ST entrepreneurs, women entrepreneurs, greenfield projects',
      business_types: ['All sectors'],
      revenue_range: 'New ventures',
      url: 'https://www.standupmitra.in'
    },
    {
      id: 3,
      name: 'PM-CGTMSE',
      description: 'Credit Guarantee scheme for MSMEs without collateral',
      loan_amount_min: 1000000,
      loan_amount_max: 50000000,
      interest_rate: 8.5,
      eligibility_criteria: 'MSME registered, 5+ years operation, no default record',
      business_types: ['Manufacturing', 'Services', 'Trading'],
      revenue_range: '₹5L - ₹25Cr',
      url: 'https://www.cgmse.gov.in'
    },
    {
      id: 4,
      name: 'PM-KUSUM',
      description: 'Solar energy scheme for agriculture and businesses',
      loan_amount_min: 500000,
      loan_amount_max: 5000000,
      interest_rate: 6.5,
      eligibility_criteria: 'For solar pump installation, land availability, good credit',
      business_types: ['Agriculture', 'Agribusiness'],
      revenue_range: 'Farmland based',
      url: 'https://www.pmkusum.gov.in'
    }
  ];

  return (
    <DashboardLayout title="Government Schemes">
      <div className="space-y-6">
        <Card padding="lg" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="flex gap-3">
            <IndianRupee size={24} className="text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Government Loan Schemes</h3>
              <p className="text-sm text-blue-800">
                Explore government-backed loan schemes designed to support small businesses and entrepreneurs. These schemes offer favorable interest rates and flexible terms.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSchemes.map((scheme) => (
            <Card key={scheme.id} padding="lg" className="border-l-4 border-l-violet-500 hover:shadow-lg transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.name}</h3>
                <p className="text-sm text-gray-600">{scheme.description}</p>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-rose-50 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-violet-600" />
                  <span className="text-sm font-semibold text-gray-700">Loan Amount Range</span>
                </div>
                <p className="text-lg font-bold text-violet-700">
                  ₹{(scheme.loan_amount_min / 100000).toFixed(1)}L - ₹{(scheme.loan_amount_max / 10000000).toFixed(1)}Cr
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                  <p className="text-lg font-bold text-orange-600">{scheme.interest_rate}% p.a.</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Processing Fee</p>
                  <p className="text-lg font-bold text-green-600">Usually Nil</p>
                </div>
              </div>

              {scheme.eligibility_criteria && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Eligibility:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{scheme.eligibility_criteria}</p>
                </div>
              )}

              {scheme.business_types && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Suitable For:</p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.business_types.map((type) => (
                      <span key={type} className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-medium">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-rose)] text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Learn More
                <ExternalLink size={16} />
              </a>
            </Card>
          ))}
        </div>

        <Card padding="lg" className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
          <h3 className="font-semibold text-green-900 mb-3">💡 Application Tips</h3>
          <ul className="text-sm text-green-800 space-y-2">
            <li>✓ Gather all required documents: PAN, Aadhar, GST certificate, business registration</li>
            <li>✓ Maintain at least 6 months of bank statements showing business transactions</li>
            <li>✓ Keep your financial records (P&L, ITR) organized and updated</li>
            <li>✓ Start with schemes that match your current business stage</li>
            <li>✓ Contact your nearest bank or SIDBI branch for personalized guidance</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
