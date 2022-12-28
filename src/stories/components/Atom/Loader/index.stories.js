import React from "react";
import Loader from "../../../../components/Atom/Loader";

export default {
  component: Loader,
  title: "Design System/Atom/Loader",
  argTypes: {
    variant: {
      options: ["blue", "white"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Loader {...args} />;

export const Loader_ = Template.bind({});

Loader_.args = {};
