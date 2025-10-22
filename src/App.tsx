import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/Auth/LoginPage';
import { Questionnaire } from './components/Onboarding/Questionnaire';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AICoach } from './components/AICoach/AICoach';
import { CommunityHub } from './components/Community/CommunityHub';
import { ProfileCenter } from './components/Profile/ProfileCenter';
import { BottomNav } from './components/Layout/BottomNav';
import { supabase } from './lib/supabase';

type Tab = 'dashboard' | 'ai-coach' | 'community' | 'profile';

const AppContent = () => {
  const { user, profile, loading } = useAuth();
  const [hasPreferences, setHasPreferences] = useState<boolean | null>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');

  useEffect(() => {
    checkUserPreferences();
  }, [user]);

  const checkUserPreferences = async () => {
    if (!user) {
      setHasPreferences(null);
      return;
    }

    const { data, error } = await supabase
      .from('user_preferences')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error checking preferences:', error);
      setHasPreferences(false);
      return;
    }

    setHasPreferences(!!data);
  };

  if (loading || (user && hasPreferences === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <LoginPage />;
  }

  if (!hasPreferences) {
    return <Questionnaire onComplete={() => setHasPreferences(true)} />;
  }

  return (
    <div className="relative min-h-screen">
      {currentTab === 'dashboard' && <Dashboard />}
      {currentTab === 'ai-coach' && <AICoach />}
      {currentTab === 'community' && <CommunityHub />}
      {currentTab === 'profile' && <ProfileCenter />}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
