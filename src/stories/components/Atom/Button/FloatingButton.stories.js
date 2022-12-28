import React from "react";
import FloatingButton from "../../../../components/Atom/Button/FloatingButton";

export default {
  component: FloatingButton,
  title: "Design System/Atom/Button/Floating Button",
  argTypes: {
    // color: {
    //   options: [],
    //   control: false,
    // },
    skeleton: {
      control: { type: "boolean" },
    },
    size: {
      options: ["medium", "small"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <FloatingButton {...args}>{args.label}</FloatingButton>
);

export const Floating_Button = Template.bind({});

Floating_Button.args = {};
