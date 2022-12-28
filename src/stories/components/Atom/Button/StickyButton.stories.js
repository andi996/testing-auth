import React from "react";
import StickyButton from "../../../../components/Atom/Button/StickyButton";

export default {
  component: StickyButton,
  title: "Design System/Atom/Button/StickyButton",
  argTypes: {
    variant: {
      options: ["Apply Process"],
      control: { type: "select" },
    },
    state: {
      options: ["Profile Complete", "Profile Not Complete"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <StickyButton {...args} />;

export const Sticky_Button = Template.bind({});

Sticky_Button.args = {};
