import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface HelpSupportPageProps {
  onBack: () => void;
}

export const HelpSupportPage = ({ onBack }: HelpSupportPageProps) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '如何记录运动数据？',
      answer: '您可以在首页点击添加按钮，手动输入运动数据，包括步数、距离、时长等信息。也可以绑定运动设备自动同步数据。',
    },
    {
      question: '如何加入社群？',
      answer: '进入社区页面，浏览推荐的社群列表，点击感兴趣的社群查看详情，然后点击"加入社群"按钮即可成为成员。',
    },
    {
      question: 'AI教练如何使用？',
      answer: 'AI教练可以根据您的运动偏好和目标提供个性化建议。在AI教练页面直接输入您的问题，AI会给出针对性的训练和饮食建议。',
    },
    {
      question: '如何获得徽章？',
      answer: '完成特定的运动成就后会自动获得徽章。例如：连续运动7天、累计步数达到100000步等。您可以在"我的徽章"页面查看所有已获得的徽章。',
    },
    {
      question: '如何修改个人信息？',
      answer: '进入"我的"页面，点击"个人资料"，然后点击"编辑"按钮即可修改个人信息，包括用户名、身高、体重、运动偏好等。',
    },
  ];

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setFeedback('');
      setSubmitted(false);
    }, 3000);
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

        <div className="p-4 space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <img src="/circle-help.svg" alt="常见问题" className="w-6 h-6" />
                常见问题
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <img
                      src="/chevron-right.svg"
                      alt=""
                      className={`w-5 h-5 transition-transform ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">在线客服</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <img src="/message-square.svg" alt="客服" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 mb-4">需要人工帮助？</p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  disabled
                >
                  联系客服 (即将开放)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">用户反馈</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                您的意见对我们很重要，请告诉我们您的想法
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">反馈内容</Label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="请描述您遇到的问题或建议..."
                  className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                />
              </div>

              {submitted && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  反馈已提交，我们将尽快处理。感谢您的支持！
                </div>
              )}

              <Button
                onClick={handleSubmitFeedback}
                disabled={!feedback.trim() || submitted}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                提交反馈
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
