import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

const navigationItems = [
  {
    icon: "/house.svg",
    label: "主页",
    isActive: true,
  },
  {
    icon: "/compass.svg",
    label: "探索",
    isActive: false,
  },
  {
    icon: "/circle-plus.svg",
    label: "分享",
    isActive: false,
  },
  {
    icon: "/message-square.svg",
    label: "消息",
    isActive: false,
    badge: "9",
  },
  {
    icon: "/user-1.svg",
    label: "我的",
    isActive: false,
  },
];

export const UserauthSolutionsSubsection = (): JSX.Element => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activeNav, setActiveNav] = React.useState("主页");

  const handleLogin = () => {
    if (!username || !password) {
      alert("请输入用户名和密码");
      return;
    }
    alert(`登录成功: ${username}`);
  };

  const handleRegister = () => {
    alert("打开注册页面");
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };

  return (
    <div className="w-full flex flex-col bg-white shadow-[0px_3px_6px_#120f281f] relative">
      <header className="h-[108px] relative bg-white">
        <img
          className="absolute top-[52px] left-20 w-7 h-7"
          alt="Image"
          src="/image-4.svg"
        />

        <div className="absolute top-[55px] left-[108px] [font-family:'Archivo',Helvetica] font-normal text-[#636ae8] text-[22px] tracking-[0] leading-[22px] whitespace-nowrap">
          SportsShare
        </div>

        <div className="absolute top-[53px] left-[252px] [font-family:'Archivo',Helvetica] font-bold text-[#171a1f] text-2xl tracking-[0] leading-8 whitespace-nowrap">
          体育分享
        </div>

        <img
          className="absolute top-0 left-0 w-full h-10"
          alt="Container"
          src="/container.svg"
        />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-[122px]">
        <Card className="w-full max-w-[342px] bg-white rounded-[10px] shadow-[0px_0px_1px_#171a1f12,0px_0px_2px_#171a1f1f]">
          <CardContent className="pt-[27px] pb-6 px-6">
            <h1 className="[font-family:'Archivo',Helvetica] font-bold text-[#171a1f] text-2xl text-center tracking-[-0.60px] leading-8 whitespace-nowrap mb-3">
              欢迎回来!
            </h1>

            <p className="[font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm text-center tracking-[0] leading-5 whitespace-nowrap mb-[23px]">
              请登录您的账户
            </p>

            <div className="space-y-2 mb-2">
              <Label
                htmlFor="username"
                className="[font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-xs tracking-[0] leading-5"
              >
                用户名
              </Label>
              <div className="relative">
                <img
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
                  alt="User"
                  src="/user.svg"
                />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  className="pl-11 h-[43px] bg-white rounded-md border border-solid border-[#dee1e6] [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 mb-2">
              <Label
                htmlFor="password"
                className="[font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-xs tracking-[0] leading-5"
              >
                密码
              </Label>
              <div className="relative">
                <img
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
                  alt="Lock"
                  src="/lock.svg"
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="请输入密码"
                  className="pl-11 h-[43px] bg-white rounded-md border border-solid border-[#dee1e6] [font-family:'Inter',Helvetica] font-normal text-[#565d6d] text-sm"
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full h-12 mt-2 bg-[#636ae8] hover:bg-[#636ae8]/90 rounded-md [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-[26px]"
            >
              登录
            </Button>

            <Button
              variant="outline"
              onClick={handleRegister}
              className="w-full h-12 mt-4 bg-white hover:bg-gray-50 rounded-md border border-solid border-[#dee1e6] [font-family:'Inter',Helvetica] font-medium text-[#171a1f] text-base tracking-[0] leading-[26px]"
            >
              注册新账户
            </Button>
          </CardContent>
        </Card>
      </main>

      <nav className="h-[65px] flex flex-col shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
        <img className="w-full h-px object-cover" alt="Line" src="/line.svg" />

        <div className="w-full flex bg-white shadow-[0px_8px_17px_#171a1f26,0px_0px_2px_#171a1f1f]">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.label)}
              className="w-[78px] h-16 relative flex flex-col items-center justify-center"
            >
              <div className="relative">
                <img className="w-6 h-6" alt={item.label} src={item.icon} />
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[#de3b40] hover:bg-[#de3b40] rounded-[7px] border-2 border-solid border-white p-0">
                    <span className="font-normal text-white text-[8px] leading-[14px] [font-family:'Inter',Helvetica] tracking-[0]">
                      {item.badge}
                    </span>
                  </Badge>
                )}
              </div>
              <div
                className={`mt-1 [font-family:'Inter',Helvetica] text-[10px] tracking-[0] leading-4 whitespace-nowrap ${
                  activeNav === item.label ? "font-bold text-[#636ae8]" : "font-normal text-[#565d6d]"
                }`}
              >
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
