import React from "react";
import FeaturesCircleButton from "../../../../components/Atom/Button/CircleButton/Features";

export default {
  component: FeaturesCircleButton,
  title: "Design System/Atom/Button/Circle",
  argTypes: {
    skeleton: {
      control: { type: "boolean" },
    },
    text: {
      control: { type: "boolean" },
    },
    size: {
      options: ["medium", "large"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <FeaturesCircleButton {...args}>{args.label}</FeaturesCircleButton>
);

export const Features_Button = Template.bind({});

Features_Button.args = { label: "Tes Skills" };
