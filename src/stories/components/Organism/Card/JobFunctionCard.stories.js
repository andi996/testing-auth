import React from "react";
import JobFunctionCard from "../../../../components/Organism/Card/JobFunctionCard";

export default {
  component: JobFunctionCard,
  title: "Design System/Organism/Job Function Card",
  argTypes: {
    title: "",
    image: "",
    count: 90,
    skeleton: false,
  },
};

const Template = (args) => <JobFunctionCard {...args} />;

export const Job_Function_Card = Template.bind({});

Job_Function_Card.args = {
  title: "UI/UX Designer",
  image: "/images/Principle/Background/Cover.png",
  count: 90,
  skeleton: false,
};
