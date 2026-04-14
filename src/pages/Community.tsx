import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import { Heart, MessageCircle, Star, Calendar, Clock, Users2, Plus, MessageSquare, Phone } from 'lucide-react';

export default function Community() {
  const [activeTab, setActiveTab] = useState('stories');
  const [discussionSearch, setDiscussionSearch] = useState('');

  // Success Stories with actual profile images (using initials as avatars)
  const successStories = [
  {
    id: 1,
    name: 'Priya Sharma',
    business: 'Homemade Pickles & Preserves',
    location: 'Bangalore, Karnataka',
      story: 'Started with ₹2,000 investment, now earning ₹25,000/month. My special mango pickle recipe became so popular that I had to hire 2 helpers!',
    monthly_revenue: '₹25,000/month',
    time_to_success: '8 months',
    followers: 1234,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  },
  {
    id: 2,
    name: 'Meera Patel',
    business: 'Custom Tailoring Services',
    location: 'Mumbai, Maharashtra',
      story: 'From stitching clothes for neighbors to running a boutique with 50+ regular customers. StreeKamai helped me build my brand and find customers online.',
    monthly_revenue: '₹35,000/month',
    time_to_success: '6 months',
    followers: 2100,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    business: 'Beauty & Skincare Services',
    location: 'Hyderabad, Telangana',
      story: 'Turned my passion for skincare into a thriving home salon. Now I provide services to 20+ customers weekly and have launched my own product line.',
    monthly_revenue: '₹40,000/month',
    time_to_success: '10 months',
    followers: 1800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
  },
  {
    id: 4,
    name: 'Anjali Singh',
    business: 'Organic Food Products',
    location: 'Pune, Maharashtra',
      story: 'Started selling organic spices and herbs grown in my terrace garden. Now supplying to 5 local stores and have an online customer base of 200+.',
    monthly_revenue: '₹18,000/month',
    time_to_success: '5 months',
    followers: 890,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4'
  }
];

  // Expert Sessions
  const expertSessions = [
    {
      id: 1,
      title: 'Food Business Success Stories',
      host: 'Priya Sharma',
      description: 'Learn how to scale your food business and build a loyal customer base. Priya will share her journey from kitchen to ₹25,000/month revenue.',
      date: '2025-01-25',
      time: '7:00 PM',
      duration: '1 hour',
      capacity: '24/50',
      available_spots: 26,
      topics: ['Recipe standardization', 'Customer retention', 'Pricing strategies', 'Quality control'],
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4'
    },
    {
      id: 2,
      title: 'Digital Marketing for Women Entrepreneurs',
      host: 'Meera Patel',
      description: 'Master social media marketing and build your online presence. Meera will share practical tips for Instagram and WhatsApp marketing.',
      date: '2025-01-27',
      time: '6:30 PM',
      duration: '45 minutes',
      capacity: '18/30',
      available_spots: 12,
      topics: ['Content creation', 'Customer engagement', 'Online promotion', 'Brand building'],
      profileColor: 'bg-gradient-to-br from-purple-400 to-pink-500',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    {
      id: 3,
      title: 'Financial Planning for Small Business',
      host: 'Kavya Reddy',
      description: 'Learn to manage business finances, save taxes, and plan for growth. Essential financial literacy for women entrepreneurs.',
      date: '2025-01-30',
      time: '8:00 PM',
      duration: '1.5 hours',
      capacity: '12/25',
      available_spots: 13,
      topics: ['Accounting basics', 'Tax planning', 'Budgeting', 'Profit optimization'],
      profileColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    }
  ];

  // Community Discussions
  const discussions = [
    {
      id: 1,
      author: 'Sunita Devi',
      category: 'Pricing',
      title: 'How to price homemade food items?',
      description: 'I\'m struggling with pricing my homemade snacks. How do you calculate the right price that covers costs and gives profit?',
      replies: 8,
      likes: 12,
      timestamp: '2 hours ago',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'

    },
    {
      id: 2,
      author: 'Radha Krishna',
      category: 'Packaging',
      title: 'Best packaging ideas for homemade products',
      description: 'Looking for eco-friendly and cost-effective packaging solutions for my pickle business. Any suggestions?',
      replies: 15,
      likes: 20,
      timestamp: '5 hours ago',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'

    },
    {
      id: 3,
      author: 'Lakshmi Nair',
      category: 'Customer Service',
      title: 'Dealing with difficult customers',
      description: 'Had a bad experience with a customer who refused to pay. How do you handle such situations professionally?',
      replies: 22,
      likes: 18,
      timestamp: '1 day ago',
      profileColor: 'bg-gradient-to-br from-indigo-400 to-blue-500',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Pricing': 'bg-blue-100 text-blue-700',
      'Packaging': 'bg-purple-100 text-purple-700',
      'Customer Service': 'bg-red-100 text-red-700',
      'Marketing': 'bg-green-100 text-green-700',
      'Operations': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout title="Community & Inspiration">
      <div className="space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-500 text-white rounded-3xl p-8 md:p-12">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Community & Inspiration</h2>
              <p className="text-lg opacity-95">Connect with fellow women entrepreneurs, share experiences, and grow together</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b-2 border-gray-200 overflow-x-auto pb-4">
          {[
            { id: 'stories', label: '✨ Success Stories', icon: 'stories' },
            { id: 'sessions', label: '📅 Meetings', icon: 'sessions' },
            { id: 'discussions', label: '💬 Community Chat', icon: 'discussions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-all pb-4 border-b-4 ${
                activeTab === tab.id
                  ? 'border-b-blue-600 text-blue-600'
                  : 'border-b-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Success Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successStories.map((story) => (
                <div key={story.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Profile Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
  src={story.image}
  alt={story.name}
  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
/>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">{story.name}</h4>
                        <p className="text-sm text-blue-600 font-semibold">{story.business}</p>
                        <p className="text-xs text-gray-500 mt-0.5">📍 {story.location}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-sm text-gray-800">{story.rating}</span>
                      </div>
                    </div>

                    {/* Story Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-5">{story.story}</p>

                    {/* Revenue Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-gray-200">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-xl font-bold text-green-600">{story.monthly_revenue}</p>
                        <p className="text-xs text-gray-600 mt-1">Monthly Revenue</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-xl font-bold text-blue-600">{story.time_to_success}</p>
                        <p className="text-xs text-gray-600 mt-1">Time to Success</p>
                      </div>
                    </div>

                    {/* Footer Stats and Button */}
                    <div className="flex items-center justify-between mt-4 gap-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MessageCircle size={16} className="text-gray-500" />
                          <span className="text-gray-700 font-semibold">{story.followers}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-700 font-semibold">{story.rating}</span>
                        </div>
                      </div>
                      <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2 text-sm shadow-md whitespace-nowrap">
  <MessageCircle size={14} />
  Connect
</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meetings Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-l-blue-600 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-2">🎓 Upcoming Expert Sessions</h3>
              <p className="text-blue-800 text-sm">Learn directly from successful women entrepreneurs who have built thriving businesses. Book your spot in these exclusive sessions!</p>
            </div>

            <div className="space-y-5">
              {expertSessions.map((session) => (
                <div key={session.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="p-6">
                    <div className="flex gap-5 mb-4">
                      {/* Host Avatar */}
                      <div className={`${session.profileColor} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                        
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{session.title}</h4>
                        <p className="text-sm text-blue-600 font-semibold mb-2">Hosted by {session.host}</p>
                        <p className="text-gray-700 text-sm">{session.description}</p>
                      </div>

                      {/* Spots Available */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-green-600">{session.available_spots}</p>
                        <p className="text-xs text-gray-600">Spots Available</p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-700 text-xs">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-700 text-xs">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-700 text-xs">{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users2 size={16} className="text-gray-400" />
                        <span className="text-gray-700 text-xs">{session.capacity}</span>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Topics Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {session.topics.map((topic, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 text-sm">
  <MessageCircle size={14} />
  Book Meeting
</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            {/* Header with Search */}
            <div className="flex gap-3 items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Community Discussions</h3>
                <p className="text-gray-600 text-sm">Ask questions, share experiences, and get advice from fellow women entrepreneurs</p>
              </div>
              <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 text-sm">
  <MessageCircle size={14} />
  Start new discussion
</button>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden p-6">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-gray-900">{discussion.author}</p>
                          <span className={`inline-block text-xs font-bold px-2 py-1 rounded-full ${getCategoryColor(discussion.category)}`}>
                            {discussion.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 flex-shrink-0">{discussion.timestamp}</p>
                      </div>

                      <h4 className="text-base font-bold text-gray-900 mb-2">{discussion.title}</h4>
                      <p className="text-gray-700 text-sm mb-4">{discussion.description}</p>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageSquare size={16} />
                            <span className="text-sm font-semibold">{discussion.replies} replies</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                            <Heart size={16} />
                            <span className="text-sm font-semibold">{discussion.likes} likes</span>
                          </button>
                        </div>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-all">
                          Join Discussion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp Community Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">Join Our WhatsApp Community</h3>
          <p className="text-lg opacity-90 mb-8">Get daily tips, support, and connect with thousands of women entrepreneurs</p>
          <button className="px-10 py-3 bg-white text-purple-600 rounded-lg font-bold text-lg hover:shadow-xl transition-all inline-flex items-center gap-2">
            <Phone size={20} />
            Join WhatsApp Group
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
