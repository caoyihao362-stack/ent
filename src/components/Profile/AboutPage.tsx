import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage = ({ onBack }: AboutPageProps) => {
  const { t } = useLanguage();

  const versionHistory = [
    {
      version: 'v1.6.2',
      date: '2025/09/12',
      changes: [
        'Added multi-language support (Simplified Chinese, Traditional Chinese, English)',
        'Optimized community interaction experience',
        'Enhanced UI consistency',
        'Fixed various interface issues',
      ],
    },
    {
      version: 'v1.5.0',
      date: '2025/07/08',
      changes: [
        'Introduced AI Coach feature',
        'Added leaderboard and community modules',
        'Improved data visualization',
      ],
    },
    {
      version: 'v1.4.0',
      date: '2025/05/20',
      changes: [
        'Enhanced user profile and activity statistics',
        'Optimized app performance',
        'Added achievement badge system',
      ],
    },
    {
      version: 'v1.3.0',
      date: '2025/03/15',
      changes: [
        'Launched community features',
        'Added skill exchange platform',
        'Improved private messaging',
      ],
    },
  ];

  const getLocalizedChanges = (version: string, changes: string[]) => {
    if (t.languages[t.language] === 'English') {
      return changes;
    }

    const translations: Record<string, Record<string, string[]>> = {
      'v1.6.2': {
        'zh-CN': [
          '新增多语言支持（简体中文、繁体中文、英文）',
          '优化社区互动体验',
          '增强UI一致性',
          '修复若干界面问题',
        ],
        'zh-TW': [
          '新增多語言支持（簡體中文、繁體中文、英文）',
          '優化社區互動體驗',
          '增強UI一致性',
          '修復若干介面問題',
        ],
      },
      'v1.5.0': {
        'zh-CN': [
          '引入 AI 教练功能',
          '新增排行榜和社群功能模块',
          '改进数据可视化',
        ],
        'zh-TW': [
          '引入 AI 教練功能',
          '新增排行榜和社群功能模組',
          '改進數據可視化',
        ],
      },
      'v1.4.0': {
        'zh-CN': [
          '完善用户档案和运动数据统计',
          '优化应用性能',
          '新增成就徽章系统',
        ],
        'zh-TW': [
          '完善用戶檔案和運動數據統計',
          '優化應用性能',
          '新增成就徽章系統',
        ],
      },
      'v1.3.0': {
        'zh-CN': [
          '推出社群功能',
          '新增技能交换平台',
          '改进私信功能',
        ],
        'zh-TW': [
          '推出社群功能',
          '新增技能交換平台',
          '改進私信功能',
        ],
      },
    };

    const lang = t.language as 'zh-CN' | 'zh-TW';
    return translations[version]?.[lang] || changes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-sm z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <img src="/chevron-right.svg" alt="Back" className="w-5 h-5 rotate-180" />
            <span className="font-medium">{t.common.back}</span>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <img src="/dumbbell.svg" alt="MoveMate" className="w-10 h-10 filter invert" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MoveMate
              </CardTitle>
              <p className="text-gray-600 mt-2">{t.about.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50">
                  <p className="text-sm text-gray-600">{t.about.version}</p>
                  <p className="text-2xl font-bold text-purple-600">v1.6.2</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                  <p className="text-sm text-gray-600">{t.about.lastUpdate}</p>
                  <p className="text-lg font-bold text-blue-600">2025/09/12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">{t.about.statistics}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-white">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                  <img src="/users.svg" alt="Users" className="w-6 h-6 filter invert" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {t.language === 'en' ? 'Over' : '已有超过'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    56,000+ <span className="text-base font-normal text-gray-600">{t.about.totalUsers}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <img src="/activity.svg" alt="Activity" className="w-6 h-6 filter invert" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {t.language === 'en' ? 'Daily Generated' : '每日生成超过'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    80,000+ <span className="text-base font-normal text-gray-600">{t.about.dailyRecords}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">{t.about.updateHistory}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {versionHistory.map((item, index) => (
                <div
                  key={item.version}
                  className={`${
                    index !== versionHistory.length - 1
                      ? 'border-b border-gray-200 pb-6'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                      {item.version.replace('v', '')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.version}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-13">
                    {getLocalizedChanges(item.version, item.changes).map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
