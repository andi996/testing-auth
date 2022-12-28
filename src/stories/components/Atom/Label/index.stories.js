import React from "react";
import Label from "../../../../components/Atom/Label";

export default {
  component: Label,
  title: "Design System/Atom/Label",
  argTypes: {
    skeleton: {
      control: { type: "boolean" },
    },
    size: {
      options: ["small", "large"],
      control: { type: "select" },
    },
    variant: {
      options: [
        "dark blue",
        "grey",
        "green",
        "red",
        "orange",
        "light blue",
        "purple",
        "prioritas",
      ],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Label {...args}>{args.label}</Label>;

export const Label_ = Template.bind({});

Label_.args = { label: "Label" };
