import { ArrowRight, CheckCircle2, TrendingUp, Shield, Zap, BarChart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Income & Expense Tracking',
      description: 'Monitor your cash flow with precision. Track every transaction and understand your financial patterns.',
    },
    {
      icon: BarChart,
      title: 'Inventory Management',
      description: 'Stay on top of your stock. Real-time inventory tracking with low-stock alerts and analytics.',
    },
    {
      icon: Zap,
      title: 'AI Business Insights',
      description: 'Get intelligent recommendations powered by AI to optimize your business operations and growth.',
    },
    {
      icon: Shield,
      title: 'Financial & Growth Guidance',
      description: 'Access personalized financial advice, loan eligibility, and government scheme recommendations.',
    },
  ];

  const steps = [
    { title: 'Register', description: 'Create your business account in minutes' },
    { title: 'Manage', description: 'Track finances, inventory, and operations' },
    { title: 'Grow', description: 'Scale with AI-powered insights and guidance' },
  ];

  const testimonials = [
    {
      quote: 'NaariEnterprise transformed how I manage my boutique. The AI insights helped me increase revenue by 40%.',
      author: 'Anjali Mehta',
      role: 'Fashion Boutique Owner',
    },
    {
      quote: 'The inventory management system saved me countless hours. I can focus on growing my business instead of tracking stock.',
      author: 'Kavita Singh',
      role: 'Home Decor Business',
    },
    {
      quote: 'Finally, a platform that understands the needs of women entrepreneurs. The financial guidance has been invaluable.',
      author: 'Rina Patel',
      role: 'Food & Catering Service',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">NaariEnterprise</h1>
            <p className="text-xs text-gray-600">AI-Powered Business Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('login')}
              className="text-gray-700 hover:text-[#0F172A]"
            >
              Login
            </Button>
            <Button 
              onClick={() => onNavigate('register')}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
            Run Your Business With
            <br />
            <span className="bg-gradient-to-r from-[#0F172A] via-[#14B8A6] to-[#D4AF37] bg-clip-text text-transparent">
              Intelligence & Confidence
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            All-in-one AI-powered business management platform designed for women entrepreneurs who are ready to scale
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => onNavigate('register')}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-6 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white px-8 py-6 text-lg"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to help you manage and grow your business efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-gray-200">
                  <div className="w-12 h-12 bg-[#0F172A] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple, powerful, and effective</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-xl text-[#0F172A] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Trusted by Entrepreneurs
            </h2>
            <p className="text-lg text-gray-600">Real results from real business owners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-gray-200">
                <CheckCircle2 className="w-8 h-8 text-[#14B8A6] mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-[#0F172A]">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of women entrepreneurs who are scaling their businesses with confidence
          </p>
          <Button 
            size="lg" 
            onClick={() => onNavigate('register')}
            className="bg-[#D4AF37] hover:bg-[#B8860B] text-[#0F172A] px-8 py-6 text-lg font-bold"
          >
            Start Free Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-[#0F172A] mb-4">NaariEnterprise</h3>
            <p className="text-sm text-gray-600">
              Empowering women entrepreneurs with AI-powered business intelligence
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#0F172A]">Features</a></li>
              <li><a href="#" className="hover:text-[#0F172A]">Pricing</a></li>
              <li><a href="#" className="hover:text-[#0F172A]">Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#0F172A]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#0F172A]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#0F172A]">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0F172A] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#0F172A]">About</a></li>
              <li><a href="#" className="hover:text-[#0F172A]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#0F172A]">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2026 NaariEnterprise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
