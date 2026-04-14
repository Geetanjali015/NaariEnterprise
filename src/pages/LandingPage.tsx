import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { TrendingUp, Package, Brain, Target, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: TrendingUp,
      title: 'Income & Expense Tracking',
      description: 'Monitor your cash flow with intelligent categorization and real-time insights into business performance.',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage products, and receive automated alerts for low inventory.',
    },
    {
      icon: Brain,
      title: 'AI Business Insights',
      description: 'Get data-driven recommendations powered by AI to optimize operations and increase profitability.',
    },
    {
      icon: Target,
      title: 'Financial & Growth Guidance',
      description: 'Access personalized financial advice, loan eligibility insights, and government scheme information.',
    },
  ];
  
  const steps = [
    { number: '01', title: 'Register', description: 'Create your business account in minutes' },
    { number: '02', title: 'Manage', description: 'Track operations with powerful tools' },
    { number: '03', title: 'Grow', description: 'Scale with AI-powered insights' },
  ];
  
  const testimonials = [
    {
      name: 'Meera Patel',
      business: 'Fashion Boutique Owner',
      quote: 'NaariEnterprise transformed how I manage my business. The AI insights helped me increase revenue by 35% in just 6 months.',
    },
    {
      name: 'Anjali Deshmukh',
      business: 'Food Services Entrepreneur',
      quote: 'The inventory management alone saved me countless hours. This platform understands the real challenges women business owners face.',
    },
    {
      name: 'Kavita Singh',
      business: 'Consulting Firm Director',
      quote: 'Professional, powerful, and intuitive. Finally, a business platform that treats us as serious entrepreneurs.',
    },
  ];
  
  return (
    <div className="min-h-screen bg-[var(--color-neutral)]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">

  <img
    src="/images/logo2.png"
    alt="NaariEnterprise Logo"
    className="h-20 w-auto"
  />
  <div>
    <h2 className="text-2xl font-semibold text-[var(--color-navy)]">
      NaariEnterprise
    </h2>
    <p className="text-xs text-[var(--color-gray-600)]">
      AI-Powered Platform for Women Entrepreneurs
    </p>
  </div>
</div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
<section className="bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] text-white py-24">
<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
    {/* LEFT SIDE */}
    <div>
      <h1 className="text-white mb-6">
        Run Your Business With Intelligence & Confidence
      </h1>

      <p className="text-xl text-[var(--color-gray-300)] mb-8 leading-relaxed">
        All-in-one AI-powered business management platform designed for women entrepreneurs
        who demand professional tools and actionable insights.
      </p>

      <div className="flex items-center gap-4">
        <Button variant="secondary" size="lg" onClick={() => navigate('/register')}>
          Get Started
          <ArrowRight className="ml-2" size={20} />
        </Button>

        <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
          View Demo
        </Button>
      </div>
    </div>

    {/* RIGHT SIDE IMAGE */}
<div className="relative flex justify-end items-center">
  <img
    src="/images/woman.png"
    alt="Woman Entrepreneur"
    className="w-[600px] max-w-none"
  />

  {/* fade effect */}
  <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[var(--color-navy)] to-transparent"></div>
</div>

  </div>
</section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Core Features</h2>
            <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
              Everything you need to manage and grow your business with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover>
                  <div className="flex flex-col items-start h-full">
                    <div className="w-12 h-12 bg-[var(--color-teal)] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-[var(--color-teal)]" />
                    </div>
                    <h4 className="mb-3">{feature.title}</h4>
                    <p className="text-[var(--color-gray-600)] text-sm">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-lg text-[var(--color-gray-600)]">Get started in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-navy)] text-white rounded-full mb-6 text-xl">
                  {step.number}
                </div>
                <h3 className="mb-3">{step.title}</h3>
                <p className="text-[var(--color-gray-600)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Trusted By Women Entrepreneurs</h2>
            <p className="text-lg text-[var(--color-gray-600)]">Real results from real business owners</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} padding="lg">
                <div className="mb-4">
                  <CheckCircle size={32} className="text-[var(--color-teal)]" />
                </div>
                <p className="text-[var(--color-gray-700)] mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-[var(--color-navy)]">{testimonial.name}</p>
                  <p className="text-sm text-[var(--color-gray-600)]">{testimonial.business}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-navy)] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-[var(--color-gray-300)] mb-8">
            Join thousands of women entrepreneurs who are building successful businesses with NaariEnterprise
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/register')}>
            Get Started Today
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[var(--color-charcoal)] text-[var(--color-gray-300)] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--color-gray-600)] mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 NaariEnterprise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
