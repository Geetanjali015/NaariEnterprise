import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }
      
      // Save token and user data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white mb-2">NaariEnterprise</h2>
          <p className="text-[var(--color-gray-300)]">Welcome back to your business dashboard</p>
        </div>
        
        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <h3 className="mb-2">Sign In</h3>
            <p className="text-[var(--color-gray-600)] text-sm">Enter your credentials to access your account</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[var(--color-teal)] border-[var(--color-gray-300)] rounded focus:ring-[var(--color-teal)]"
                />
                <span className="ml-2 text-sm text-[var(--color-gray-700)]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[var(--color-teal)] hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              <LogIn size={20} className="mr-2" />
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-gray-600)]">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[var(--color-teal)] hover:underline font-medium"
              >
                Create Account
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
