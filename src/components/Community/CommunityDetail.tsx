import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Community } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface CommunityPost {
  id: string;
  community_id: string;
  user_id: string;
  content: string;
  image_url: string;
  likes_count: number;
  created_at: string;
  user_profiles?: {
    username: string;
    avatar_url: string;
  };
}

interface CommunityMember {
  id: string;
  user_id: string;
  user_profiles?: {
    username: string;
    avatar_url: string;
  };
}

interface CommunityDetailProps {
  communityId: string;
  onBack: () => void;
}

export const CommunityDetail = ({ communityId, onBack }: CommunityDetailProps) => {
  const { user } = useAuth();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunityData();
  }, [communityId, user]);

  const loadCommunityData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadCommunityInfo(),
        loadMembers(),
        checkMembership(),
      ]);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCommunityInfo = async () => {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('id', communityId)
      .maybeSingle();

    if (error) throw error;
    setCommunity(data);
  };

  const loadMembers = async () => {
    const { data, error } = await supabase
      .from('community_members')
      .select('id, user_id, user_profiles(username, avatar_url)')
      .eq('community_id', communityId)
      .limit(10);

    if (error) throw error;
    setMembers(data || []);
  };

  const checkMembership = async () => {
    const { data, error } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', user?.id)
      .maybeSingle();

    if (error) throw error;
    setIsMember(!!data);

    if (data) {
      loadPosts();
    }
  };

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*, user_profiles(username, avatar_url)')
      .eq('community_id', communityId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error loading posts:', error);
      return;
    }

    setPosts(data || []);
  };

  const handleJoinCommunity = async () => {
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

    await supabase
      .from('communities')
      .update({ member_count: (community?.member_count || 0) + 1 })
      .eq('id', communityId);

    setIsMember(true);
    loadCommunityData();
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    const { error } = await supabase.from('community_posts').insert([
      {
        community_id: communityId,
        user_id: user?.id,
        content: newPostContent,
      },
    ]);

    if (error) {
      console.error('Error creating post:', error);
      return;
    }

    setNewPostContent('');
    loadPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
        <p className="text-gray-600">社群不存在</p>
      </div>
    );
  }

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

        <div className="p-4 space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl text-gray-900 mb-2">{community.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{community.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <img src="/users.svg" alt="成员" className="w-5 h-5" />
                  <span className="font-medium">{community.member_count} 人</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {community.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">成员列表</p>
                <div className="flex -space-x-2 overflow-hidden">
                  {members.slice(0, 10).map((member) => (
                    <div
                      key={member.id}
                      className="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold border-2 border-white"
                      title={member.user_profiles?.username}
                    >
                      {member.user_profiles?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  ))}
                  {members.length > 10 && (
                    <div className="inline-block w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-semibold border-2 border-white">
                      +{members.length - 10}
                    </div>
                  )}
                </div>
              </div>

              {!isMember ? (
                <Button
                  onClick={handleJoinCommunity}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-6 text-base"
                >
                  加入社群
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200">
                  <img src="/square-check-big.svg" alt="已加入" className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">已加入社群</span>
                </div>
              )}
            </CardContent>
          </Card>

          {isMember && (
            <>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">发布动态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    type="text"
                    placeholder="分享你的运动动态..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
                    className="text-base"
                  />
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    发布
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">社群动态</CardTitle>
                </CardHeader>
                <CardContent>
                  {posts.length > 0 ? (
                    <div className="space-y-4">
                      {posts.map((post) => (
                        <div
                          key={post.id}
                          className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                              {post.user_profiles?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {post.user_profiles?.username || '用户'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleString('zh-CN')}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                          <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                              <img src="/activity.svg" alt="点赞" className="w-4 h-4" />
                              <span>{post.likes_count}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <img src="/message-square.svg" alt="暂无动态" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>暂无动态</p>
                      <p className="text-sm mt-2">成为第一个发布动态的人吧</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
