import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Building, Bell, Lock, Save, LogOut } from 'lucide-react';

interface UserData {
  id?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  business_type?: string;
  business_name?: string;
  gst_number?: string;
  year_founded?: number;
  employees?: number;
  address?: string;
  description?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personal' | 'business' | 'notifications' | 'security'>('personal');
  const [user, setUser] = useState<UserData | null>(null);
  const [editData, setEditData] = useState<UserData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEditData(parsedUser);
      } catch (err) {
        console.error('Failed to parse user data:', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async (section: 'personal' | 'business') => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to save changes');
        setLoading(false);
        return;
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess('Changes saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  if (!user) {
    return (
      <DashboardLayout title="Profile & Settings">
        <div className="text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile & Settings">
      <div className="grid lg:grid-cols-4 gap-6">
        <Card padding="md">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[var(--color-teal)] text-white'
                      : 'text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-[var(--color-gray-200)] pt-4"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </Card>

        <div className="lg:col-span-3">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {activeTab === 'personal' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Personal Information</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Update your personal details</p>
              </div>

              <form className="space-y-5">
                <div className="flex items-center gap-6 pb-6 border-b border-[var(--color-gray-200)]">
                  <div className="w-20 h-20 bg-[var(--color-teal)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-[var(--color-gray-600)] mt-2">JPG or PNG. Max size 2MB</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={editData.full_name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={editData.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg bg-[var(--color-gray-50)] text-[var(--color-gray-500)] cursor-not-allowed"
                  />
                  <p className="text-xs text-[var(--color-gray-500)] mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
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
                    value={editData.city || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={editData.address || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="primary" 
                    size="md"
                    onClick={() => handleSave('personal')}
                    disabled={loading}
                  >
                    <Save size={16} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'business' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Business Information</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Manage your business details</p>
              </div>

              <form className="space-y-5">
                <div>
                  <label htmlFor="business_name" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    value={editData.business_name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="business_type" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Business Type
                    </label>
                    <select
                      id="business_type"
                      name="business_type"
                      value={editData.business_type || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    >
                      <option value="">Select business type</option>
                      <option value="retail">Retail & E-commerce</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="food">Food & Beverage</option>
                      <option value="beauty">Beauty & Wellness</option>
                      <option value="consulting">Consulting & Services</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gst_number" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gst_number"
                      name="gst_number"
                      value={editData.gst_number || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="year_founded" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Year Founded
                    </label>
                    <input
                      type="number"
                      id="year_founded"
                      name="year_founded"
                      value={editData.year_founded || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="employees" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      id="employees"
                      name="employees"
                      value={editData.employees || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Business Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={editData.description || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="primary" 
                    size="md"
                    onClick={() => handleSave('business')}
                    disabled={loading}
                  >
                    <Save size={16} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Notification Preferences</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Manage how you receive updates</p>
              </div>

              <div className="space-y-6">
                <div className="pb-6 border-b border-[var(--color-gray-200)]">
                  <h4 className="mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Daily business summary', checked: true },
                      { label: 'Weekly performance reports', checked: true },
                      { label: 'Low stock alerts', checked: true },
                      { label: 'Payment reminders', checked: true },
                    ].map((item, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="w-5 h-5 rounded border-[var(--color-gray-300)] text-[var(--color-teal)] focus:ring-[var(--color-teal)]"
                        />
                        <span className="text-[var(--color-gray-700)]">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="primary" size="md">
                    <Save size={16} className="mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Security Settings</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Manage your account security</p>
              </div>

              <div className="space-y-6">
                <div className="pb-6 border-b border-[var(--color-gray-200)]">
                  <h4 className="mb-4">Change Password</h4>
                  <p className="text-[var(--color-gray-600)]">Feature coming soon</p>
                </div>

                <div>
                  <h4 className="mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[var(--color-gray-50)] rounded-lg">
                      <div>
                        <p className="font-medium text-[var(--color-gray-900)]">Current Session</p>
                        <p className="text-sm text-[var(--color-gray-600)]">Chrome on macOS</p>
                        <p className="text-xs text-[var(--color-gray-500)] mt-1">Last active: Just now</p>
                      </div>
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
