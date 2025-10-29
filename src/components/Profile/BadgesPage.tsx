import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Badge } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BadgesPageProps {
  onBack: () => void;
}

export const BadgesPage = ({ onBack }: BadgesPageProps) => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBadges();
  }, [user]);

  const loadBadges = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    if (error) {
      console.error('Error loading badges:', error);
    } else {
      setBadges(data || []);
    }
    setLoading(false);
  };

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
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <img src="/award.svg" alt="徽章" className="w-6 h-6" />
                我的徽章
                <span className="text-sm font-normal text-gray-600 ml-2">
                  ({badges.length} 个)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : badges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <button
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge)}
                      className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="text-5xl mb-2">{badge.badge_icon}</div>
                      <p className="text-sm font-medium text-gray-700 text-center">
                        {badge.badge_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {badge.badge_type}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-lg font-medium">还没有获得徽章</p>
                  <p className="text-sm mt-2">坚持运动，解锁更多成就</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedBadge && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBadge(null)}
        >
          <Card
            className="w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="text-center">
              <div className="text-7xl mb-4">{selectedBadge.badge_icon}</div>
              <CardTitle className="text-2xl text-gray-900">{selectedBadge.badge_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">徽章类型</p>
                <p className="text-gray-900">{selectedBadge.badge_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">获得时间</p>
                <p className="text-gray-900">
                  {new Date(selectedBadge.earned_at).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">获得条件</p>
                <p className="text-gray-600 text-sm">
                  完成特定运动成就后自动解锁
                </p>
              </div>
              <Button
                onClick={() => setSelectedBadge(null)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                关闭
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
