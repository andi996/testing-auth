import React from "react";
import Ticker from "../../../../components/Molecul/Ticker";

export default {
  component: Ticker,
  title: "Design System/Molecul/Ticker",
  argTypes: {
    type: { options: ["dekstop", "mobile"], control: { type: "select" } },
    variant: { options: ["default", "icon"], control: { type: "select" } },
  },
};

const Template = (args) => <Ticker {...args}>{args.label}</Ticker>;

export const Divider_ = Template.bind({});

Divider_.args = {
  type: "dekstop",
  variant: "default",
  label:
    "Perhatian! Semua lowongan di Karir.com tidak dipungut biaya sepeserpun dalam bentuk apapapun. Lowongan ini bermasalah? ",
};
