import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'zh-CN' | 'zh-TW' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  'zh-CN': {
    'loading': '加载中...',
    'login': '登录',
    'signup': '注册',
    'email': '邮箱',
    'password': '密码',
    'username': '用户名',
    'logout': '退出登录',
    'back': '返回',
    'save': '保存',
    'cancel': '取消',
    'dashboard': '主页',
    'ai_coach': 'AI教练',
    'community': '社区',
    'profile': '我的',
    'settings': '设置',
    'personal_info': '个人信息',
    'badges': '徽章成就',
    'help_support': '帮助与支持',
    'privacy_policy': '隐私政策',
    'notifications_settings': '通知设置',
    'notifications_desc': '管理推送通知偏好',
    'account_security': '账户安全',
    'security_desc': '修改密码和安全设置',
    'device_binding': '设备绑定',
    'devices_desc': '管理已绑定的设备',
    'language_settings': '语言设置',
    'language_desc': '切换应用显示语言',
    'about': '关于 MoveMate',
    'about_desc': '版本信息和产品介绍',
    'simplified_chinese': '简体中文',
    'traditional_chinese': '繁体中文',
    'english': 'English',
    'select_language': '选择语言',
    'language_changed': '语言已切换',
    'recent_activity': '最近活动',
    'training_stats': '训练统计',
    'leaderboard': '排行榜',
    'my_rank': '我的排名',
    'chat_with_ai': '与AI教练对话',
    'history': '历史记录',
    'communities': '社区列表',
    'my_communities': '我的社区',
    'trending': '热门',
    'posts': '帖子',
    'members': '成员',
    'joined': '已加入',
    'join': '加入',
    'version': '版本',
    'update_date': '更新日期',
    'whats_new': '新功能',
    'update_log': '更新日志',
    'total_users': '总用户数',
    'daily_activities': '每日活动数',
    'users_suffix': '名运动爱好者',
    'activities_suffix': '条训练数据',
  },
  'zh-TW': {
    'loading': '載入中...',
    'login': '登入',
    'signup': '註冊',
    'email': '郵箱',
    'password': '密碼',
    'username': '使用者名稱',
    'logout': '登出',
    'back': '返回',
    'save': '儲存',
    'cancel': '取消',
    'dashboard': '主頁',
    'ai_coach': 'AI教練',
    'community': '社群',
    'profile': '我的',
    'settings': '設定',
    'personal_info': '個人資訊',
    'badges': '徽章成就',
    'help_support': '幫助與支援',
    'privacy_policy': '隱私政策',
    'notifications_settings': '通知設定',
    'notifications_desc': '管理推送通知偏好',
    'account_security': '帳戶安全',
    'security_desc': '修改密碼和安全設定',
    'device_binding': '裝置綁定',
    'devices_desc': '管理已綁定的裝置',
    'language_settings': '語言設定',
    'language_desc': '切換應用顯示語言',
    'about': '關於 MoveMate',
    'about_desc': '版本資訊和產品介紹',
    'simplified_chinese': '简体中文',
    'traditional_chinese': '繁體中文',
    'english': 'English',
    'select_language': '選擇語言',
    'language_changed': '語言已切換',
    'recent_activity': '最近活動',
    'training_stats': '訓練統計',
    'leaderboard': '排行榜',
    'my_rank': '我的排名',
    'chat_with_ai': '與AI教練對話',
    'history': '歷史記錄',
    'communities': '社群列表',
    'my_communities': '我的社群',
    'trending': '熱門',
    'posts': '貼文',
    'members': '成員',
    'joined': '已加入',
    'join': '加入',
    'version': '版本',
    'update_date': '更新日期',
    'whats_new': '新功能',
    'update_log': '更新日誌',
    'total_users': '總使用者數',
    'daily_activities': '每日活動數',
    'users_suffix': '名運動愛好者',
    'activities_suffix': '條訓練資料',
  },
  'en': {
    'loading': 'Loading...',
    'login': 'Login',
    'signup': 'Sign Up',
    'email': 'Email',
    'password': 'Password',
    'username': 'Username',
    'logout': 'Logout',
    'back': 'Back',
    'save': 'Save',
    'cancel': 'Cancel',
    'dashboard': 'Dashboard',
    'ai_coach': 'AI Coach',
    'community': 'Community',
    'profile': 'Profile',
    'settings': 'Settings',
    'personal_info': 'Personal Info',
    'badges': 'Badges',
    'help_support': 'Help & Support',
    'privacy_policy': 'Privacy Policy',
    'notifications_settings': 'Notifications',
    'notifications_desc': 'Manage push notification preferences',
    'account_security': 'Account Security',
    'security_desc': 'Change password and security settings',
    'device_binding': 'Device Binding',
    'devices_desc': 'Manage connected devices',
    'language_settings': 'Language',
    'language_desc': 'Switch app display language',
    'about': 'About MoveMate',
    'about_desc': 'Version info and product details',
    'simplified_chinese': '简体中文',
    'traditional_chinese': '繁體中文',
    'english': 'English',
    'select_language': 'Select Language',
    'language_changed': 'Language Changed',
    'recent_activity': 'Recent Activity',
    'training_stats': 'Training Stats',
    'leaderboard': 'Leaderboard',
    'my_rank': 'My Rank',
    'chat_with_ai': 'Chat with AI Coach',
    'history': 'History',
    'communities': 'Communities',
    'my_communities': 'My Communities',
    'trending': 'Trending',
    'posts': 'Posts',
    'members': 'Members',
    'joined': 'Joined',
    'join': 'Join',
    'version': 'Version',
    'update_date': 'Update Date',
    'whats_new': "What's New",
    'update_log': 'Update Log',
    'total_users': 'Total Users',
    'daily_activities': 'Daily Activities',
    'users_suffix': 'fitness enthusiasts',
    'activities_suffix': 'training records',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'zh-CN';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
