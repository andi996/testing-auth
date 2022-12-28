import React from "react";
import PageControl from "../../../../components/Atom/PageControl";

export default {
  component: PageControl,
  title: "Design System/Atom/Page Control",
  argTypes: {
    steps: {
      control: { type: "number" },
    },
    activeStep: {
      control: { type: "number" },
    },
  },
};

const Template = (args) => {
  return <PageControl {...args} />;
};

export const Page_Control = Template.bind({});

Page_Control.args = {};
