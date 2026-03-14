import { useState } from 'react';
import { User, Building2, Mail, Phone, MapPin, Lock, Bell, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    businessName: 'Priya Fashion Boutique',
    businessType: 'Fashion & Boutique',
    city: 'Mumbai',
    address: '123, MG Road, Mumbai - 400001',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    lowStockAlerts: true,
    salesUpdates: true,
    monthlyReports: false,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#0F172A] data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="business" className="data-[state=active]:bg-[#0F172A] data-[state=active]:text-white">
            Business
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#0F172A] data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#0F172A] data-[state=active]:text-white">
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-20 h-20 bg-[#0F172A] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">{profile.fullName}</h2>
                <p className="text-gray-600">Business Owner</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
                Save Changes
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-[#0F172A] rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Business Information</h2>
                <p className="text-sm text-gray-600">Manage your business details</p>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  value={profile.businessType}
                  onChange={(e) => setProfile({ ...profile, businessType: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gst">GST Number (Optional)</Label>
                  <Input
                    id="gst"
                    placeholder="22AAAAA0000A1Z5"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="pan">PAN Number (Optional)</Label>
                  <Input
                    id="pan"
                    placeholder="ABCDE1234F"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
                Update Business Info
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-[#0F172A] rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Notification Preferences</h2>
                <p className="text-sm text-gray-600">Choose how you want to be notified</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, pushNotifications: checked })
                  }
                />
              </div>

              <div className="h-px bg-gray-200"></div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Get notified when products are running low</p>
                </div>
                <Switch
                  checked={notifications.lowStockAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, lowStockAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Sales Updates</p>
                  <p className="text-sm text-gray-600">Daily summary of your sales activity</p>
                </div>
                <Switch
                  checked={notifications.salesUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, salesUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F172A]">Monthly Reports</p>
                  <p className="text-sm text-gray-600">Comprehensive monthly business reports</p>
                </div>
                <Switch
                  checked={notifications.monthlyReports}
                  onCheckedChange={(checked) => 
                    setNotifications({ ...notifications, monthlyReports: checked })
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-[#0F172A] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Security Settings</h2>
                <p className="text-sm text-gray-600">Manage your password and security preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-[#0F172A] mb-4">Change Password</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white">
                    Update Password
                  </Button>
                </form>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div>
                <h3 className="font-medium text-[#0F172A] mb-4">Two-Factor Authentication</h3>
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Not Enabled</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" className="border-[#0F172A] text-[#0F172A]">
                      Enable
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div>
                <h3 className="font-medium text-[#0F172A] mb-4">Active Sessions</h3>
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#0F172A]">Current Session</p>
                        <p className="text-xs text-gray-600 mt-1">Mumbai, India • Chrome on Windows</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
