import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';

interface NotificationsSettingsProps {
  onBack: () => void;
}

export const NotificationsSettings = ({ onBack }: NotificationsSettingsProps) => {
  const [settings, setSettings] = useState({
    newMessage: true,
    communityUpdate: true,
    achievementUnlocked: true,
    weeklyReport: false,
    soundEnabled: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsItems = [
    { key: 'newMessage' as const, label: '新消息通知', description: '收到新私信时推送通知' },
    { key: 'communityUpdate' as const, label: '社群动态', description: '关注的社群有新动态时通知' },
    { key: 'achievementUnlocked' as const, label: '成就解锁', description: '获得新徽章时通知' },
    { key: 'weeklyReport' as const, label: '每周报告', description: '每周一发送运动数据总结' },
    { key: 'soundEnabled' as const, label: '提示音', description: '通知时播放提示音' },
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
              <CardTitle className="text-gray-900">通知设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {settingsItems.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <Label className="text-base font-medium text-gray-900">{item.label}</Label>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key] ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
