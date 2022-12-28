import React from "react";
import Divider from "../../../../components/Atom/Divider";

export default {
  component: Divider,
  title: "Design System/Atom/Divider",
  argTypes: {
    size: {
      options: ["1px", "2px", "4px", "8px"],
      control: { type: "select" },
    },
    variant: {
      options: ["Default","Light Grey Version"],
      control: {type:"select"}
    }
  },
};

const Template = (args) => <Divider {...args}>{args.label}</Divider>;

export const Divider_ = Template.bind({});

Divider_.args = {
  size: "2px",
  label: "Divider"
};
