import React from "react";
import ProfileMatch from "../../../../components/Atom/Label/ProfileMatch";

export default {
  component: ProfileMatch,
  title: "Design System/Atom/Label/Profile Match",
  argTypes: {
    variant: {
      options: ["default", "short", "micro"],
      control: { type: "select" },
    },
    value: 60,
  },
};

const Template = (args) => <ProfileMatch {...args}>{args.label}</ProfileMatch>;

export const ProfileMatch_ = Template.bind({});

ProfileMatch_.args = {
  variant: "default",
  value: 60,
  skeleton: false,
};
