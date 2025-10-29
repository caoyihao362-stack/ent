import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LoginPage } from './components/Auth/LoginPage';
import { Questionnaire } from './components/Onboarding/Questionnaire';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AICoach } from './components/AICoach/AICoach';
import { CommunityHub } from './components/Community/CommunityHub';
import { CommunityDetail } from './components/Community/CommunityDetail';
import { ProfileCenter } from './components/Profile/ProfileCenter';
import { PersonalInfo } from './components/Profile/PersonalInfo';
import { BadgesPage } from './components/Profile/BadgesPage';
import { SettingsPage } from './components/Profile/SettingsPage';
import { SettingsDetail } from './components/Profile/SettingsDetail';
import { HelpSupportPage } from './components/Profile/HelpSupportPage';
import { PrivacyPolicyPage } from './components/Profile/PrivacyPolicyPage';
import { AboutPage } from './components/Profile/AboutPage';
import { BottomNav } from './components/Layout/BottomNav';
import { supabase } from './lib/supabase';

type Tab = 'dashboard' | 'ai-coach' | 'community' | 'profile';
type ProfilePage = 'main' | 'personal-info' | 'badges' | 'settings' | 'help' | 'privacy' | 'about';
type SettingsType = 'notifications' | 'security' | 'devices' | 'language';

const AppContent = () => {
  const { user, profile, loading } = useAuth();
  const [hasPreferences, setHasPreferences] = useState<boolean | null>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');
  const [profilePage, setProfilePage] = useState<ProfilePage>('main');
  const [settingsType, setSettingsType] = useState<SettingsType | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

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

  const handleProfileNavigation = (page: string) => {
    if (page === 'settings') {
      setProfilePage('settings');
    } else if (['notifications', 'security', 'devices', 'language'].includes(page)) {
      setSettingsType(page as SettingsType);
    } else {
      setProfilePage(page as ProfilePage);
    }
  };

  const handleCommunitySelect = (communityId: string) => {
    setSelectedCommunityId(communityId);
  };

  const handleBackToCommunity = () => {
    setSelectedCommunityId(null);
  };

  const handleBackToProfile = () => {
    setProfilePage('main');
    setSettingsType(null);
  };

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    setProfilePage('main');
    setSettingsType(null);
    setSelectedCommunityId(null);
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

      {currentTab === 'community' && (
        <>
          {selectedCommunityId ? (
            <CommunityDetail
              communityId={selectedCommunityId}
              onBack={handleBackToCommunity}
            />
          ) : (
            <CommunityHub onCommunitySelect={handleCommunitySelect} />
          )}
        </>
      )}

      {currentTab === 'profile' && (
        <>
          {settingsType ? (
            <SettingsDetail
              settingType={settingsType}
              onBack={handleBackToProfile}
            />
          ) : profilePage === 'main' ? (
            <ProfileCenter onNavigate={handleProfileNavigation} />
          ) : profilePage === 'personal-info' ? (
            <PersonalInfo onBack={handleBackToProfile} />
          ) : profilePage === 'badges' ? (
            <BadgesPage onBack={handleBackToProfile} />
          ) : profilePage === 'settings' ? (
            <SettingsPage
              onBack={handleBackToProfile}
              onNavigate={(page) => setSettingsType(page as SettingsType)}
            />
          ) : profilePage === 'help' ? (
            <HelpSupportPage onBack={handleBackToProfile} />
          ) : profilePage === 'privacy' ? (
            <PrivacyPolicyPage onBack={handleBackToProfile} />
          ) : profilePage === 'about' ? (
            <AboutPage onBack={handleBackToProfile} />
          ) : (
            <ProfileCenter onNavigate={handleProfileNavigation} />
          )}
        </>
      )}

      <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
};
