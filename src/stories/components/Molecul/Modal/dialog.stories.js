import React from "react";
import Dialog from "../../../../components/Molecul/Modal/Dialog";

export default {
  component: Dialog,
  title: "Design System/Molecul/Modal",
  argTypes: {
    state: {
      options: ["default", "mobile"],
      control: { type: "select" },
    },
    variant: {
      options: [
        "horizontal action right",
        "horizontal action left",
        "vertical action",
        "single action",
      ],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Dialog {...args} />;

export const Dialog_ = Template.bind({});

Dialog_.args = {
  show: true,
  state: "default",
  variant: "horizontal action right",
  title: "Title Dialog",
  description:
    "Put message here. Keep it brief and put a simple question perhaps?",
  primaryButtonText: "CTA",
  secondaryButtonText: "CTA",
};
