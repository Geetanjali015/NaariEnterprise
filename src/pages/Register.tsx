import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { UserPlus } from 'lucide-react';

interface RegisterProps {
  onRegister: () => void;
}

export default function Register({ onRegister }: RegisterProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_type: '',
    city: '',
    password: '',
    business_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }
      
      // Save token and user data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      onRegister();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white mb-2">NaariEnterprise</h2>
          <p className="text-[var(--color-gray-300)]">Start your journey to business excellence</p>
        </div>
        
        {/* Register Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <h3 className="mb-2">Create Your Account</h3>
            <p className="text-[var(--color-gray-600)] text-sm">Join thousands of successful women entrepreneurs</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="Name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  placeholder="Mumbai"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="business_type" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Business Type
              </label>
              <select
                id="business_type"
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                required
              >
                <option value="">Select your business type</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="food">Food & Beverage</option>
                <option value="beauty">Beauty & Wellness</option>
                <option value="consulting">Consulting & Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-[var(--color-teal)] border-[var(--color-gray-300)] rounded focus:ring-[var(--color-teal)]"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-[var(--color-gray-700)]">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              <UserPlus size={20} className="mr-2" />
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-gray-600)]">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[var(--color-teal)] hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-[var(--color-gray-300)] hover:text-white text-sm"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
