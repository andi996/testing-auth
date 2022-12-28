import React from "react";
import Link from "../../../../components/Atom/Link";

export default {
  component: Link,
  title: "Design System/Atom/Link",
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "icon left", "icon right"],
      control: { type: "select" },
    },
    type: {
      options: ["mid blue", "clear blue", "red"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <Link {...args}>{args.label}</Link>;

export const Link_ = Template.bind({});

Link_.args = { label: "Link", to: "/", active: false };
