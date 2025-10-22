import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SPORTS_OPTIONS = [
  { id: 'running', label: '跑步', icon: '🏃' },
  { id: 'swimming', label: '游泳', icon: '🏊' },
  { id: 'gym', label: '健身房', icon: '💪' },
  { id: 'cycling', label: '骑行', icon: '🚴' },
  { id: 'yoga', label: '瑜伽', icon: '🧘' },
  { id: 'basketball', label: '篮球', icon: '🏀' },
  { id: 'soccer', label: '足球', icon: '⚽' },
  { id: 'hiking', label: '徒步', icon: '🥾' },
];

const FREQUENCY_OPTIONS = [
  { value: 1, label: '每周1次' },
  { value: 2, label: '每周2次' },
  { value: 3, label: '每周3次' },
  { value: 4, label: '每周4次' },
  { value: 5, label: '每周5次及以上' },
];

interface QuestionnaireProps {
  onComplete: () => void;
}

export const Questionnaire = ({ onComplete }: QuestionnaireProps) => {
  const { user } = useAuth();
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [frequency, setFrequency] = useState(3);
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSport = (sportId: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportId)
        ? prev.filter((id) => id !== sportId)
        : [...prev, sportId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSports.length === 0) {
      setError('请至少选择一项运动偏好');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('user_preferences').insert([
        {
          user_id: user?.id,
          sports_preferences: selectedSports,
          height: parseFloat(height) || 0,
          weight: parseFloat(weight) || 0,
          weekly_frequency: frequency,
          fitness_goal: fitnessGoal,
        },
      ]);

      if (insertError) throw insertError;

      onComplete();
    } catch (err: any) {
      setError(err.message || '保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 pb-24 overflow-y-auto">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              完善个人信息
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              帮助我们了解您的运动偏好，为您提供个性化服务
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  运动偏好
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (可多选)
                  </span>
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SPORTS_OPTIONS.map((sport) => (
                    <button
                      key={sport.id}
                      type="button"
                      onClick={() => toggleSport(sport.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedSports.includes(sport.id)
                          ? 'border-purple-600 bg-purple-50 shadow-md scale-105'
                          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow'
                      }`}
                    >
                      <div className="text-3xl mb-2">{sport.icon}</div>
                      <div
                        className={`text-sm font-medium ${
                          selectedSports.includes(sport.id)
                            ? 'text-purple-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {sport.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  身体情况
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm text-gray-700">
                      身高 (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      placeholder="如：170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm text-gray-700">
                      体重 (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="如：65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  运动频率
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FREQUENCY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFrequency(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        frequency === option.value
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-purple-300'
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          frequency === option.value
                            ? 'text-purple-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="goal" className="text-lg font-semibold text-gray-900">
                  健身目标
                </Label>
                <Input
                  id="goal"
                  type="text"
                  placeholder="如：减重5公斤、提高耐力、增肌等"
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="text-base"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 py-6 text-base font-semibold"
                disabled={loading}
              >
                {loading ? '保存中...' : '完成设置'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
