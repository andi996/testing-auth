import React from "react";
import SliderComponent from "../../../../components/Atom/Selection Control/Slider";

export default {
  component: SliderComponent,
  title: "Design System/Atom/Slider",
  argTypes: {
    variant: {
      options: ["single value", "double value"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <SliderComponent {...args}>{args.label}</SliderComponent>
);

export const Slider_ = Template.bind({});

Slider_.args = {
  value1: 10,
  value2: 20,
};
