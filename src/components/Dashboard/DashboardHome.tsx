import React from 'react';
import { Plus, FileText, Clock, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSWMS } from '../../contexts/SWMSContext';

interface DashboardHomeProps {
  onCreateNew: () => void;
  onViewSWMS: () => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onCreateNew, onViewSWMS }) => {
  const { user } = useAuth();
  const { swmsList } = useSWMS();

  const drafts = swmsList.filter(s => s.status === 'draft').length;
  const completed = swmsList.filter(s => s.status === 'completed').length;
  const recentDocuments = swmsList
    .filter(s => s.status !== 'deleted')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Available Credits',
      value: user?.credits || 0,
      icon: TrendingUp,
      color: 'blue',
      description: 'Credits remaining'
    },
    {
      title: 'Draft SWMS',
      value: drafts,
      icon: Clock,
      color: 'yellow',
      description: 'In progress'
    },
    {
      title: 'Completed SWMS',
      value: completed,
      icon: CheckCircle,
      color: 'green',
      description: 'Ready to use'
    },
    {
      title: 'Total Documents',
      value: drafts + completed,
      icon: FileText,
      color: 'purple',
      description: 'All time'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.fullName}!
            </h2>
            <p className="text-blue-100 mb-4">
              Ready to create professional SWMS documents for your construction projects
            </p>
            <button
              onClick={onCreateNew}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New SWMS</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
            <button
              onClick={onViewSWMS}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          
          {recentDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No SWMS documents yet</p>
              <button
                onClick={onCreateNew}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first SWMS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {doc.projectInfo.jobName || 'Untitled SWMS'}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {doc.projectInfo.tradeType} • {new Date(doc.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={onCreateNew}
              className="w-full flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Create New SWMS</h4>
                <p className="text-sm text-gray-500">Start a new safety document</p>
              </div>
            </button>

            <button
              onClick={onViewSWMS}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Manage SWMS</h4>
                <p className="text-sm text-gray-500">View and edit documents</p>
              </div>
            </button>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Reminder</h4>
              </div>
              <p className="text-sm text-yellow-800">
                SWMS documents should be reviewed and updated regularly to ensure compliance with current safety standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;