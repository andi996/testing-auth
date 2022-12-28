import React from "react";
import Pill from "../../../../components/Atom/Selection Control/Pill";

export default {
  component: Pill,
  title: "Design System/Atom/Pill",
  argTypes: {
    skeleton: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["default", "close"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Pill {...args}>{args.label}</Pill>;

export const Pill_ = Template.bind({});

Pill_.args = {
  label: "UI/UX Designer",
};
