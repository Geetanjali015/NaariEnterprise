import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Card from '../components/Card';
import { CheckCircle, Circle, Zap } from 'lucide-react';

export default function AIChecklist() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Complete GST Registration', description: 'Register your business for GST', category: 'Financial Planning', priority: 'high', is_completed: true, completed_at: '2024-01-15' },
    { id: 2, task: 'Open Business Bank Account', description: 'Separate personal and business finances', category: 'Financial Planning', priority: 'high', is_completed: true, completed_at: '2024-01-20' },
    { id: 3, task: 'Setup Accounting Software', description: 'Use accounting tool to track finances', category: 'Financial Planning', priority: 'high', is_completed: false },
    { id: 4, task: 'Develop Marketing Strategy', description: 'Create 6-month marketing plan', category: 'Marketing', priority: 'high', is_completed: false },
    { id: 5, task: 'Build Social Media Presence', description: 'Create accounts on Instagram, Facebook', category: 'Marketing', priority: 'medium', is_completed: true, completed_at: '2024-02-01' },
    { id: 6, task: 'Optimize Website', description: 'Improve page load and SEO', category: 'Technology', priority: 'medium', is_completed: false },
    { id: 7, task: 'Document Business Processes', description: 'Create SOPs for operations', category: 'Operations', priority: 'medium', is_completed: false },
    { id: 8, task: 'Hire First Team Member', description: 'Expand with first employee', category: 'Team', priority: 'low', is_completed: false }
  ]);

  const categories = ['All', ...new Set(checklist.map(t => t.category))];
  const filtered = selectedCategory === 'All' 
    ? checklist 
    : checklist.filter(t => t.category === selectedCategory);

  const totalTasks = checklist.length;
  const completedTasks = checklist.filter(t => t.is_completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Financial Planning': 'bg-blue-50 border-l-blue-500',
      'Operations': 'bg-purple-50 border-l-purple-500',
      'Marketing': 'bg-pink-50 border-l-pink-500',
      'Team': 'bg-green-50 border-l-green-500',
      'Technology': 'bg-orange-50 border-l-orange-500',
    };
    return colors[category] || 'bg-gray-50 border-l-gray-500';
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };
    return styles[priority] || styles.low;
  };

  const handleToggle = (id: number) => {
    setChecklist(prev => prev.map(task => 
      task.id === id ? { ...task, is_completed: !task.is_completed, completed_at: !task.is_completed ? new Date().toISOString() : undefined } : task
    ));
  };

  return (
    <DashboardLayout title="Growth Checklist">
      <div className="space-y-6">
        <Card padding="lg">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Overall Progress</h3>
              <span className="text-2xl font-bold text-[var(--color-violet)]">{completionPercentage}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-rose)]"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </Card>

        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-rose)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((task) => (
            <div key={task.id} onClick={() => handleToggle(task.id)}>
              <Card
                padding="md"
                className={`border-l-4 cursor-pointer transition-all hover:shadow-md ${getCategoryColor(task.category)} ${task.is_completed ? 'opacity-70' : ''}`}
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    {task.is_completed ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <Circle size={24} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className={`font-semibold ${task.is_completed ? 'line-through text-gray-600' : 'text-gray-900'}`}>
                          {task.task}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityBadge(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-white bg-opacity-60 rounded text-xs font-medium text-gray-700">
                        {task.category}
                      </span>
                    </div>

                    {task.is_completed && task.completed_at && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ Completed on {new Date(task.completed_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Card padding="lg" className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-purple-700 mb-1">Completed</p>
              <p className="text-2xl font-bold text-purple-900">{completedTasks}</p>
            </div>
            <div className="text-center border-l border-r border-purple-300">
              <p className="text-sm text-purple-700 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-purple-900">{totalTasks - completedTasks}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-purple-700 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-purple-900">{completionPercentage}%</p>
            </div>
          </div>
        </Card>

        {completionPercentage < 100 && (
          <Card padding="lg" className="bg-blue-50 border-l-4 border-l-blue-500">
            <div className="flex gap-3">
              <Zap size={24} className="text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">Keep going!</p>
                <p className="text-sm text-blue-800 mt-1">
                  You're {completionPercentage}% of the way there. Complete the remaining tasks to unlock your full business growth potential.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
