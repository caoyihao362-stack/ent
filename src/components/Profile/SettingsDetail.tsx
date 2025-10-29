import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage, Language } from '../../contexts/LanguageContext';

interface SettingsDetailProps {
  settingType: 'notifications' | 'security' | 'devices' | 'language';
  onBack: () => void;
}

export const SettingsDetail = ({ settingType, onBack }: SettingsDetailProps) => {
  const { language, setLanguage, t } = useLanguage();

  const [notificationSettings, setNotificationSettings] = useState({
    newMessage: true,
    communityUpdate: true,
    achievementUnlocked: true,
    weeklyReport: false,
    soundEnabled: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderNotifications = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">通知设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { key: 'newMessage' as const, label: '新消息通知', desc: '收到新私信时推送通知' },
          { key: 'communityUpdate' as const, label: '社群动态', desc: '关注的社群有新动态时通知' },
          { key: 'achievementUnlocked' as const, label: '成就解锁', desc: '获得新徽章时通知' },
          { key: 'weeklyReport' as const, label: '每周报告', desc: '每周一发送运动数据总结' },
          { key: 'soundEnabled' as const, label: '提示音', desc: '通知时播放提示音' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <Label className="text-base font-medium text-gray-900">{item.label}</Label>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
            <button
              onClick={() => toggleNotification(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings[item.key] ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderSecurity = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">账户安全</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="oldPassword">当前密码</Label>
          <Input
            id="oldPassword"
            type="password"
            value={passwordForm.oldPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
            placeholder="请输入当前密码"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">新密码</Label>
          <Input
            id="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="请输入新密码"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">确认新密码</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            placeholder="请再次输入新密码"
          />
        </div>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
          修改密码
        </Button>
      </CardContent>
    </Card>
  );

  const renderDevices = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">设备绑定</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <img src="/container.svg" alt="设备" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-gray-600 mb-4">暂无已绑定的设备</p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600"
            disabled
          >
            绑定新设备 (即将开放)
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderLanguage = () => {
    const languages: { code: Language; label: string }[] = [
      { code: 'zh-CN', label: t('simplified_chinese') },
      { code: 'zh-TW', label: t('traditional_chinese') },
      { code: 'en', label: t('english') },
    ];

    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">{t('language_settings')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                language === lang.code
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-medium ${
                    language === lang.code ? 'text-purple-700' : 'text-gray-900'
                  }`}
                >
                  {lang.label}
                </span>
                {language === lang.code && (
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    );
  };

  const titles = {
    notifications: '通知设置',
    security: '账户安全',
    devices: '设备绑定',
    language: '语言设置',
  };

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

        <div className="p-4">
          {settingType === 'notifications' && renderNotifications()}
          {settingType === 'security' && renderSecurity()}
          {settingType === 'devices' && renderDevices()}
          {settingType === 'language' && renderLanguage()}
        </div>
      </div>
    </div>
  );
};
