import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useLanguage } from '../../contexts/LanguageContext';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage = ({ onBack }: AboutPageProps) => {
  const { t } = useLanguage();

  const updateLogs = [
    {
      version: 'v1.6.2',
      date: '2025-09-12',
      updates: [
        'Added multilingual support (Simplified Chinese, Traditional Chinese, English)',
        'Enhanced community interaction features',
        'Improved AI coach conversation history',
        'Optimized performance and bug fixes',
      ],
    },
    {
      version: 'v1.5.8',
      date: '2025-08-25',
      updates: [
        'New leaderboard feature',
        'Enhanced training statistics visualization',
        'Improved user profile customization',
      ],
    },
    {
      version: 'v1.5.0',
      date: '2025-08-01',
      updates: [
        'Launched community hub',
        'Added badge and achievement system',
        'Integrated AI fitness coach',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-sm z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <img src="/chevron-right.svg" alt={t('back')} className="w-5 h-5 rotate-180" />
            <span className="font-medium">{t('back')}</span>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">{t('about')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <img src="/dumbbell.svg" alt="MoveMate" className="w-10 h-10 brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">MoveMate</h2>
                <p className="text-gray-500">Your Smart Fitness Companion</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('version')}</span>
                  <span className="font-semibold text-gray-900">v1.6.2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('update_date')}</span>
                  <span className="font-semibold text-gray-900">2025-09-12</span>
                </div>
              </div>

              <Separator />

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">56,000+</div>
                    <div className="text-sm text-gray-600 mt-1">{t('users_suffix')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">80,000+</div>
                    <div className="text-sm text-gray-600 mt-1">{t('activities_suffix')}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">{t('update_log')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {updateLogs.map((log, index) => (
                <div key={log.version}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-bold text-purple-600">{log.version}</span>
                    <span className="text-sm text-gray-500">{log.date}</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {log.updates.map((update, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{update}</span>
                      </li>
                    ))}
                  </ul>
                  {index < updateLogs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
