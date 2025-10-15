import {
  AwardIcon,
  BrainCogIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  DumbbellIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const menuItems = [
  {
    icon: UserIcon,
    label: "Personal Data",
  },
  {
    icon: AwardIcon,
    label: "Badges",
  },
  {
    icon: SettingsIcon,
    label: "Settings",
  },
  {
    icon: CircleHelpIcon,
    label: "Help & Support",
  },
  {
    icon: ShieldIcon,
    label: "Privacy Policy",
  },
];

const navigationItems = [
  {
    icon: DumbbellIcon,
    label: "Sports",
    active: false,
  },
  {
    icon: BrainCogIcon,
    label: "AI",
    active: false,
  },
  {
    icon: UsersIcon,
    label: "Community",
    active: false,
  },
  {
    icon: UserIcon,
    label: "Me",
    active: true,
  },
];

export const MyProfileSubsection = (): JSX.Element => {
  const [activeNav, setActiveNav] = React.useState("Me");

  const handleEditProfile = () => {
    alert("编辑个人资料");
  };

  const handleMenuItemClick = (label: string) => {
    alert(`点击: ${label}`);
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };

  return (
    <div className="w-full flex flex-col bg-white shadow-[0px_3px_6px_#120f281f]">
      <header className="flex flex-col bg-white border-0 border-none">
        <img className="w-full h-10" alt="Container" src="/container.svg" />

        <h1 className="text-center mt-5 [font-family:'Archivo',Helvetica] font-semibold text-[#171a1f] text-lg leading-7 tracking-[0] whitespace-nowrap">
          Me
        </h1>

        <img
          className="w-full mt-[8.5px] h-px object-cover"
          alt="Line"
          src="/line.svg"
        />
      </header>

      <main className="flex flex-col bg-white border-0 border-none">
        <section className="w-full flex flex-col items-center bg-[#f2f2fd] border-0 border-none py-8">
          <div className="w-24 h-24 bg-[#f4fad6] rounded-[48px] flex overflow-hidden border-0 border-none">
            <img
              className="flex-1 w-24"
              alt="Rectangle"
              src="/rectangle-13.png"
            />
          </div>

          <h2 className="mt-[19px] [font-family:'Archivo',Helvetica] font-semibold text-[#19191f] text-2xl tracking-[0] leading-8 whitespace-nowrap">
            John Doe
          </h2>

          <Button
            variant="outline"
            onClick={handleEditProfile}
            className="mt-[13px] h-9 px-3 bg-[#f2f2fd] rounded-md border border-solid border-[#19191f] [font-family:'Inter',Helvetica] font-medium text-[#19191f] text-sm text-center tracking-[0] leading-[22px] whitespace-nowrap"
          >
            Edit Profile
          </Button>
        </section>

        <nav className="px-6 py-6 flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => handleMenuItemClick(item.label)}
              className="bg-white rounded-[10px] border-0 border-none shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f] cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-center p-4 h-[60px]">
                <item.icon className="w-6 h-6 text-[#171a1f]" />
                <span className="ml-4 flex-1 [font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-lg tracking-[0] leading-7 whitespace-nowrap">
                  {item.label}
                </span>
                <ChevronRightIcon className="w-5 h-5 text-[#171a1f]" />
              </CardContent>
            </Card>
          ))}
        </nav>
      </main>

      <footer className="flex flex-col gap-[0.5px] border-0 border-none shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <img
          className="w-full mt-[-0.5px] h-px object-cover"
          alt="Line"
          src="/line.svg"
        />

        <nav className="w-full flex bg-white border-0 border-none shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
          <div className="w-full flex">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.label)}
                className="flex-1 h-16 relative cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <item.icon
                  className={`absolute top-[calc(50.00%_-_20px)] left-[calc(50.00%_-_12px)] w-6 h-6 ${
                    activeNav === item.label ? "text-[#636ae8]" : "text-[#565d6d]"
                  }`}
                />
                <span
                  className={`absolute top-[calc(50.00%_+_4px)] left-1/2 -translate-x-1/2 [font-family:'Inter',Helvetica] text-[10px] tracking-[0] leading-4 whitespace-nowrap ${
                    activeNav === item.label
                      ? "font-bold text-[#636ae8]"
                      : "font-normal text-[#565d6d]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </footer>
    </div>
  );
};
