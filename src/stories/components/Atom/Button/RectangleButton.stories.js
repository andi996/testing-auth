import React from "react";
import RectangleButton from "../../../../components/Atom/Button/RectangleButton";

export default {
  component: RectangleButton,
  title: "Design System/Atom/Button/Rectangle",
  argTypes: {
    // color: {
    //   options: [],
    //   control: false,
    // },
    skeleton: {
      control: { type: "boolean" },
    },
    iconOnly: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["filled", "ghost", "text"],
      control: { type: "select" },
    },
    size: {
      options: ["large", "medium", "small", "micro"],
      control: { type: "select" },
    },
    disable: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    icon: {
      options: [false, "left", "right"],
      control: { type: "select" },
    },
    state: {
      options: [false, "error", "alternate"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <RectangleButton {...args}>{args.label}</RectangleButton>
);

export const Rectangle = Template.bind({});

Rectangle.args = {
  variant: "filled",
  label: "Button",
};
