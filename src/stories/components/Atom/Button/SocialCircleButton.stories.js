import React from "react";
import SocialCircleButton from "../../../../components/Atom/Button/CircleButton/Social";

export default {
  component: SocialCircleButton,
  title: "Design System/Atom/Button/Circle",
  argTypes: {
    // color: {
    //   options: [],
    //   control: false,
    // },
    skeleton: {
      control: { type: "boolean" },
    },
    variant: {
      options: [
        "apple",
        "facebook",
        "google",
        "instagram",
        "linkedin",
        "tiktok",
        "twitter",
      ],
      control: { type: "select" },
    },
    size: {
      control: { type: false },
    },
  },
};

const Template = (args) => (
  <SocialCircleButton {...args}>{args.label}</SocialCircleButton>
);

export const Social_Button = Template.bind({});

Social_Button.args = {};
