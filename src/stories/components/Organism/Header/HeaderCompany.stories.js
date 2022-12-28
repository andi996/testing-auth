import React from "react";
import HeaderCompany from "../../../../components/Organism/Header/HeaderCompany";

export default {
  component: HeaderCompany,
  title: "Design System/Organism/Header/Header Company",
  argTypes: {
    variant: {
      options: ["Default", "With Image"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "large"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <HeaderCompany {...args} />;

export const Header_Company = Template.bind({});

Header_Company.args = {
  title: "PT. Qerja Manfaat Bangsa",
  location: "Jakarta Selatan",
  website: "www.karir.com",
  image: "/images/Principle/Background/Cover.png",
  btnText: "Subscribe",
};
