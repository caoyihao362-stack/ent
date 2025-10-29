import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

interface MessagesPageProps {
  onBack: () => void;
  onChatSelect: (userId: string) => void;
}

export const MessagesPage = ({ onBack, onChatSelect }: MessagesPageProps) => {
  const { t } = useLanguage();

  const mockMessages: Message[] = [
    {
      id: '1',
      userId: 'user-1',
      username: '健身达人',
      avatar: '',
      lastMessage: '你好！看到你在社群的分享，想请教一下关于深蹲的技巧',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 2,
    },
    {
      id: '2',
      userId: 'user-2',
      username: '跑步爱好者',
      avatar: '',
      lastMessage: '周末一起去爬山吗？我知道一条很不错的路线',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      unreadCount: 0,
    },
    {
      id: '3',
      userId: 'user-3',
      username: '瑜伽小姐姐',
      avatar: '',
      lastMessage: '谢谢你的建议！我按照你说的方法练习，效果很好',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
    },
  ];

  const [messages] = useState<Message[]>(mockMessages);

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}天前`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-sm z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <img src="/chevron-right.svg" alt={t('back')} className="w-5 h-5 rotate-180" />
            <span className="font-medium">{t('back')}</span>
          </button>
        </div>

        <div className="p-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <img src="/message-square.svg" alt="消息" className="w-6 h-6" />
                私信
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {messages.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => onChatSelect(message.userId)}
                      className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors duration-200 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {message.username.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900">{message.username}</span>
                          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate flex-1">
                            {message.lastMessage}
                          </p>
                          {message.unreadCount > 0 && (
                            <Badge className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5">
                              {message.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <img src="/message-square.svg" alt="暂无消息" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>暂无私信消息</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
