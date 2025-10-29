import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, AIConversation } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AICoach = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversationHistory();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateMockConversations = (): Message[] => {
    const now = new Date();
    const mockConversations = [
      {
        userMsg: '你好！我想开始健身，但不知道从哪里开始。',
        aiMsg: '您好！很高兴您决定开始健身之旅！对于初学者，我建议：\n\n1. 先从简单的有氧运动开始，如快走、慢跑或游泳\n2. 每周训练3-4次，每次30-45分钟\n3. 逐步加入力量训练，使用自重训练或轻量哑铃\n4. 确保充足的休息和恢复时间\n\n您想重点发展哪方面呢？',
        timeOffset: 48,
      },
      {
        userMsg: '我想增肌，应该怎么安排训练计划？',
        aiMsg: '很好的目标！增肌需要系统的训练计划。建议：\n\n训练安排：\n- 每周4-5次力量训练\n- 采用分化训练：胸+三头、背+二头、腿部+肩部\n- 每个动作3-4组，每组8-12次\n- 组间休息60-90秒\n\n营养建议：\n- 热量盈余：比维持热量多300-500卡\n- 蛋白质：每公斤体重摄入1.6-2.2克\n- 训练后30分钟内补充蛋白质\n\n记得保证充足睡眠，肌肉在休息时生长！',
        timeOffset: 47,
      },
      {
        userMsg: '运动后应该吃什么比较好？',
        aiMsg: '运动后的营养补充很重要！建议：\n\n运动后30-60分钟内：\n🥤 蛋白质补充：\n- 鸡胸肉、鱼类、鸡蛋\n- 或蛋白粉奶昔\n\n🍌 碳水化合物：\n- 香蕉、燕麦、红薯\n- 帮助恢复糖原储备\n\n💧 水分补充：\n- 充足的水或运动饮料\n- 补充流失的电解质\n\n避免：高脂肪食物（会影响吸收）和酒精（影响恢复）',
        timeOffset: 24,
      },
    ];

    const messages: Message[] = [];
    mockConversations.forEach((conv, idx) => {
      const timestamp = new Date(now.getTime() - conv.timeOffset * 60 * 60 * 1000);
      messages.push({
        id: `mock-${idx}-user`,
        role: 'user',
        content: conv.userMsg,
        timestamp,
      });
      messages.push({
        id: `mock-${idx}-assistant`,
        role: 'assistant',
        content: conv.aiMsg,
        timestamp: new Date(timestamp.getTime() + 30000),
      });
    });

    return messages;
  };

  const loadConversationHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(20);

    if (error) {
      console.error('Error loading conversations:', error);
      setMessages(generateMockConversations());
      return;
    }

    const historicalMessages: Message[] = [];
    data?.forEach((conv: AIConversation) => {
      historicalMessages.push({
        id: `${conv.id}-user`,
        role: 'user',
        content: conv.message,
        timestamp: new Date(conv.created_at),
      });
      historicalMessages.push({
        id: `${conv.id}-assistant`,
        role: 'assistant',
        content: conv.response,
        timestamp: new Date(conv.created_at),
      });
    });

    if (historicalMessages.length === 0) {
      setMessages(generateMockConversations());
    } else {
      setMessages(historicalMessages);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    const sportsPrefs = preferences?.sports_preferences || [];
    const goal = preferences?.fitness_goal || '提升整体健康水平';
    const frequency = preferences?.weekly_frequency || 3;

    const responses = [
      `根据您的目标"${goal}"，我建议您每周进行${frequency}次训练。结合您喜欢的${sportsPrefs.join('、')}等运动，制定一个多样化的训练计划会更有效果。`,
      `很好的问题！对于${sportsPrefs[0] || '运动'}，建议您：\n\n1. 热身运动：5-10分钟动态拉伸\n2. 主要训练：30-40分钟中等强度训练\n3. 放松整理：5-10分钟静态拉伸\n\n饮食方面，建议增加优质蛋白质摄入，如鸡胸肉、鱼类、豆制品等，同时保持充足的水分补充。`,
      `为了达成"${goal}"这个目标，您需要保持规律的训练节奏。建议：\n\n训练计划：\n- 有氧运动：每周${frequency}次，每次30-45分钟\n- 力量训练：每周2-3次，针对主要肌群\n- 休息日：每周1-2天完全休息\n\n营养建议：\n- 早餐：高蛋白质+复合碳水化合物\n- 午餐：均衡搭配，蔬菜为主\n- 晚餐：清淡为主，控制碳水摄入\n- 加餐：坚果、水果、酸奶`,
      `针对您的运动频率（每周${frequency}次），这是一个很好的起点！持续保持这个频率，配合合理的休息，您会看到明显进步。\n\n记住运动三要素：\n✅ 规律性 - 保持固定的训练时间\n✅ 渐进性 - 逐步增加训练强度\n✅ 恢复性 - 给身体足够的休息时间\n\n加油，坚持就是胜利！`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const aiResponse = await generateAIResponse(userMessage);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

      await supabase.from('ai_conversations').insert([
        {
          user_id: user?.id,
          message: userMessage,
          response: aiResponse,
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl rounded-none sm:rounded-xl min-h-screen sm:min-h-0 sm:m-4">
          <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <img src="/brain-cog.svg" alt="AI" className="w-8 h-8 filter invert" />
              AI 教练
            </CardTitle>
            <p className="text-sm text-white/90 mt-1">您的专属健身助手</p>
          </CardHeader>
          <CardContent className="p-0 flex flex-col" style={{ height: 'calc(100vh - 180px)', maxHeight: '600px' }}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl mb-4">💪</div>
                  <p className="text-gray-600 text-lg font-medium">
                    您好！我是您的AI健身教练
                  </p>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    我可以为您提供个性化的训练计划、饮食建议和运动指导。请随时向我提问！
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage('如何制定健身计划？')}
                      className="text-purple-600 border-purple-300 hover:bg-purple-50"
                    >
                      如何制定健身计划？
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage('运动后吃什么比较好？')}
                      className="text-purple-600 border-purple-300 hover:bg-purple-50"
                    >
                      运动后吃什么？
                    </Button>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <img src="/brain-cog.svg" alt="AI" className="w-5 h-5" />
                        <span className="text-xs font-semibold text-purple-600">AI 教练</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-gray-600">AI 教练正在思考...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t bg-white p-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="输入您的问题..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={loading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={loading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <img src="/send-horizontal.svg" alt="发送" className="w-5 h-5 filter invert" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
