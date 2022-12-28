import React from "react";
import CompanyCard from "../../../../components/Organism/Card/CompanyCard";

export default {
  component: CompanyCard,
  title: "Design System/Organism/Company Card",
};

const Template = (args) => <CompanyCard {...args} />;

export const Company_Card = Template.bind({});

Company_Card.args = {
  title: "PT. Qerja Manfaat Bangsa",
  category: "Internet & Technology ",
  location: "Jakarta Selatan",
  description:
    "Established in April 2014, Qerja is the first online community portal in Indonesia which provides..",
  count: 12,
  subscriber: 30,
  skeleton: false,
};
