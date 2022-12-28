import React from "react";
import ProgressBar from "../../../../components/Atom/ProgressBar";
import ProfileStrength from "../../../../components/Atom/ProgressBar/ProfileStrength";

export default {
  component: ProgressBar,
  component: ProfileStrength,
  title: "Design System/Atom/Progress Bar",
  argTypes: {
    state: {
      control: { type: "range", min: 0, max: 3, step: 1 },
    },
    variant: {
      control: { type: "select" },
      options: ["2 bar", "3 bar"],
    },
  },
};

const Template = (args) => {
  return <ProgressBar {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
