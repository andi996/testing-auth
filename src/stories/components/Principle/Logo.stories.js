import React from "react";
import Logo from "../../../components/Atom/Logo";

export default {
  component: Logo,
  title: "Design System/Principle/Logo",
  argTypes: {
    type: {
      options: ["default", "appstore", "playstore"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Logo {...args} />;

export const Logo_ = Template.bind({});

Logo_.args = {
  type: "default",
};
