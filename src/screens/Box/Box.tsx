import React from "react";
import { AiCoachSubsection } from "./sections/AiCoachSubsection";
import { CommunityHubSubsection } from "./sections/CommunityHubSubsection";
import { CommunityHubWrapperSubsection } from "./sections/CommunityHubWrapperSubsection";
import { FittrackSportsSubsection } from "./sections/FittrackSportsSubsection";
import { MyProfileSubsection } from "./sections/MyProfileSubsection";
import { SportsOverviewSubsection } from "./sections/SportsOverviewSubsection";
import { UserauthSolutionsSubsection } from "./sections/UserauthSolutionsSubsection";

export const Box = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full">
        <FittrackSportsSubsection />
        <AiCoachSubsection />
        <CommunityHubWrapperSubsection />
        <MyProfileSubsection />
        <SportsOverviewSubsection />
        <UserauthSolutionsSubsection />
        <CommunityHubSubsection />
      </div>
    </div>
  );
};
