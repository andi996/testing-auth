import React from "react";
import Notification from "../../../../components/Atom/Badge/Notification";

export default {
  component: Notification,
  title: "Design System/Atom/Badge/Notification",
  argTypes: {
    state: {
      options: ["dot", "counter"],
      control: false,
    },
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Notification {...args}>{args.label}</Notification>;

export const Dot = Template.bind({});
export const Counter = Template.bind({});

Dot.args = {
  state: "dot",
  variant: "primary",
};

Counter.args = {
  state: "counter",
  variant: "primary",
  value: 1,
};
