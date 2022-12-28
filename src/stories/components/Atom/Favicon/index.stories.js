import React from "react";
import Favicon from "../../../../components/Atom/Favicon";

export default {
  component: Favicon,
  title: "Design System/Atom/Favicon",
  argTypes: {
    size: {
      options: ["128px", "64px", "32px", "16px"],
      control: { type: "select" },
    },
    type: {
      options: ["blue", "white"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Favicon {...args}>{args.label}</Favicon>;

export const Fav_Icon = Template.bind({});

Button_Rectangle.args = {
  size: "128px",
  type: "blue",
};
