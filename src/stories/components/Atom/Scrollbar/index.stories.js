import React from "react";
import ScrollbarExample from "../../../../components/Atom/Scrollbar";

export default {
  component: ScrollbarExample,
  title: "Design System/Atom/Scrollbar",
  argTypes: {
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
    color: {
      options: ["blue", "white"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <ScrollbarExample {...args} />;

export const Scrollbar_ = Template.bind({});

Scrollbar_.args = {};
