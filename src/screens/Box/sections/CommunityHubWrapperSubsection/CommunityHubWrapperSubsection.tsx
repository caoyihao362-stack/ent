import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const communityGroups = [
  {
    icon: "/mountain.svg",
    label: "城市跑团",
  },
  {
    icon: "/square-check-big.svg",
    label: "健身打卡",
  },
  {
    icon: "/leaf.svg",
    label: "冥想",
  },
  {
    icon: "/mountain.svg",
    label: "户外徒步",
  },
];

const skillExchangeUsers = [
  {
    name: "艾丽斯",
    avatar: "/rectangle-3.png",
    bgColor: "bg-[#e2fce8]",
    goodAt: ["瑜伽", "冥想"],
    wantToLearn: ["举重"],
  },
  {
    name: "鲍勃",
    avatar: "/rectangle-4.png",
    bgColor: "bg-[#faf6e1]",
    goodAt: ["跑步技巧"],
    wantToLearn: ["瑜伽"],
  },
  {
    name: "查理",
    avatar: "/rectangle-5.png",
    bgColor: "bg-[#e7e2fe]",
    goodAt: ["营养学"],
    wantToLearn: ["徒步"],
  },
  {
    name: "戴安娜",
    avatar: "/rectangle-6.png",
    bgColor: "bg-[#e2fbf0]",
    goodAt: ["举重", "高强度间歇训练"],
    wantToLearn: ["武术"],
  },
  {
    name: "伊芙",
    avatar: "/rectangle-7.png",
    bgColor: "bg-[#ebf8e8]",
    goodAt: ["普拉提"],
    wantToLearn: ["游泳"],
  },
];

const navigationItems = [
  {
    icon: "/house.svg",
    label: "社区",
    active: true,
  },
  {
    icon: "/chart-no-axes-column.svg",
    label: "运动",
    active: false,
  },
  {
    icon: "/user-1.svg",
    label: "我的",
    active: false,
  },
  {
    icon: "/settings.svg",
    label: "设置",
    active: false,
  },
];

export const CommunityHubWrapperSubsection = (): JSX.Element => {
  return (
    <div className="flex flex-col bg-white shadow-[0px_3px_6px_#120f281f]">
      <header className="flex flex-col bg-white">
        <img className="w-full h-10" alt="Container" src="/container.svg" />

        <h1 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg text-center tracking-[0] leading-7 whitespace-nowrap mt-5 mb-[8.5px]">
          社区中心
        </h1>

        <Separator className="w-full" />
      </header>

      <main className="flex flex-col gap-6 px-6 py-6">
        <section>
          <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-xl tracking-[0] leading-7 whitespace-nowrap mb-3">
            社区群组
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {communityGroups.map((group, index) => (
              <Card
                key={index}
                className="bg-white rounded-[10px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="flex flex-col items-center gap-[19px] p-4">
                  <img className="w-8 h-8" alt={group.label} src={group.icon} />
                  <p className="[font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
                    {group.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="bg-[#fafafb] rounded-[10px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f]">
            <CardContent className="p-4">
              <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-xl tracking-[0] leading-7 whitespace-nowrap mb-[13px]">
                技能交换区
              </h2>

              <div className="flex flex-col gap-4">
                {skillExchangeUsers.map((user, index) => (
                  <Card
                    key={index}
                    className="bg-white rounded-[10px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4 mb-5">
                        <Avatar
                          className={`w-12 h-12 ${user.bgColor} rounded-3xl`}
                        >
                          <AvatarImage src={user.avatar} alt={user.name} />
                        </Avatar>
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-lg tracking-[0] leading-7 whitespace-nowrap">
                          {user.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-[13px]">
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[#565d6d] text-base tracking-[0] leading-6 whitespace-nowrap">
                          擅长:
                        </span>
                        <div className="flex gap-2">
                          {user.goodAt.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              className="bg-[#e8618c] hover:bg-[#e8618c] text-white rounded-[15px] h-[30px] px-2 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-[22px]"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="[font-family:'Inter',Helvetica] font-medium text-[#565d6d] text-base tracking-[0] leading-6 whitespace-nowrap">
                          想学:
                        </span>
                        <div className="flex gap-2">
                          {user.wantToLearn.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="bg-[#fafafb] hover:bg-[#fafafb] text-[#171a1f] rounded-[15px] h-[30px] px-2 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-[22px]"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <nav className="flex flex-col gap-[0.5px] shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <Separator className="w-full" />

        <div className="flex bg-white shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className="flex-1 h-16 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <img className="w-6 h-6" alt={item.label} src={item.icon} />
              <span
                className={`[font-family:'Inter',Helvetica] ${
                  item.active
                    ? "font-bold text-[#636ae8]"
                    : "font-normal text-[#565d6d]"
                } text-[10px] tracking-[0] leading-4 whitespace-nowrap`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
