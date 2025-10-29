import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Badge as BadgeType, UserPreferences } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface ProfileCenterProps {
  onNavigate?: (page: string) => void;
}

export const ProfileCenter = ({ onNavigate }: ProfileCenterProps) => {
  const { user, profile, signOut } = useAuth();
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [badgesResult, prefsResult] = await Promise.all([
        supabase.from('badges').select('*').eq('user_id', user.id).order('earned_at', { ascending: false }),
        supabase.from('user_preferences').select('*').eq('user_id', user.id).maybeSingle(),
      ]);

      if (badgesResult.data) setBadges(badgesResult.data);
      if (prefsResult.data) setPreferences(prefsResult.data);
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { id: 'personal-info', icon: '/user-1.svg', label: '个人资料', description: '查看和编辑个人信息' },
    { id: 'badges', icon: '/award.svg', label: '我的徽章', description: `已获得 ${badges.length} 个徽章` },
    { id: 'settings', icon: '/settings.svg', label: '设置', description: '通知、隐私和更多' },
    { id: 'help', icon: '/circle-help.svg', label: '帮助与支持', description: '常见问题和联系客服' },
    { id: 'privacy', icon: '/shield.svg', label: '隐私政策', description: '了解我们如何保护您的数据' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-b-3xl shadow-xl">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-4xl font-bold text-white">
                {profile?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">{profile?.username || '用户'}</h2>
            <p className="text-white/80 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="p-4 space-y-4 mt-4">
          {preferences && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <img src="/activity.svg" alt="运动" className="w-5 h-5" />
                  运动概况
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">运动频率</p>
                    <p className="text-xl font-bold text-purple-600">
                      {preferences.weekly_frequency}次/周
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">健身目标</p>
                    <p className="text-sm font-medium text-gray-900">
                      {preferences.fitness_goal || '未设置'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">身高</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {preferences.height > 0 ? `${preferences.height} cm` : '未设置'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">体重</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {preferences.weight > 0 ? `${preferences.weight} kg` : '未设置'}
                    </p>
                  </div>
                </div>
                {preferences.sports_preferences && preferences.sports_preferences.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm text-gray-600 mb-2">喜欢的运动</p>
                      <div className="flex flex-wrap gap-2">
                        {preferences.sports_preferences.map((sport, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <img src="/award.svg" alt="徽章" className="w-5 h-5" />
                成就徽章
              </CardTitle>
            </CardHeader>
            <CardContent>
              {badges.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200"
                    >
                      <div className="text-4xl mb-2">{badge.badge_icon}</div>
                      <p className="text-xs font-medium text-gray-700 text-center">
                        {badge.badge_name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-5xl mb-3">🏆</div>
                  <p className="text-sm">还没有获得徽章</p>
                  <p className="text-xs mt-1">坚持运动，解锁更多成就</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-0">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => onNavigate?.(item.id)}
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
                  {index < menuItems.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 py-6"
          >
            退出登录
          </Button>
        </div>
      </div>
    </div>
  );
};
