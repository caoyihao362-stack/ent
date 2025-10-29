import { useLanguage } from '../../contexts/LanguageContext';

interface BottomNavProps {
  currentTab: 'dashboard' | 'ai-coach' | 'community' | 'profile';
  onTabChange: (tab: 'dashboard' | 'ai-coach' | 'community' | 'profile') => void;
}

export const BottomNav = ({ currentTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard' as const, icon: '/dumbbell.svg', label: t('dashboard') },
    { id: 'ai-coach' as const, icon: '/brain-cog.svg', label: t('ai_coach') },
    { id: 'community' as const, icon: '/users.svg', label: t('community') },
    { id: 'profile' as const, icon: '/user.svg', label: t('profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
              currentTab === tab.id
                ? 'text-purple-600 scale-110'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <img
              src={tab.icon}
              alt={tab.label}
              className={`w-6 h-6 mb-1 transition-all duration-200 ${
                currentTab === tab.id ? 'filter-purple' : ''
              }`}
              style={{
                filter: currentTab === tab.id ? 'invert(30%) sepia(99%) saturate(3000%) hue-rotate(260deg) brightness(90%) contrast(95%)' : 'none'
              }}
            />
            <span className={`text-xs font-medium ${currentTab === tab.id ? 'font-semibold' : ''}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
