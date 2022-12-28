import React from "react";
import Toaster from "../../../../components/Molecul/Toaster";

export default {
  component: Toaster,
  title: "Design System/Molecul/Toaster",
  argTypes: {
    variant: {
      options: ["success", "error", "undo"],
      control: { type: "select" },
    },
    size: {
      options: ["1 line", "2 line"],
      control: { type: "select" },
    },
    open: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <Toaster {...args} />;

export const Toaster_ = Template.bind({});

Toaster_.args = {
  label: "placeholder 1 line",
  subLabel: "2 line",
  open: true,
  noBar: true,
};
