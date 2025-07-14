import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SWMSProvider } from './contexts/SWMSContext';
import AuthForm from './components/Auth/AuthForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardHome from './components/Dashboard/DashboardHome';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm activeTab={authTab} setActiveTab={setAuthTab} />;
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'create-swms': return 'Create New SWMS';
      case 'my-swms': return 'My SWMS Documents';
      case 'all-contacts': return 'All Contacts';
      case 'billing': return 'Billing & Analytics';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Overview of your SWMS documents and account';
      case 'create-swms': return 'Generate professional safety documentation';
      case 'my-swms': return 'Manage your saved SWMS documents';
      case 'all-contacts': return 'Manage platform users and accounts';
      case 'billing': return 'View usage statistics and billing information';
      case 'settings': return 'Configure your account preferences';
      default: return '';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardHome
            onCreateNew={() => setActiveTab('create-swms')}
            onViewSWMS={() => setActiveTab('my-swms')}
          />
        );
      case 'create-swms':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SWMS Builder</h3>
              <p className="text-gray-600">Multi-step SWMS creation wizard coming soon...</p>
            </div>
          </div>
        );
      case 'my-swms':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">My SWMS Documents</h3>
              <p className="text-gray-600">Document management interface coming soon...</p>
            </div>
          </div>
        );
      case 'all-contacts':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All Contacts</h3>
              <p className="text-gray-600">User management interface coming soon...</p>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing & Analytics</h3>
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Account settings coming soon...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 lg:ml-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SWMSProvider>
        <AppContent />
      </SWMSProvider>
    </AuthProvider>
  );
}

export default App;