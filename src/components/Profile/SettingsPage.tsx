import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface SettingsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const SettingsPage = ({ onBack, onNavigate }: SettingsPageProps) => {
  const settingsItems = [
    {
      id: 'notifications',
      icon: '/bell.svg',
      label: '通知设置',
      description: '管理推送通知偏好',
    },
    {
      id: 'security',
      icon: '/lock.svg',
      label: '账户安全',
      description: '修改密码和安全设置',
    },
    {
      id: 'devices',
      icon: '/container.svg',
      label: '设备绑定',
      description: '管理已绑定的设备',
    },
    {
      id: 'language',
      icon: '/info.svg',
      label: '语言设置',
      description: '切换应用显示语言',
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
            <img src="/chevron-right.svg" alt="返回" className="w-5 h-5 rotate-180" />
            <span className="font-medium">返回</span>
          </button>
        </div>

        <div className="p-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">设置</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {settingsItems.map((item, index) => (
                <div key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors duration-200 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500 truncate">{item.description}</p>
                    </div>
                    <img src="/chevron-right.svg" alt="" className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </button>
                  {index < settingsItems.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
