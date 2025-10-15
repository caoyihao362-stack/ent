import {
  ActivityIcon,
  BellIcon,
  HomeIcon,
  InfoIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

const timeRangeOptions = [
  { value: "day", label: "日" },
  { value: "week", label: "周" },
  { value: "month", label: "月" },
];

const chartImages = [
  {
    src: "/group-13.png",
    className: "absolute w-[73.46%] h-0 top-[64.00%] left-[4.48%] object-cover",
  },
  {
    src: "/group-14.png",
    className: "absolute w-[73.46%] h-0 top-[49.40%] left-[4.48%] object-cover",
  },
  {
    src: "/group-15.png",
    className: "absolute w-[73.46%] h-0 top-[34.80%] left-[4.48%] object-cover",
  },
  {
    src: "/group-16.png",
    className: "absolute w-[73.46%] h-0 top-[20.20%] left-[4.48%] object-cover",
  },
  {
    src: "/group-17.png",
    className: "absolute w-[73.46%] h-0 top-[5.61%] left-[4.48%] object-cover",
  },
];

const barImages = [
  {
    src: "/group-18.png",
    className: "absolute w-[7.47%] h-[30.03%] top-[34.15%] left-[8.43%]",
  },
  {
    src: "/group-19.png",
    className: "absolute w-[7.47%] h-[35.45%] top-[28.73%] left-[18.07%]",
  },
  {
    src: "/group-20.png",
    className: "absolute w-[7.47%] h-[37.96%] top-[26.23%] left-[27.71%]",
  },
  {
    src: "/group-21.png",
    className: "absolute w-[7.47%] h-[32.53%] top-[31.65%] left-[37.35%]",
  },
  {
    src: "/group-22.png",
    className: "absolute w-[7.47%] h-[42.96%] top-[21.22%] left-[47.00%]",
  },
  {
    src: "/group-23.png",
    className: "absolute w-[7.47%] h-[52.14%] top-[12.04%] left-[56.64%]",
  },
  {
    src: "/group-24.png",
    className: "absolute w-[7.47%] h-[45.88%] top-[18.30%] left-[66.28%]",
  },
];

const xAxisLabels = [
  { left: "left-[92px]", text: "周" },
  { left: "left-[124px]", text: "周" },
  { left: "left-[157px]", text: "周" },
  { left: "left-[189px]", text: "周" },
  { left: "left-[221px]", text: "周" },
  { left: "left-[253px]", text: "周" },
  { left: "left-[286px]", text: "周" },
];

const yAxisLabels = [
  { top: "top-[162px]", left: "left-12", text: "0" },
  { top: "top-[122px]", left: "left-[41px]", text: "4k" },
  { top: "top-[82px]", left: "left-[42px]", text: "7k" },
  { top: "top-[42px]", left: "left-[39px]", text: "11k" },
  { top: "top-0.5", left: "left-9", text: "14k" },
];

const leaderboardData = [
  {
    rank: 1,
    name: "李明",
    steps: "15234 步",
    avatar: "/rectangle-8.png",
    bgColor: "bg-[#e2faea]",
    rankColor: "text-[#636ae8]",
    showTrophy: true,
  },
  {
    rank: 2,
    name: "张华",
    steps: "14876 步",
    avatar: "/rectangle-9.png",
    bgColor: "bg-[#f7f2e6]",
    rankColor: "text-[#636ae8]",
    showTrophy: true,
  },
  {
    rank: 3,
    name: "王丽",
    steps: "13987 步",
    avatar: "/rectangle-10.png",
    bgColor: "bg-[#eefbd7]",
    rankColor: "text-[#636ae8]",
    showTrophy: true,
  },
  {
    rank: 4,
    name: "赵强",
    steps: "12567 步",
    avatar: "/rectangle-11.png",
    bgColor: "bg-[#f0e6f9]",
    rankColor: "text-[#565d6d]",
    showTrophy: false,
  },
  {
    rank: 5,
    name: "刘芳",
    steps: "11345 步",
    avatar: "/rectangle-12.png",
    bgColor: "bg-[#f1fecb]",
    rankColor: "text-[#565d6d]",
    showTrophy: false,
  },
  {
    rank: 6,
    name: "孙斌",
    steps: "10987 步",
    avatar: null,
    bgColor: "bg-[#dffedd]",
    rankColor: "text-[#565d6d]",
    showTrophy: false,
  },
];

const navigationItems = [
  { icon: ActivityIcon, label: "体育", active: true },
  { icon: HomeIcon, label: "AI", active: false },
  { icon: UsersIcon, label: "社区", active: false },
  { icon: InfoIcon, label: "信息", active: false },
];

export const FittrackSportsSubsection = (): JSX.Element => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState("day");
  const [activeNav, setActiveNav] = React.useState("体育");

  const handleNotificationClick = () => {
    alert("通知功能");
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };

  return (
    <div className="w-full max-w-[390px] flex flex-col bg-white shadow-[0px_3px_6px_#120f281f]">
      <header className="h-[99px] relative bg-white">
        <Separator className="absolute top-[98px] left-0 w-full" />

        <h1 className="absolute top-[61px] left-[171px] [font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
          体育
        </h1>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNotificationClick}
          className="absolute top-[60px] left-[343px] w-[22px] h-[22px] p-0 h-auto"
        >
          <BellIcon className="w-[22px] h-[22px]" />
        </Button>

        <img
          className="absolute top-0 left-0 w-full h-10"
          alt="Container"
          src="/container.svg"
        />
      </header>

      <main className="flex-1 flex flex-col gap-4 px-4 py-4">
        <Card className="w-full rounded-[10px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-xl tracking-[0] leading-7">
                步数统计
              </h2>

              <ToggleGroup
                type="single"
                value={selectedTimeRange}
                onValueChange={(value) => value && setSelectedTimeRange(value)}
                className="bg-gray-100 rounded-[10px] p-1"
              >
                {timeRangeOptions.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className="w-8 h-9 data-[state=on]:bg-[#636ae8] data-[state=on]:text-white data-[state=on]:shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] rounded-md [font-family:'Inter',Helvetica] font-medium text-sm"
                  >
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="w-full h-[200px] relative mb-4">
              <div className="absolute top-0 left-0 w-[326px] h-[200px] overflow-hidden">
                <div className="relative w-[102.72%] h-[137.00%] top-[-2.93%] left-[16.87%]">
                  <div className="w-[334.86px] relative">
                    {chartImages.map((img, index) => (
                      <img
                        key={`chart-${index}`}
                        className={img.className}
                        alt="Group"
                        src={img.src}
                      />
                    ))}

                    {barImages.map((img, index) => (
                      <img
                        key={`bar-${index}`}
                        className={img.className}
                        alt="Group"
                        src={img.src}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {xAxisLabels.map((label, index) => (
                <div
                  key={`x-${index}`}
                  className={`absolute top-[180px] ${label.left} [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-4 whitespace-nowrap`}
                >
                  {label.text}
                </div>
              ))}

              {yAxisLabels.map((label, index) => (
                <div
                  key={`y-${index}`}
                  className={`absolute ${label.top} ${label.left} [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-4 whitespace-nowrap`}
                >
                  {label.text}
                </div>
              ))}
            </div>

            <p className="text-center [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm tracking-[0] leading-5">
              您在过去 7 天内表现出色，继续保持！
            </p>
          </CardContent>
        </Card>

        <Card className="w-full rounded-[10px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f]">
          <CardContent className="p-4">
            <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-xl tracking-[0] leading-7 mb-5">
              排行榜
            </h2>

            <div className="flex flex-col">
              {leaderboardData.map((user, index) => (
                <div key={user.rank}>
                  <div className="flex items-center py-3 gap-3">
                    <div
                      className={`w-6 font-bold ${user.rankColor} text-lg text-center leading-7 [font-family:'Inter',Helvetica] tracking-[0]`}
                    >
                      {user.rank}
                    </div>

                    <Avatar
                      className={`w-10 h-10 ${user.bgColor} rounded-[20px]`}
                    >
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-[#d9d9d9]" />
                      )}
                    </Avatar>

                    <div className="flex-1">
                      <div className="[font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-base tracking-[0] leading-6">
                        {user.name}
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm tracking-[0] leading-5">
                        {user.steps}
                      </div>
                    </div>

                    {user.showTrophy && <TrophyIcon className="w-5 h-5" />}
                  </div>
                  {index < leaderboardData.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <nav className="h-[65px] flex flex-col shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <Separator />

        <div className="flex-1 bg-white flex">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleNavClick(item.label)}
              className="flex-1 h-16 flex flex-col items-center justify-center gap-1 rounded-none p-0 h-auto"
            >
              <item.icon className="w-6 h-6" />
              <span
                className={`[font-family:'Inter',Helvetica] text-[10px] tracking-[0] leading-4 ${
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
      </nav>
    </div>
  );
};
