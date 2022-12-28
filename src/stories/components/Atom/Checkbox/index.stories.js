import React from "react";
import CheckboxButton from "../../../../components/Atom/Selection Control/Checkbox";

export default {
  component: CheckboxButton,
  title: "Design System/Atom/Checkbox",
  argTypes: {
    skeleton: {
      control: { type: "boolean" },
    },
    disable: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["none", "left", "right"],
      control: { type: "select" },
    },
    direction: {
      options: ["column", "row"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <CheckboxButton {...args}>{args.label}</CheckboxButton>
);

export const Checkbox_Button = Template.bind({});

Checkbox_Button.args = {
  options: [
    { label: "title 1", value: "title 1" },
    { label: "title 2", value: "title 2" },
  ],
};
