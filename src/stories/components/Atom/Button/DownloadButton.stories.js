import React from "react";
import DownloadButton from "../../../../components/Atom/Button/DownloadButton";

export default {
  component: DownloadButton,
  title: "Design System/Atom/Button/Download Button",
  argTypes: {
    variant: {
      options: ["appstore", "playstore"],
      control: { type: "select" },
    },
    state: {
      options: ["default", "alternate"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <DownloadButton {...args} />;

export const Download_Button = Template.bind({});

Download_Button.args = {
  variant: "appstore",
  state: "default",
  href: "/",
};
