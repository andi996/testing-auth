import React from "react";
import HappyBirthday from "../../../components/Template/EmailTemplate/HappyBirthday"

export default {
  component: HappyBirthday,
  title: "Design System/Template/Email Template/Happy Birthday",
};

const Template = (args) => <HappyBirthday {...args}/> ;

export const HappyBirthday_ = Template.bind({});

HappyBirthday_.args = {};
