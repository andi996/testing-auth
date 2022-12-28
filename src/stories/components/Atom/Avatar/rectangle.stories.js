import React from "react";
import RectangleAvatar from "../../../../components/Atom/Avatar/Rectangle";

export default {
  component: RectangleAvatar,
  title: "Design System/Atom/Avatar/Rectangle",
  argTypes: {
    state: {
      options: ["karir"],
      control: false,
    },
    type: {
      options: ["blue", "white"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <RectangleAvatar {...args} />;

export const Karir = Template.bind({});

Karir.args = {
  state: "karir",
  type: "blue",
};
