import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, UserProfile, UserPreferences } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PersonalInfoProps {
  onBack: () => void;
}

export const PersonalInfo = ({ onBack }: PersonalInfoProps) => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    gender: '',
    birthday: '',
    height: '',
    weight: '',
    sportsPreferences: [] as string[],
  });

  useEffect(() => {
    loadPersonalInfo();
  }, [user]);

  const loadPersonalInfo = async () => {
    if (!user) return;

    const { data: prefsData } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (prefsData) {
      setPreferences(prefsData);
      setFormData({
        username: profile?.username || '',
        gender: '',
        birthday: '',
        height: prefsData.height?.toString() || '',
        weight: prefsData.weight?.toString() || '',
        sportsPreferences: prefsData.sports_preferences || [],
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await supabase
        .from('user_profiles')
        .update({
          username: formData.username,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      await supabase
        .from('user_preferences')
        .update({
          height: parseFloat(formData.height) || 0,
          weight: parseFloat(formData.weight) || 0,
          sports_preferences: formData.sportsPreferences,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user?.id);

      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const SPORTS_OPTIONS = [
    '跑步', '游泳', '健身房', '骑行', '瑜伽', '篮球', '足球', '徒步'
  ];

  const toggleSport = (sport: string) => {
    setFormData(prev => ({
      ...prev,
      sportsPreferences: prev.sportsPreferences.includes(sport)
        ? prev.sportsPreferences.filter(s => s !== sport)
        : [...prev.sportsPreferences, sport]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-sm z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
            >
              <img src="/chevron-right.svg" alt="返回" className="w-5 h-5 rotate-180" />
              <span className="font-medium">返回</span>
            </button>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                编辑
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {loading ? '保存中...' : '保存'}
              </Button>
            )}
          </div>
        </div>

        <div className="p-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">个人资料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                {isEditing ? (
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.username || '未设置'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">性别</Label>
                {isEditing ? (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormData({ ...formData, gender: '男' })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        formData.gender === '男'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                    >
                      男
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, gender: '女' })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        formData.gender === '女'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                    >
                      女
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.gender || '未设置'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">生日</Label>
                {isEditing ? (
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.birthday || '未设置'}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">身高 (cm)</Label>
                  {isEditing ? (
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                      {formData.height || '未设置'}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">体重 (kg)</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                      {formData.weight || '未设置'}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>运动偏好</Label>
                {isEditing ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SPORTS_OPTIONS.map((sport) => (
                      <button
                        key={sport}
                        onClick={() => toggleSport(sport)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.sportsPreferences.includes(sport)
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200'
                        }`}
                      >
                        {sport}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.sportsPreferences.length > 0 ? (
                      formData.sportsPreferences.map((sport, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {sport}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 p-3">未设置</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
