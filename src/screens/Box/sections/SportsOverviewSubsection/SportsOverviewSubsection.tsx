import { BarChart3Icon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const weekDays = [
  { label: "Mon", left: "left-[67px]" },
  { label: "Tue", left: "left-[102px]" },
  { label: "Wed", left: "left-[133px]" },
  { label: "Thu", left: "left-[169px]" },
  { label: "Fri", left: "left-[206px]" },
  { label: "Sat", left: "left-[237px]" },
  { label: "Sun", left: "left-[269px]" },
];

const yAxisLabels = [
  { label: "0k", top: "top-[159px]", left: "left-[57px]" },
  { label: "0.25k", top: "top-[118px]", left: "left-10" },
  { label: "0.5k", top: "top-[78px]", left: "left-[47px]" },
  { label: "0.75k", top: "top-[37px]", left: "left-[41px]" },
  { label: "1k", top: "top-px", left: "left-[60px]" },
];

const leaderboardData = [
  {
    rank: 1,
    name: "Michael Johnson",
    avatar: "/rectangle.png",
    avgDistance: "1500m Daily Avg",
    bgColor: "bg-[#fafafb]",
    avatarBg: "bg-[#ffeee1]",
  },
  {
    rank: 2,
    name: "Sarah Chen",
    avatar: "/rectangle-1.png",
    avgDistance: "1350m Daily Avg",
    bgColor: "bg-white",
    avatarBg: "bg-[#f9f3e4]",
  },
  {
    rank: 3,
    name: "David Rodriguez",
    avatar: "/rectangle-2.png",
    avgDistance: "1200m Daily Avg",
    bgColor: "bg-[#fafafb]",
    avatarBg: "bg-[#e9f8e5]",
  },
];

const navigationItems = [
  { icon: HomeIcon, label: "Community", active: false },
  { icon: BarChart3Icon, label: "Sports", active: true },
  { icon: UserIcon, label: "Profile", active: false },
  { icon: SettingsIcon, label: "Settings", active: false },
];

export const SportsOverviewSubsection = (): JSX.Element => {
  const [activeNav, setActiveNav] = React.useState("Sports");

  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };

  return (
    <div className="w-full flex flex-col bg-white shadow-[0px_3px_6px_#120f281f]">
      <header className="flex flex-col bg-white">
        <img className="w-full h-10" alt="Container" src="/container.svg" />

        <h1 className="text-center mt-5 [font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg tracking-[0] leading-7 whitespace-nowrap">
          Sports
        </h1>

        <img
          className="w-full mt-[8.5px] h-px object-cover"
          alt="Line"
          src="/line.svg"
        />
      </header>

      <main className="flex flex-col px-6 pb-6">
        <Card className="mt-6 bg-white rounded-2xl shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f]">
          <CardContent className="p-0">
            <div className="pt-[19px] px-4 pb-[19px]">
              <h2 className="[font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-xl tracking-[-0.50px] leading-7 whitespace-nowrap">
                Daily Progress
              </h2>

              <div className="relative w-full h-[250px] mt-[13px]">
                <div className="absolute top-0 left-0 w-[310px] h-[250px] overflow-hidden">
                  <div className="relative w-[99.68%] h-[108.80%] top-[-2.74%] left-[22.90%] flex">
                    <div className="flex-1 w-[309px] flex">
                      <div className="flex-1 w-[309px] flex">
                        <div className="flex-1 w-[309px] relative">
                          <img
                            className="absolute w-[64.72%] h-0 top-[63.74%] left-[2.91%] object-cover"
                            alt="Group"
                            src="/group.png"
                          />

                          <img
                            className="absolute w-[64.72%] h-0 top-[48.85%] left-[2.91%] object-cover"
                            alt="Group"
                            src="/group-1.png"
                          />

                          <img
                            className="absolute w-[64.72%] h-0 top-[33.96%] left-[2.91%] object-cover"
                            alt="Group"
                            src="/group-2.png"
                          />

                          <img
                            className="absolute w-[64.72%] h-0 top-[19.07%] left-[2.91%] object-cover"
                            alt="Group"
                            src="/group-3.png"
                          />

                          <img
                            className="absolute w-[64.72%] h-0 top-[4.18%] left-[2.91%] object-cover"
                            alt="Group"
                            src="/group-4.png"
                          />

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[2.91%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[13.70%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[24.49%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[35.28%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[46.06%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[56.85%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[63.24%] left-[67.64%] flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[58.09%] left-0 flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[43.20%] left-0 flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[28.31%] left-0 flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-[13.42%] left-0 flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <div className="absolute w-[33.01%] h-[36.76%] top-0 left-0 flex">
                            <div className="flex-1 w-[100px] [font-family:'Manrope',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-[normal]">
                              {""}
                            </div>
                          </div>

                          <img
                            className="absolute w-[64.72%] h-[26.80%] top-[6.97%] left-[2.59%]"
                            alt="Group"
                            src="/group-5.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[32.30%] left-0"
                            alt="Group"
                            src="/group-6.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[23.37%] left-[12.08%]"
                            alt="Group"
                            src="/group-7.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[20.39%] left-[22.87%]"
                            alt="Group"
                            src="/group-8.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[26.35%] left-[33.66%]"
                            alt="Group"
                            src="/group-9.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[14.43%] left-[44.44%]"
                            alt="Group"
                            src="/group-10.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[5.50%] left-[55.23%]"
                            alt="Group"
                            src="/group-11.png"
                          />

                          <img
                            className="absolute w-[2.59%] h-[2.94%] top-[11.46%] left-[66.02%]"
                            alt="Group"
                            src="/group-12.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {weekDays.map((day, index) => (
                  <div
                    key={`day-${index}`}
                    className={`absolute top-[177px] ${day.left} [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-4 whitespace-nowrap`}
                  >
                    {day.label}
                  </div>
                ))}

                {yAxisLabels.map((label, index) => (
                  <div
                    key={`y-axis-${index}`}
                    className={`absolute ${label.top} ${label.left} [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-xs tracking-[0] leading-4 whitespace-nowrap`}
                  >
                    {label.label}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1 mt-[26px]">
                <div className="w-2 h-2 bg-[#636ae8] rounded-sm" />
                <span className="[font-family:'Inter',Helvetica] font-normal text-[#171a1f] text-xs tracking-[0] leading-4 whitespace-nowrap">
                  Swimming Distance
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-[27px] [font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-xl tracking-[0] leading-7 whitespace-nowrap">
          Leaderboard
        </h2>

        <div className="flex flex-col gap-2 mt-[13px]">
          {leaderboardData.map((entry, index) => (
            <Card
              key={`leaderboard-${index}`}
              className={`${entry.bgColor} rounded-2xl shadow-none border-0`}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <span className="[font-family:'Inter',Helvetica] font-bold text-[#636ae8] text-lg tracking-[0] leading-7 whitespace-nowrap">
                  {entry.rank}.
                </span>

                <div
                  className={`w-10 h-10 ${entry.avatarBg} rounded-[20px] flex overflow-hidden shrink-0`}
                >
                  <img
                    className="w-full h-full object-cover"
                    alt={entry.name}
                    src={entry.avatar}
                  />
                </div>

                <span className="[font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-base tracking-[0] leading-6 flex-1">
                  {entry.name}
                </span>

                <span className="[font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm tracking-[0] leading-5 whitespace-nowrap">
                  {entry.avgDistance}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <nav className="flex flex-col gap-[0.5px] shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <img
          className="w-full mt-[-0.5px] h-px object-cover"
          alt="Line"
          src="/line.svg"
        />

        <div className="w-full flex bg-white shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
          {navigationItems.map((item, index) => (
            <button
              key={`nav-${index}`}
              onClick={() => handleNavClick(item.label)}
              className="flex-1 h-16 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <item.icon
                className={`w-6 h-6 ${
                  activeNav === item.label ? "text-[#636ae8]" : "text-[#565d6d]"
                }`}
              />
              <span
                className={`[font-family:'Inter',Helvetica] ${
                  activeNav === item.label
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
