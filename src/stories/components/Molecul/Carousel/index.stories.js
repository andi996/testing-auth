import React from "react";
import Carousel from "../../../../components/Molecul/Carousel";

export default {
  component: Carousel,
  title: "Design System/Molecul/Carousel",
  argTypes: {
    state: {
      options: ["1:1", "2:1", "4:1"],
      control: { type: "select" },
    },
    steps: {
      control: { type: "number" },
    },
    activeStep: {
      control: { type: "number" },
    },
  },
};

const Template = (args) => <Carousel {...args} />;

export const Carousel_ = Template.bind({});

Carousel_.args = {
  image: [
    "/images/Principle/Background/Cover.png",
    "/images/Principle/Background/Dark Blue Desktop.png",
    "/images/Principle/Background/Light Blue Desktop.png",
  ],
};
