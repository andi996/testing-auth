import React from "react";
import TimePicker from "../../../../components/Molecul/TimePicker";

export default {
  component: TimePicker,
  title: "Design System/Molecul/Time Picker",
};

const Template = (args) => <TimePicker {...args}>{args.label}</TimePicker>;

export const TimePicker_ = Template.bind({});

TimePicker_.args = {};
