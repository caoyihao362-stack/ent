import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

const chatMessages = [
  {
    type: "user",
    sender: "我",
    content: "如何安排我每天的锻炼？",
    avatar: "/rectangle-14.png",
    bgColor: "bg-[#636ae8]",
    textColor: "text-white",
    rounded: "rounded-[16px_16px_0px_16px]",
    avatarBg: "bg-[#e0f9f9]",
  },
  {
    type: "ai",
    sender: "AI教练",
    content:
      "你好！很高兴为你规划。首先，我们需要了解你的健身目标、当前的健康状况以及每天可用于锻炼的时间。例如，你是想增肌、减脂还是提高耐力？每天大约有多少时间可以用来运动呢？",
    avatar: "/rectangle-15.png",
    bgColor: "bg-gray-100",
    textColor: "text-[#565d6d]",
    rounded: "rounded-[16px_16px_16px_0px]",
    avatarBg: "bg-[#ede6fc]",
  },
  {
    type: "user",
    sender: "我",
    content: "我想增肌，每周有4天可以去健身房，每次大概1.5小时。",
    avatar: "/rectangle-16.png",
    bgColor: "bg-[#636ae8]",
    textColor: "text-white",
    rounded: "rounded-[16px_16px_0px_16px]",
    avatarBg: "bg-[#e0f9f9]",
  },
  {
    type: "ai",
    sender: "AI教练",
    content:
      "好的，为了增肌，建议你进行力量训练。这里是一个初步的四周计划：\n**第一周：全身适应性训练** * **周一 (胸/三头肌):** 卧推、哑铃飞鸟、三头肌下压 * **周二 (背/二头肌):** 引体向上、划船、二头肌弯举 * **周四 (腿/肩):** 深蹲、硬拉、肩部推举、侧平举 * **周五 (全身):** 复合动作如波比跳、壶铃摇摆 **饮食建议:** * 高蛋白摄入：多吃鸡胸肉、鱼、鸡蛋、豆类。 * 碳水化合物：适量米饭、全麦面包、燕麦。 * 健康脂肪：坚果、牛油果、橄榄油。\n请记住，循序渐进非常重要。如果你在锻炼过程中感到不适，请立即停止。",
    avatar: "/rectangle-17.png",
    bgColor: "bg-gray-100",
    textColor: "text-[#565d6d]",
    rounded: "rounded-[16px_16px_16px_0px]",
    avatarBg: "bg-[#ede6fc]",
  },
];

const navigationItems = [
  {
    icon: "/dumbbell-2.svg",
    label: "运动",
    active: false,
    textColor: "text-[#565d6d]",
    fontWeight: "font-normal",
  },
  {
    icon: "/brain-cog.svg",
    label: "AI",
    active: true,
    textColor: "text-[#636ae8]",
    fontWeight: "font-bold",
  },
  {
    icon: "/users.svg",
    label: "社区",
    active: false,
    textColor: "text-[#565d6d]",
    fontWeight: "font-normal",
  },
  {
    icon: "/user-1.svg",
    label: "我",
    active: false,
    textColor: "text-[#565d6d]",
    fontWeight: "font-normal",
  },
];

export const AiCoachSubsection = (): JSX.Element => {
  const [inputMessage, setInputMessage] = React.useState("");
  const [messages, setMessages] = React.useState(chatMessages);
  const [activeNav, setActiveNav] = React.useState("AI");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        type: "user" as const,
        sender: "我",
        content: inputMessage,
        avatar: "/rectangle-14.png",
        bgColor: "bg-[#636ae8]",
        textColor: "text-white",
        rounded: "rounded-[16px_16px_0px_16px]",
        avatarBg: "bg-[#e0f9f9]",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };

  return (
    <div className="w-full flex flex-col bg-white shadow-[0px_3px_6px_#120f281f]">
      <header className="flex flex-col bg-white">
        <img className="w-full h-10" alt="Container" src="/container.svg" />

        <h1 className="mx-auto w-[54px] h-7 mt-5 [font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
          AI教练
        </h1>

        <img
          className="w-full mt-[8.5px] h-px object-cover"
          alt="Line"
          src="/line.svg"
        />
      </header>

      <main className="flex-1 relative">
        <Card className="mt-6 mx-0 bg-[#f2f2fd] rounded-[0px_0px_16px_16px] border-0 shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f]">
          <CardContent className="flex flex-col gap-[7px] pt-[27px] pb-[27px] px-6">
            <h2 className="w-[264px] h-8 [font-family:'Archivo',Helvetica] font-semibold text-[#19191f] text-2xl tracking-[0] leading-8 whitespace-nowrap">
              如何安排我每天的锻炼？
            </h2>

            <p className="w-[496px] h-6 [font-family:'Inter',Helvetica] font-normal text-[#19191fcc] text-base tracking-[0] leading-6 whitespace-nowrap">
              您的专属AI教练将根据您的目标和时间，为您量身定制每日运动计划。
            </p>
          </CardContent>
        </Card>

        <div className="mt-[52px] px-6 flex flex-col gap-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar
                className={`w-8 h-8 ${message.avatarBg} rounded-2xl flex-shrink-0`}
              >
                <AvatarImage
                  src={message.avatar}
                  alt={message.sender}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>

              <div
                className={`flex flex-col gap-[5px] ${message.bgColor} ${message.rounded} px-3 py-[13px] max-w-[257px]`}
              >
                <div
                  className={`[font-family:'Inter',Helvetica] font-medium ${message.textColor} text-sm tracking-[0] leading-5 whitespace-nowrap`}
                >
                  {message.sender}
                </div>

                <div
                  className={`[font-family:'Inter',Helvetica] font-normal ${message.textColor} text-base tracking-[0] leading-6`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-auto bg-[#fafafb]">
        <img className="w-full h-px object-cover" alt="Line" src="/line.svg" />

        <div className="flex items-center gap-3 px-[23px] py-4">
          <Input
            placeholder="输入您的问题..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 h-[51px] bg-white rounded-[10px] border border-solid border-[#dee1e6] [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm tracking-[0] leading-[22px]"
          />

          <Button
            onClick={handleSendMessage}
            className="w-12 h-12 bg-[#636ae8] rounded-3xl p-0 hover:bg-[#5159d1]"
          >
            <img
              className="w-6 h-6"
              alt="Send horizontal"
              src="/send-horizontal.svg"
            />
          </Button>
        </div>
      </footer>

      <nav className="flex flex-col gap-[0.5px] shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <img className="w-full h-px object-cover" alt="Line" src="/line.svg" />

        <div className="flex bg-white shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleNavClick(item.label)}
              className="flex-1 h-16 flex flex-col items-center justify-center gap-1 hover:bg-transparent"
            >
              <img className="w-6 h-6" alt={item.label} src={item.icon} />
              <span
                className={`[font-family:'Inter',Helvetica] ${activeNav === item.label ? "font-bold text-[#636ae8]" : "font-normal text-[#565d6d]"} text-[10px] tracking-[0] leading-4 whitespace-nowrap`}
              >
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};
