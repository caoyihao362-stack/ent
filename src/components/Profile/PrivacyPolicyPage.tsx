import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage = ({ onBack }: PrivacyPolicyPageProps) => {
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
              <CardTitle className="text-gray-900">隐私政策</CardTitle>
              <p className="text-sm text-gray-600 mt-2">最后更新：2024年1月</p>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. 信息收集</h3>
                <p className="mb-2">
                  MoveMate致力于保护您的个人隐私。我们收集以下类型的信息：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>账户信息：用户名、邮箱地址</li>
                  <li>个人资料：身高、体重、运动偏好等</li>
                  <li>运动数据：步数、距离、训练记录等</li>
                  <li>社交互动：社群活动、消息记录</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. 信息使用</h3>
                <p className="mb-2">
                  我们使用收集的信息用于：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>提供个性化的运动建议和训练计划</li>
                  <li>改善应用功能和用户体验</li>
                  <li>生成运动数据统计和排行榜</li>
                  <li>促进用户之间的社交互动</li>
                  <li>发送重要通知和更新</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. 信息共享</h3>
                <p className="mb-2">
                  我们不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>在社群中展示您的公开资料和运动数据</li>
                  <li>在排行榜中显示您的成绩（可在设置中关闭）</li>
                  <li>遵守法律法规要求</li>
                  <li>在您明确同意的情况下</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. 数据安全</h3>
                <p>
                  我们采用行业标准的安全措施保护您的数据，包括加密传输、安全存储和访问控制。
                  我们定期审查和更新安全措施，以确保您的信息安全。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. 您的权利</h3>
                <p className="mb-2">
                  您拥有以下权利：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>访问和查看您的个人信息</li>
                  <li>修改或更新您的个人资料</li>
                  <li>删除您的账户和相关数据</li>
                  <li>导出您的运动数据</li>
                  <li>控制信息共享范围</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Cookie 和追踪技术</h3>
                <p>
                  我们使用Cookie和类似技术来改善用户体验、分析应用使用情况。
                  您可以在设备设置中管理Cookie偏好。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">7. 儿童隐私</h3>
                <p>
                  MoveMate不针对13岁以下儿童。如果我们发现收集了儿童的信息，
                  我们会立即删除相关数据。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">8. 政策更新</h3>
                <p>
                  我们可能会不时更新本隐私政策。重要变更时，我们会通过应用内通知或邮件告知您。
                  继续使用应用即表示您接受更新后的政策。
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">9. 联系我们</h3>
                <p className="mb-2">
                  如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
                </p>
                <ul className="space-y-1 ml-4">
                  <li>邮箱：privacy@movemate.app</li>
                  <li>应用内反馈功能</li>
                </ul>
              </section>

              <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-900">
                  <strong>重要提示：</strong>
                  使用MoveMate即表示您已阅读、理解并同意本隐私政策的所有条款。
                  我们重视您的隐私，并致力于保护您的个人信息安全。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
