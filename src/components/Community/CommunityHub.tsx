import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Community, SkillExchange } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

type ViewMode = 'communities' | 'messages';

export const CommunityHub = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('communities');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [skillExchanges, setSkillExchanges] = useState<SkillExchange[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    loadCommunities();
    loadSkillExchanges();
  }, []);

  const loadCommunities = async () => {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error loading communities:', error);
      return;
    }

    setCommunities(data || []);
  };

  const loadSkillExchanges = async () => {
    const { data, error } = await supabase
      .from('skill_exchanges')
      .select('*, user_profiles(username, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error loading skill exchanges:', error);
      return;
    }

    setSkillExchanges(data || []);
  };

  const handleCreateCommunity = async () => {
    if (!newCommunity.name.trim()) return;

    const tags = newCommunity.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const { error } = await supabase.from('communities').insert([
      {
        name: newCommunity.name,
        description: newCommunity.description,
        tags,
        creator_id: user?.id,
        member_count: 1,
      },
    ]);

    if (error) {
      console.error('Error creating community:', error);
      return;
    }

    setNewCommunity({ name: '', description: '', tags: '' });
    setShowCreateModal(false);
    loadCommunities();
  };

  const handleJoinCommunity = async (communityId: string) => {
    const { error } = await supabase.from('community_members').insert([
      {
        community_id: communityId,
        user_id: user?.id,
      },
    ]);

    if (error) {
      console.error('Error joining community:', error);
      return;
    }

    loadCommunities();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            社区中心
          </h1>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant={viewMode === 'communities' ? 'default' : 'outline'}
            onClick={() => setViewMode('communities')}
            className={viewMode === 'communities' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
          >
            <img src="/users.svg" alt="社群" className={`w-5 h-5 mr-2 ${viewMode === 'communities' ? 'filter invert' : ''}`} />
            社群推荐
          </Button>
          <Button
            variant={viewMode === 'messages' ? 'default' : 'outline'}
            onClick={() => setViewMode('messages')}
            className={viewMode === 'messages' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
          >
            <img src="/message-square.svg" alt="私信" className={`w-5 h-5 mr-2 ${viewMode === 'messages' ? 'filter invert' : ''}`} />
            私信
          </Button>
        </div>

        {viewMode === 'communities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <Card key={community.id} className="shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{community.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <img src="/users.svg" alt="成员" className="w-4 h-4" />
                        <span className="text-sm font-medium">{community.member_count} 人</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {community.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleJoinCommunity(community.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        size="sm"
                      >
                        加入社群
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">技能交换</CardTitle>
                <p className="text-sm text-gray-600">找到志同道合的运动伙伴，互相学习</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillExchanges.map((exchange) => (
                    <div
                      key={exchange.id}
                      className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-purple-300 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                          {exchange.user_profiles?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className="font-medium text-gray-900">
                          {exchange.user_profiles?.username || '用户'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-semibold text-sm">擅长:</span>
                          <span className="text-gray-700 text-sm">{exchange.skill_offer}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-semibold text-sm">想学:</span>
                          <span className="text-gray-700 text-sm">{exchange.skill_wanted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {viewMode === 'messages' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">私信列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <img src="/message-square.svg" alt="消息" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>暂无私信消息</p>
                <p className="text-sm mt-2">加入社群，开始与其他运动爱好者交流吧</p>
              </div>
            </CardContent>
          </Card>
        )}

        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <img src="/plus.svg" alt="创建" className="w-8 h-8 filter invert" />
        </button>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900">创建新社群</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">社群名称</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="输入社群名称"
                    value={newCommunity.name}
                    onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">社群简介</Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="简单介绍一下社群"
                    value={newCommunity.description}
                    onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">标签</Label>
                  <Input
                    id="tags"
                    type="text"
                    placeholder="如：跑步,健身,户外（用逗号分隔）"
                    value={newCommunity.tags}
                    onChange={(e) => setNewCommunity({ ...newCommunity, tags: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowCreateModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleCreateCommunity}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    创建
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
