import React from "react";
import Stepper from "../../../../components/Molecul/Stepper";

export default {
  component: Stepper,
  title: "Design System/Molecul/Stepper",
  argTypes: {
    state: {
      control: { type: "range", min: 0, max: 4, step: 1 },
    },
    // variant: {
    //   control: { type: "select" },
    //   options: ["2 bar", "3 bar"],
    // },
  },
};

const Template = (args) => {
  return <Stepper {...args} />;
};

export const Vertical_Stepper = Template.bind({});

Vertical_Stepper.args = {
  label: true,
  description: true,
  steps: [
    {
      label: "Select campaign settings",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ],
};
