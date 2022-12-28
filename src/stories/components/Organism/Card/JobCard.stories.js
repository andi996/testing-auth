import React from "react";
import JobCard from "../../../../components/Organism/Card/JobCard";

export default {
  component: JobCard,
  title: "Design System/Organism/Job Card",
  argTypes: {
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <JobCard {...args} />;

export const Job_Card = Template.bind({});

Job_Card.args = {
  title: "UI/UX Designer",
  company: "PT. Qerja Manfaat Bangsa",
  salary: "Rp 9,5 juta - 15,6 juta/bulan",
  description: "Jakarta Selatan • Fulltime • Remote ",
  profileMatch: 59,
  timestamp: "5 jam lalu",
  skeleton: false,
  prioritas: false,
};
