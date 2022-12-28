import React from "react";
import Switch from "../../../../components/Atom/Switch";

export default {
  component: Switch,
  title: "Design System/Atom/Switch",
  argTypes: {
    skeleton: {
      control: { type: "boolean" },
    },
    disable: {
      control: { type: "boolean" },
    },
    active: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <Switch {...args}>{args.label}</Switch>;

export const Switch_ = Template.bind({});

Switch_.args = {};
