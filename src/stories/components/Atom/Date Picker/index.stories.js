import React, { useState } from "react";
import InputDatePicker from "../../../../components/Atom/DatePicker";

export default {
  component: InputDatePicker,
  title: "Design System/Atom/Date Picker",
  argTypes: {},
};

// const [Value, setValue] = useState(new Date());

const Template = (args) => {
  return <InputDatePicker {...args} />;
};

export const Input_Date_Picker = Template.bind({});

Input_Date_Picker.args = {
  value: new Date(),
  //   onchange: (newValue) => {
  //     setValue(newValue);
  //   },
};
