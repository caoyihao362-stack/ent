import { supabase } from './supabase';

export const generateSeedData = async (userId: string, preferences?: any) => {
  await Promise.all([
    seedActivities(userId, preferences),
    seedAIConversations(userId, preferences),
    seedLeaderboardUsers(userId),
  ]);
};

const seedActivities = async (userId: string, preferences?: any) => {
  const activities = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const steps = Math.floor(8000 + Math.random() * 4000);
    const distance = Math.floor((steps / 1300) * 10) / 10;
    const duration = Math.floor(30 + Math.random() * 30);
    const calories = Math.floor(steps * 0.04);

    activities.push({
      user_id: userId,
      activity_type: 'running',
      distance: distance,
      steps: steps,
      duration: duration,
      calories: calories,
      activity_date: date.toISOString().split('T')[0],
    });
  }

  const { error } = await supabase
    .from('activities')
    .insert(activities);

  if (error) console.error('Error seeding activities:', error);
};

const seedAIConversations = async (userId: string, preferences?: any) => {
  const goal = preferences?.fitness_goal || '提升整体健康水平';
  const frequency = preferences?.weekly_frequency || 3;

  const conversations = [
    {
      user_id: userId,
      message: '最近跑步膝盖有点痛，该如何训练缓解？',
      response: '建议增加力量训练强化膝关节周围肌肉，并做好跑前热身和跑后拉伸。可以尝试以下练习：\n\n1. 深蹲和箭步蹲加强腿部肌肉\n2. 靠墙静蹲提升膝关节稳定性\n3. 泡沫轴放松大腿前侧和外侧\n4. 适当减少跑步距离，让膝盖充分恢复\n\n记住，如果疼痛持续，建议咨询专业医生。',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      user_id: userId,
      message: '想减脂，饮食上有什么建议？',
      response: `针对您"${goal}"的目标，饮食方面建议：\n\n早餐：\n- 燕麦片 + 鸡蛋 + 牛奶\n- 全麦面包 + 鸡胸肉\n\n午餐：\n- 糙米饭（一小碗）\n- 清蒸鱼或鸡胸肉\n- 大量蔬菜\n\n晚餐：\n- 减少碳水摄入\n- 增加蛋白质和蔬菜\n- 避免油炸食物\n\n加餐：\n- 坚果（适量）\n- 水果\n- 无糖酸奶\n\n配合每周${frequency}次运动，效果会更好！`,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { error } = await supabase
    .from('ai_conversations')
    .insert(conversations);

  if (error) console.error('Error seeding AI conversations:', error);
};

const seedLeaderboardUsers = async (currentUserId: string) => {
  const mockUsers = [
    { username: '运动达人小王', steps: 95000 },
    { username: '健身爱好者李明', steps: 88000 },
    { username: '跑步小能手', steps: 82000 },
    { username: '张三的健身日记', steps: 78000 },
    { username: '运动小白进化中', steps: 71000 },
    { username: '每日打卡王', steps: 68000 },
    { username: '马拉松爱好者', steps: 65000 },
    { username: '健康生活倡导者', steps: 61000 },
  ];

  for (const mockUser of mockUsers) {
    const randomEmail = `mock_${Math.random().toString(36).substring(7)}@movemate.app`;

    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: randomEmail,
      password: Math.random().toString(36).substring(7),
      email_confirm: true,
    });

    if (authError || !authUser.user) continue;

    await supabase.from('user_profiles').insert({
      id: authUser.user.id,
      username: mockUser.username,
      avatar_url: '',
    });

    const activities = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      activities.push({
        user_id: authUser.user.id,
        activity_type: 'running',
        steps: Math.floor(mockUser.steps / 7 + Math.random() * 2000),
        distance: Math.floor(Math.random() * 5 * 10) / 10,
        duration: Math.floor(30 + Math.random() * 20),
        calories: Math.floor(Math.random() * 300 + 200),
        activity_date: date.toISOString().split('T')[0],
      });
    }

    await supabase.from('activities').insert(activities);
  }
};

export const seedCommunityData = async (userId: string, communityId: string) => {
  const mockPosts = [
    {
      community_id: communityId,
      user_id: userId,
      content: '今天完成了5公里晨跑，感觉超棒！天气很好，推荐大家也出去运动一下。',
      likes_count: 8,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      community_id: communityId,
      user_id: userId,
      content: '分享一个拉伸小技巧：运动后一定要做充分的拉伸，可以有效减少肌肉酸痛。我一般会拉伸10-15分钟。',
      likes_count: 12,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { error } = await supabase
    .from('community_posts')
    .insert(mockPosts);

  if (error) console.error('Error seeding community posts:', error);
};

export const seedPrivateMessages = async (userId: string) => {
  const mockUsernames = ['Alex', 'Bella', 'Charlie'];

  for (const username of mockUsernames) {
    const randomEmail = `friend_${Math.random().toString(36).substring(7)}@movemate.app`;

    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: randomEmail,
      password: Math.random().toString(36).substring(7),
      email_confirm: true,
    });

    if (authError || !authUser.user) continue;

    await supabase.from('user_profiles').insert({
      id: authUser.user.id,
      username: username,
      avatar_url: '',
    });

    const messages = [
      {
        sender_id: authUser.user.id,
        receiver_id: userId,
        content: username === 'Alex' ? '明天一起晨跑吗？6点老地方见？' : '你分享的力量训练计划很棒，我准备也尝试一下。',
        read: false,
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        sender_id: userId,
        receiver_id: authUser.user.id,
        content: username === 'Alex' ? '好的，太棒了，一起加油！' : '太好了！有问题随时交流',
        read: true,
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
    ];

    await supabase.from('messages').insert(messages);
  }
};
