import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatDetailProps {
  userId: string;
  onBack: () => void;
}

export const ChatDetail = ({ userId, onBack }: ChatDetailProps) => {
  const { t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState('');

  const mockChats: Record<string, { username: string; messages: Omit<ChatMessage, 'isOwn'>[] }> = {
    'user-1': {
      username: '健身达人',
      messages: [
        {
          id: '1',
          senderId: 'user-1',
          content: '你好！看到你在社群的分享，想请教一下关于深蹲的技巧',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
        {
          id: '2',
          senderId: 'me',
          content: '你好！深蹲时最重要的是保持正确的姿势。膝盖不要超过脚尖，背部保持挺直，臀部向后坐。',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        },
        {
          id: '3',
          senderId: 'user-1',
          content: '明白了！那深蹲的深度应该到什么程度比较合适？',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: '4',
          senderId: 'me',
          content: '一般建议大腿与地面平行或稍低一点。刚开始可以先做半蹲，等熟练后再逐步加深。记得量力而行，不要勉强。',
          timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000),
        },
      ],
    },
    'user-2': {
      username: '跑步爱好者',
      messages: [
        {
          id: '1',
          senderId: 'user-2',
          content: '周末一起去爬山吗？我知道一条很不错的路线',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        {
          id: '2',
          senderId: 'me',
          content: '好主意！具体是哪里呢？',
          timestamp: new Date(Date.now() - 4.8 * 60 * 60 * 1000),
        },
        {
          id: '3',
          senderId: 'user-2',
          content: '是市郊的紫金山，风景特别好，路线也不算太难。大概需要3-4小时',
          timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
        },
      ],
    },
    'user-3': {
      username: '瑜伽小姐姐',
      messages: [
        {
          id: '1',
          senderId: 'user-3',
          content: '谢谢你的建议！我按照你说的方法练习，效果很好',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          id: '2',
          senderId: 'me',
          content: '太好了！继续保持，瑜伽贵在坚持 😊',
          timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
        },
      ],
    },
  };

  const chatData = mockChats[userId] || { username: '用户', messages: [] };
  const [messages, setMessages] = useState<ChatMessage[]>(
    chatData.messages.map((msg) => ({
      ...msg,
      isOwn: msg.senderId === 'me',
    }))
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      content: inputMessage,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl rounded-none sm:rounded-xl min-h-screen sm:min-h-0 sm:m-4">
          <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <img src="/chevron-right.svg" alt={t('back')} className="w-5 h-5 rotate-180 filter invert" />
              </button>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                {chatData.username.charAt(0)}
              </div>
              <CardTitle className="text-white">{chatData.username}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col" style={{ height: 'calc(100vh - 180px)', maxHeight: '600px' }}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.isOwn
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.isOwn ? 'text-white/70' : 'text-gray-500'
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
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t bg-white p-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="输入消息..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
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
