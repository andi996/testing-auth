import React from "react";
import ChevronCircleButton from "../../../../components/Atom/Button/CircleButton/Chevron";

export default {
  component: ChevronCircleButton,
  title: "Design System/Atom/Button/Circle",
  argTypes: {
    // color: {
    //   options: [],
    //   control: false,
    // },
    skeleton: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["left", "right"],
      control: { type: "select" },
    },
    size: {
      options: ["large", "medium"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <ChevronCircleButton {...args}>{args.label}</ChevronCircleButton>
);

export const Chevron_Button = Template.bind({});

Chevron_Button.args = {};
