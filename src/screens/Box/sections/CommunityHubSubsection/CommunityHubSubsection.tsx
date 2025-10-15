import {
  BrainCircuitIcon,
  DumbbellIcon,
  PlusIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const communityCards = [
  {
    image: "/image.png",
    title: "城市跑团",
    badge: "热门",
    members: "235 成员",
  },
  {
    image: "/image-1.png",
    title: "健身打卡组",
    badge: "活跃",
    members: "189 成员",
  },
  {
    image: "/image-2.png",
    title: "瑜伽冥想",
    badge: null,
    members: "92 成员",
  },
  {
    image: "/image-3.png",
    title: "户外徒步",
    badge: null,
    members: "150 成员",
  },
];

const navigationItems = [
  {
    icon: DumbbellIcon,
    label: "运动",
    active: false,
  },
  {
    icon: BrainCircuitIcon,
    label: "AI教练",
    active: false,
  },
  {
    icon: UsersIcon,
    label: "社区",
    active: true,
  },
  {
    icon: UserIcon,
    label: "我的",
    active: false,
  },
];

export const CommunityHubSubsection = (): JSX.Element => {
  const [activeTab, setActiveTab] = React.useState("社群");
  const [activeNav, setActiveNav] = React.useState("社区");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddCommunity = () => {
    alert("创建新社群");
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };

  return (
    <div className="w-full max-w-[390px] mx-auto relative bg-white shadow-[0px_3px_6px_#120f281f] flex flex-col h-[844px]">
      <header className="flex flex-col bg-white border-0 border-none">
        <img className="w-full h-10" alt="Container" src="/container.svg" />

        <h1 className="text-center w-full py-[19px] [font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg tracking-[0] leading-7">
          社区
        </h1>

        <img className="w-full h-px object-cover" alt="Line" src="/line.svg" />
      </header>

      <main className="flex-1 relative overflow-hidden">
        <div className="px-6 pt-4 pb-6">
          <div className="flex bg-[#fafafb] rounded-[22px] border-0 border-none shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] p-1 h-11">
            <Button
              onClick={() => handleTabClick("社群")}
              className={`flex-1 h-9 rounded-md shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] [font-family:'Inter',Helvetica] font-medium text-base ${
                activeTab === "社群"
                  ? "bg-[#636ae8] hover:bg-[#636ae8]/90 text-white"
                  : "bg-transparent hover:bg-transparent text-[#565d6d]"
              }`}
            >
              社群
            </Button>

            <Button
              onClick={() => handleTabClick("私信")}
              variant="ghost"
              className={`flex-1 h-9 rounded-md [font-family:'Inter',Helvetica] font-medium text-base ${
                activeTab === "私信"
                  ? "bg-[#636ae8] hover:bg-[#636ae8]/90 text-white"
                  : "hover:bg-transparent text-[#565d6d]"
              }`}
            >
              私信
            </Button>
          </div>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4">
          {communityCards.map((card, index) => (
            <Card
              key={index}
              className="bg-white rounded-[10px] border-0 border-none shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] overflow-hidden"
            >
              <CardContent className="p-4 flex flex-col gap-[15px]">
                <img
                  className="w-full h-28 object-cover rounded"
                  alt={card.title}
                  src={card.image}
                />

                <div className="flex items-start justify-between gap-2">
                  <h3 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg tracking-[0] leading-7 whitespace-nowrap">
                    {card.title}
                  </h3>

                  {card.badge && (
                    <Badge className="h-auto bg-[#e8618c] hover:bg-[#e8618c] rounded-[13px] px-2 py-1 [font-family:'Inter',Helvetica] font-medium text-white text-xs tracking-[0] leading-5">
                      {card.badge}
                    </Badge>
                  )}
                </div>

                <p className="[font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm tracking-[0] leading-5 whitespace-nowrap">
                  {card.members}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleAddCommunity}
          className="absolute bottom-[71px] right-6 w-14 h-14 bg-[#636ae8] hover:bg-[#636ae8]/90 rounded-[28px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] p-0"
        >
          <PlusIcon className="w-6 h-6 text-white" />
        </Button>
      </main>

      <nav className="flex flex-col gap-[0.5px] border-0 border-none shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <img className="w-full h-px object-cover" alt="Line" src="/line.svg" />

        <div className="bg-white border-0 border-none shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
          <div className="flex w-full">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavClick(item.label)}
                className="flex-1 h-16 flex flex-col items-center justify-center gap-1 hover:bg-transparent p-0"
              >
                <item.icon
                  className={`w-6 h-6 ${
                    activeNav === item.label ? "text-[#636ae8]" : "text-[#565d6d]"
                  }`}
                />
                <span
                  className={`[font-family:'Inter',Helvetica] text-[10px] tracking-[0] leading-4 whitespace-nowrap ${
                    activeNav === item.label
                      ? "font-bold text-[#636ae8]"
                      : "font-normal text-[#565d6d]"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
