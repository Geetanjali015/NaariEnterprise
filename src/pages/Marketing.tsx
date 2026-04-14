


import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import {
  Megaphone,
  Instagram,
  MessageSquare,
  Calendar,
  Sparkles,
  Copy,
  Clock,
  TrendingUp,
  Hash,
  Image as ImageIcon
} from 'lucide-react';

interface InstagramSuggestion {
  type: string;
  post: string;
  image: string;
  engagement: string;
  bestTime: string;
}

interface WhatsAppSuggestion {
  type: string;
  message: string;
}

const MarketingTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('content');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'whatsapp'>('instagram');

  const contentSuggestions = {
    instagram: [
      {
        type: 'Product Showcase',
        post: '✨ Fresh from my kitchen today!\n These homemade samosas are made with love and the finest ingredients. \nPerfect for your evening snacks! 🥟\n\n#HomemadeFood #Samosas #FreshCooked #LocalBusiness #WomenEntrepreneur #TastyTreats #OrderNow',
        image: 'Food photography showing golden samosas',
        engagement: '15-25 likes expected',
        bestTime: '6:00 PM - 8:00 PM'
      },
      {
        type: 'Behind the Scenes',
        post: '👩‍🍳 Starting my day early to prepare fresh meals for my lovely customers. The secret ingredient? Always love and passion! ❤️\n\n#BehindTheScenes #EarlyMorning #Passion #HomeBusiness #FreshFood #WomenInBusiness #Cooking',
        image: 'Process shots of cooking preparation',
        engagement: '20-30 likes expected',
        bestTime: '8:00 AM - 10:00 AM'
      },
      {
        type: 'Customer Testimonial',
        post: '🌟 "Best homemade food in the area! My family loves everything she makes." - Happy Customer\n\nYour words motivate me to do better every day! Thank you for your trust 🙏\n\n#CustomerLove #Testimonial #Grateful #Quality #Trust #HomemadeGoodness',
        image: 'Customer enjoying the food or review screenshot',
        engagement: '25-40 likes expected',
        bestTime: '12:00 PM - 2:00 PM'
      }
    ] as InstagramSuggestion[],
    whatsapp: [
      {
        type: 'Daily Menu',
        message: '🌅 Good Morning!\n\nToday\'s Special Menu:\n• Aloo Paratha with Curd - ₹40\n• Mixed Veg Curry - ₹60\n• Fresh Rotis (pack of 4) - ₹20\n• Homemade Pickle - ₹30\n\nOrder before 11 AM for lunch delivery!\nCall: 9876543210'
      },
      {
        type: 'Weekly Special',
        message: '🎉 WEEKEND SPECIAL OFFER!\n\n50% OFF on Bulk Orders (min 10 items)\nPerfect for family gatherings!\n\nAvailable items:\n• Biryanis • Sweets • Snacks\n\nOffer valid till Sunday. Book now!\nWhatsApp: 9876543210'
      },
      {
        type: 'Festival Offer',
        message: '🪔 Diwali Special!\n\nOrdering traditional sweets and snacks:\n• Ladoo • Barfi • Namkeen\n• Special gift boxes available\n\nPre-order now to avoid last-minute rush!\n📞 Call or WhatsApp to book'
      }
    ] as WhatsAppSuggestion[]
  };

  const dailyPostingSchedule = [
    {
      time: '8:00 AM',
      platform: 'Instagram',
      type: 'Good Morning Post',
      content: 'Behind-the-scenes or preparation shots',
      status: 'posted'
    },
    {
      time: '12:00 PM',
      platform: 'WhatsApp',
      type: 'Lunch Menu',
      content: 'Daily menu with pricing',
      status: 'scheduled'
    },
    {
      time: '4:00 PM',
      platform: 'Instagram',
      type: 'Product Showcase',
      content: 'Finished dishes with description',
      status: 'pending'
    },
    {
      time: '7:00 PM',
      platform: 'WhatsApp',
      type: "Tomorrow's Pre-orders",
      content: 'Next day menu preview',
      status: 'pending'
    }
  ];

  const generateContent = () => {
    if (selectedPlatform === 'instagram') {
      const suggestions = contentSuggestions.instagram;
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setGeneratedContent(randomSuggestion.post);
    } else {
      const suggestions = contentSuggestions.whatsapp;
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setGeneratedContent(randomSuggestion.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard!');
  };

  const tools = [
    { id: 'content', label: 'Content Generator', icon: Sparkles },
    { id: 'schedule', label: 'Posting Schedule', icon: Calendar },
    { id: 'analytics', label: 'Performance', icon: TrendingUp }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          style={{ background: 'linear-gradient(to right, #112240, #1a3a5c)' }}
          className="rounded-2xl p-8 text-white"
        >
          <h1 className="text-3xl font-bold mb-2 text-white">
  Marketing Tools
</h1>
<p style={{ color: 'rgba(255,255,255,0.75)' }}>
  AI-powered content creation and marketing automation for social media success
</p>
        </div>

        {/* Tool Selector */}
        <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: '#e8edf2' }}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all"
              style={
                selectedTool === tool.id
                  ? { backgroundColor: '#2bb5a0', color: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }
                  : { color: '#4a5568' }
              }
            >
              <tool.icon className="w-4 h-4" />
              <span className="font-medium">{tool.label}</span>
            </button>
          ))}
        </div>

        {selectedTool === 'content' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Content Generator */}
            <div className="lg:col-span-2 space-y-6">
              <div
                className="bg-white rounded-xl p-6 shadow-sm border"
                style={{ borderColor: '#e2e8f0' }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#112240' }}>
                  <Sparkles className="w-5 h-5 mr-2" style={{ color: '#2bb5a0' }} />
                  AI Content Generator
                </h2>

                {/* Platform Selector */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setSelectedPlatform('instagram')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all"
                    style={
                      selectedPlatform === 'instagram'
                        ? { borderColor: '#2bb5a0', backgroundColor: '#e6f7f5', color: '#1a8a7a' }
                        : { borderColor: '#e2e8f0', color: '#4a5568' }
                    }
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </button>
                  <button
                    onClick={() => setSelectedPlatform('whatsapp')}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all"
                    style={
                      selectedPlatform === 'whatsapp'
                        ? { borderColor: '#2bb5a0', backgroundColor: '#e6f7f5', color: '#1a8a7a' }
                        : { borderColor: '#e2e8f0', color: '#4a5568' }
                    }
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                <button
                  onClick={generateContent}
                  className="w-full py-3 text-white rounded-lg transition-all mb-4 flex items-center justify-center space-x-2 hover:opacity-90"
                  style={{ background: 'linear-gradient(to right, #2bb5a0, #1a9e8f)' }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Content</span>
                </button>

                {generatedContent && (
                  <div className="rounded-lg p-4" style={{ backgroundColor: '#f0faf9' }}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold" style={{ color: '#112240' }}>Generated Content</h3>
                      <button
                        onClick={() => copyToClipboard(generatedContent)}
                        className="p-2 transition-colors"
                        style={{ color: '#2bb5a0' }}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap mb-4">{generatedContent}</p>
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90 transition-colors"
                        style={{ backgroundColor: '#2bb5a0' }}
                      >
                        Post Now
                      </button>
                      <button
                        className="px-4 py-2 text-white rounded-lg text-sm hover:opacity-80 transition-colors"
                        style={{ backgroundColor: '#112240' }}
                      >
                        Schedule Later
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Suggestions */}
              <div
                className="bg-white rounded-xl p-6 shadow-sm border"
                style={{ borderColor: '#e2e8f0' }}
              >
                <h3 className="font-bold mb-4 flex items-center" style={{ color: '#112240' }}>
                  <Megaphone className="w-5 h-5 mr-2" style={{ color: '#2bb5a0' }} />
                  Content Ideas for Today
                </h3>

                <div className="space-y-4">
                  {contentSuggestions[selectedPlatform].map((suggestion: any, index: number) => (
                    <div key={index} className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold" style={{ color: '#112240' }}>{suggestion.type}</h4>
                        <button
                          onClick={() => copyToClipboard(selectedPlatform === 'instagram' ? (suggestion as InstagramSuggestion).post : (suggestion as WhatsAppSuggestion).message)}
                          className="p-1 transition-colors"
                          style={{ color: '#2bb5a0' }}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {selectedPlatform === 'instagram' ? (suggestion as InstagramSuggestion).post : (suggestion as WhatsAppSuggestion).message}
                      </p>
                      {selectedPlatform === 'instagram' && (
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          <span>📸 {(suggestion as InstagramSuggestion).image}</span>
                          <span>💖 {(suggestion as InstagramSuggestion).engagement}</span>
                          <span>🕐 {(suggestion as InstagramSuggestion).bestTime}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hashtag Generator + Photo Tips */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#e2e8f0' }}>
                <h3 className="font-bold mb-4 flex items-center" style={{ color: '#112240' }}>
                  <Hash className="w-5 h-5 mr-2" style={{ color: '#2bb5a0' }} />
                  Trending Hashtags
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#112240' }}>Food Business</h4>
                    <div className="flex flex-wrap gap-2">
                      {['#HomemadeFood', '#FreshCooked', '#LocalBusiness', '#WomenEntrepreneur', '#TastyTreats'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
                          style={{ backgroundColor: '#e6f7f5', color: '#1a8a7a' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#112240' }}>Location Based</h4>
                    <div className="flex flex-wrap gap-2">
                      {['#BangaloreFood', '#LocalDelivery', '#Neighborhood', '#CityName'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded cursor-pointer transition-colors"
                          style={{ backgroundColor: '#e8edf5', color: '#112240' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#e2e8f0' }}>
                <h3 className="font-bold mb-4 flex items-center" style={{ color: '#112240' }}>
                  <ImageIcon className="w-5 h-5 mr-2" style={{ color: '#2bb5a0' }} />
                  Photo Tips
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                  {[
                    'Use natural light for food photos',
                    'Show the cooking process',
                    'Include yourself in behind-the-scenes shots',
                    'Take multiple angles of the same dish'
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <span style={{ color: '#2bb5a0' }}>💡</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTool === 'schedule' && (
          <div
            className="bg-white rounded-xl p-6 shadow-sm border"
            style={{ borderColor: '#e2e8f0' }}
          >
            <h2 className="text-xl font-bold mb-6 flex items-center" style={{ color: '#112240' }}>
              <Calendar className="w-5 h-5 mr-2" style={{ color: '#2bb5a0' }} />
              Daily Posting Schedule
            </h2>

            <div className="space-y-4">
              {dailyPostingSchedule.map((post, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border-2"
                  style={
                    post.status === 'posted'
                      ? { borderColor: '#2bb5a0', backgroundColor: '#e6f7f5' }
                      : post.status === 'scheduled'
                      ? { borderColor: '#1a3a5c', backgroundColor: '#e8edf5' }
                      : { borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" style={{ color: '#2bb5a0' }} />
                      <span className="font-semibold" style={{ color: '#112240' }}>{post.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {post.platform === 'Instagram' ? (
                        <Instagram className="w-4 h-4" style={{ color: '#2bb5a0' }} />
                      ) : (
                        <MessageSquare className="w-4 h-4" style={{ color: '#2bb5a0' }} />
                      )}
                      <span className="text-sm font-medium" style={{ color: '#112240' }}>{post.platform}</span>
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: '#112240' }}>{post.type}</div>
                      <div className="text-sm text-gray-500">{post.content}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={
                        post.status === 'posted'
                          ? { backgroundColor: '#e6f7f5', color: '#1a8a7a' }
                          : post.status === 'scheduled'
                          ? { backgroundColor: '#e8edf5', color: '#112240' }
                          : { backgroundColor: '#f1f5f9', color: '#64748b' }
                      }
                    >
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    {post.status === 'pending' && (
                      <button
                        className="px-3 py-1 text-white text-xs rounded hover:opacity-90 transition-colors"
                        style={{ backgroundColor: '#2bb5a0' }}
                      >
                        Schedule
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: '#e8edf5', borderColor: '#c5d3e8' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#112240' }}>💡 Posting Tips</h3>
              <ul className="text-sm space-y-1" style={{ color: '#1a3a5c' }}>
                <li>• Post consistently at the same times daily</li>
                <li>• Engage with comments within 2-3 hours</li>
                <li>• Use Instagram Stories for behind-the-scenes content</li>
                <li>• Send WhatsApp updates 30 minutes before meal times</li>
              </ul>
            </div>
          </div>
        )}

        {selectedTool === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Total Reach', value: '2,347', change: '+12%' },
                { label: 'Engagement Rate', value: '8.4%', change: '+2.1%' },
                { label: 'New Followers', value: '23', change: '+5' },
                { label: 'Orders from Social', value: '18', change: '+7' }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                  style={{ borderColor: '#e2e8f0' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5" style={{ color: '#2bb5a0' }} />
                    <span className="text-sm font-medium" style={{ color: '#2bb5a0' }}>{metric.change}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#112240' }}>{metric.value}</div>
                  <div className="text-sm text-gray-500">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Best Performing Posts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#e2e8f0' }}>
              <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#112240' }}>
                <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#2bb5a0' }} />
                Best Performing Posts This Week
              </h2>

              <div className="space-y-4">
                {[
                  { type: 'Instagram Post', content: 'Fresh homemade biryani ready!', likes: 47, comments: 8, shares: 3 },
                  { type: 'WhatsApp Status', content: 'Morning preparation behind the scenes', views: 156, replies: 12 },
                  { type: 'Instagram Story', content: 'Customer testimonial video', views: 234, reactions: 28 }
                ].map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                    <div>
                      <div className="font-medium" style={{ color: '#112240' }}>{post.type}</div>
                      <div className="text-sm text-gray-500">{post.content}</div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {(post as any).likes && <div>💖 {(post as any).likes} likes</div>}
                      {(post as any).views && <div>👁️ {(post as any).views} views</div>}
                      {(post as any).comments && <div>💬 {(post as any).comments} comments</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketingTools;
