import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase, Activity } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar_url: string;
  total_steps: number;
  rank: number;
}

type TimeRange = 'day' | 'week' | 'month';

export const Dashboard = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user, timeRange]);

  const loadDashboardData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await Promise.all([loadActivities(), loadLeaderboard()]);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadActivities = async () => {
    const days = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', user?.id)
      .gte('activity_date', startDate.toISOString().split('T')[0])
      .order('activity_date', { ascending: true });

    if (error) throw error;
    setActivities(data || []);
  };

  const loadLeaderboard = async () => {
    const days = timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: activitiesData, error } = await supabase
      .from('activities')
      .select('user_id, steps, user_profiles(username, avatar_url)')
      .gte('activity_date', startDate.toISOString().split('T')[0]);

    if (error) throw error;

    const userSteps = new Map<string, { username: string; avatar_url: string; steps: number }>();

    activitiesData?.forEach((activity: any) => {
      const userId = activity.user_id;
      const existing = userSteps.get(userId);
      const profile = activity.user_profiles;

      if (existing) {
        existing.steps += activity.steps || 0;
      } else if (profile) {
        userSteps.set(userId, {
          username: profile.username,
          avatar_url: profile.avatar_url,
          steps: activity.steps || 0,
        });
      }
    });

    const leaderboardData: LeaderboardEntry[] = Array.from(userSteps.entries())
      .map(([id, data]) => ({
        id,
        username: data.username,
        avatar_url: data.avatar_url,
        total_steps: data.steps,
        rank: 0,
      }))
      .sort((a, b) => b.total_steps - a.total_steps)
      .slice(0, 10)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    setLeaderboard(leaderboardData);
  };

  const chartData = activities.map((activity) => ({
    date: new Date(activity.activity_date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
    steps: activity.steps,
    distance: activity.distance,
  }));

  const totalSteps = activities.reduce((sum, activity) => sum + activity.steps, 0);
  const totalDistance = activities.reduce((sum, activity) => sum + activity.distance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t.dashboard.title}
          </h1>
        </div>

        <div className="flex justify-center mb-4">
          <ToggleGroup type="single" value={timeRange} onValueChange={(v) => v && setTimeRange(v as TimeRange)}>
            <ToggleGroupItem value="day" className="data-[state=on]:bg-purple-600 data-[state=on]:text-white">
              {t.dashboard.timeRange.day}
            </ToggleGroupItem>
            <ToggleGroupItem value="week" className="data-[state=on]:bg-purple-600 data-[state=on]:text-white">
              {t.dashboard.timeRange.week}
            </ToggleGroupItem>
            <ToggleGroupItem value="month" className="data-[state=on]:bg-purple-600 data-[state=on]:text-white">
              {t.dashboard.timeRange.month}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">{t.dashboard.totalSteps}</p>
                <p className="text-4xl font-bold text-purple-600">{totalSteps.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">{t.dashboard.totalDistance}</p>
                <p className="text-4xl font-bold text-blue-600">{totalDistance.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">{t.dashboard.trendChart}</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="steps"
                    stroke="#9333ea"
                    strokeWidth={3}
                    dot={{ fill: '#9333ea', r: 4 }}
                    activeDot={{ r: 6 }}
                    name={t.dashboard.steps}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {t.dashboard.noData}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <img src="/trophy.svg" alt={t.dashboard.leaderboard} className="w-6 h-6" />
              {t.dashboard.leaderboard}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                      entry.id === user?.id
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                      {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                      {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                      {entry.rank > 3 && (
                        <span className="text-gray-500 font-semibold w-8 text-center">
                          {entry.rank}
                        </span>
                      )}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                        {entry.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={`font-medium ${entry.id === user?.id ? 'text-purple-700' : 'text-gray-900'}`}>
                        {entry.username}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">
                        {entry.total_steps.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{t.dashboard.steps}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {t.dashboard.noLeaderboard}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
