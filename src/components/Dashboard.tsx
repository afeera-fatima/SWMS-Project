import React, { useState } from 'react';
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Menu,
  Search,
  Settings,
  Shield,
  TrendingUp,
  Users,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Eye,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';

interface DashboardProps {
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'risk-analysis', label: 'Risk Analysis', icon: Shield },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const riskMetrics = [
    {
      title: 'Total Risk Score',
      value: '7.2',
      change: '-0.3',
      trend: 'down',
      color: 'emerald',
      icon: Shield
    },
    {
      title: 'Active Threats',
      value: '23',
      change: '+2',
      trend: 'up',
      color: 'red',
      icon: AlertTriangle
    },
    {
      title: 'Resolved Issues',
      value: '156',
      change: '+12',
      trend: 'up',
      color: 'blue',
      icon: CheckCircle
    },
    {
      title: 'Response Time',
      value: '2.4h',
      change: '-0.5h',
      trend: 'down',
      color: 'purple',
      icon: Clock
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'high',
      title: 'Suspicious Network Activity',
      description: 'Unusual traffic patterns detected from external IP',
      time: '5 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'medium',
      title: 'Failed Authentication Attempts',
      description: 'Multiple login failures from user account',
      time: '15 minutes ago',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'low',
      title: 'System Update Required',
      description: 'Security patch available for deployment',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'high',
      title: 'Data Breach Attempt',
      description: 'Unauthorized access attempt to sensitive data',
      time: '2 hours ago',
      status: 'resolved'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Security Analyst',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'online',
      lastActive: 'Active now'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Risk Manager',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'away',
      lastActive: '10 minutes ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Compliance Officer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'offline',
      lastActive: '2 hours ago'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Riskify</h1>
              <p className="text-xs text-gray-500">AI SAFETY CORP</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={onSignOut}
            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {activeTab.replace('-', ' ')}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeTab === 'overview' ? 'Monitor your security posture' : `Manage ${activeTab.replace('-', ' ')}`}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">John Smith</p>
                  <p className="text-xs text-gray-500">Security Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {riskMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                          <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                        </div>
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                        <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts and Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Trend Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Risk Trend</h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Filter className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart visualization would go here</p>
                    </div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">{alert.title}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                                {alert.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Team Activity</h3>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Manage Team
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-500' : 
                          member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{member.name}</p>
                        <p className="text-sm text-gray-500 truncate">{member.role}</p>
                        <p className="text-xs text-gray-400">{member.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tab content would go here */}
          {activeTab !== 'overview' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Section
                </h3>
                <p className="text-gray-600">
                  This section is under development. Content for {activeTab.replace('-', ' ')} will be available soon.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;