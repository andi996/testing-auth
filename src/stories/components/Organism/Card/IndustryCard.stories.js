import React from "react";
import IndustryCard from "../../../../components/Organism/Card/IndustriCard";

export default {
  component: IndustryCard,
  title: "Design System/Organism/Industry Card",
};

const Template = (args) => <IndustryCard {...args} />;

export const Industry_Card = Template.bind({});

Industry_Card.args = {
  title: "PT. Qerja",
  category: "Internet & Technology ",
  location: "Jakarta Selatan",
  description:
    "Established in April 2014, Qerja is the first online community portal in Indonesia which provides..",
  count: 12,
  subscriber: 30,
  skeleton: false,
};
