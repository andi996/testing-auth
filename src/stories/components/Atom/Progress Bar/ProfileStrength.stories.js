import React from "react";
import ProgressBar from "../../../../components/Atom/ProgressBar";
import ProfileStrength from "../../../../components/Atom/ProgressBar/ProfileStrength";

export default {
  component: ProgressBar,
  component: ProfileStrength,
  title: "Design System/Atom/Progress Bar",
  argTypes: {
    variant: {
      options: ["default", "mobile"],
      control: { type: "select" },
    },
    state: {
      control: { type: "range", min: 0, max: 8, step: 1 },
    },
  },
};

const Template2 = (args) => {
  return <ProfileStrength {...args} />;
};

export const Profile_Strength = Template2.bind({});

Profile_Strength.args = {
  variant: "default",
};
