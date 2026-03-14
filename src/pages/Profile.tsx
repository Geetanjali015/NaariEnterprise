import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Building, Bell, Lock, Save } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'personal' | 'business' | 'notifications' | 'security'>('personal');
  
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];
  
  return (
    <DashboardLayout title="Profile & Settings">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
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
          </div>
        </Card>
        
        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Personal Info */}
          {activeTab === 'personal' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Personal Information</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Update your personal details</p>
              </div>
              
              <form className="space-y-5">
                <div className="flex items-center gap-6 pb-6 border-b border-[var(--color-gray-200)]">
                  <div className="w-20 h-20 bg-[var(--color-teal)] rounded-full flex items-center justify-center text-white text-2xl">
                    PS
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-[var(--color-gray-600)] mt-2">JPG or PNG. Max size 2MB</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="Priya"
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="Sharma"
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="priya.sharma@example.com"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    defaultValue="123 Business Street, Mumbai, Maharashtra"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button variant="primary" size="md">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}
          
          {/* Business Info */}
          {activeTab === 'business' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Business Information</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Manage your business details</p>
              </div>
              
              <form className="space-y-5">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    defaultValue="Sharma Fashion Boutique"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      defaultValue="fashion"
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    >
                      <option value="retail">Retail & E-commerce</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="food">Food & Beverage</option>
                      <option value="beauty">Beauty & Wellness</option>
                      <option value="consulting">Consulting & Services</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="gst" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gst"
                      defaultValue="27AABCU9603R1ZM"
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="founded" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Year Founded
                    </label>
                    <input
                      type="text"
                      id="founded"
                      defaultValue="2024"
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
                      defaultValue="5"
                      className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="businessAddress" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Business Address
                  </label>
                  <textarea
                    id="businessAddress"
                    rows={3}
                    defaultValue="456 Commerce Plaza, Mumbai, Maharashtra 400001"
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Business Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    defaultValue="Premium fashion boutique specializing in traditional and contemporary women's wear, including designer sarees, kurtis, and accessories."
                    className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <Button variant="primary" size="md">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}
          
          {/* Notifications */}
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
                      { label: 'AI insights and recommendations', checked: false },
                      { label: 'Marketing updates', checked: false },
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
                
                <div className="pb-6 border-b border-[var(--color-gray-200)]">
                  <h4 className="mb-4">Push Notifications</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Transaction alerts', checked: true },
                      { label: 'Inventory updates', checked: true },
                      { label: 'New AI insights', checked: false },
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
          
          {/* Security */}
          {activeTab === 'security' && (
            <Card padding="lg">
              <div className="mb-6">
                <h3 className="mb-1">Security Settings</h3>
                <p className="text-sm text-[var(--color-gray-600)]">Manage your account security</p>
              </div>
              
              <div className="space-y-6">
                <div className="pb-6 border-b border-[var(--color-gray-200)]">
                  <h4 className="mb-4">Change Password</h4>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
                      />
                    </div>
                    <Button variant="primary" size="md">
                      Update Password
                    </Button>
                  </form>
                </div>
                
                <div className="pb-6 border-b border-[var(--color-gray-200)]">
                  <h4 className="mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-[var(--color-gray-700)] mb-2">
                        Add an extra layer of security to your account
                      </p>
                      <p className="text-sm text-[var(--color-gray-600)]">
                        Status: <span className="text-yellow-600 font-medium">Not Enabled</span>
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[var(--color-gray-50)] rounded-lg">
                      <div>
                        <p className="font-medium text-[var(--color-gray-900)]">Current Session</p>
                        <p className="text-sm text-[var(--color-gray-600)]">Chrome on Windows • Mumbai, India</p>
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
