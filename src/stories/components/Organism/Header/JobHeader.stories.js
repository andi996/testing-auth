import React from "react";
import JobHeader from "../../../../components/Organism/Header/JobHeader";

export default {
  component: JobHeader,
  title: "Design System/Organism/Header/Job Header",
  argTypes: {
    size: {
      options: ["large", "small"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <JobHeader {...args} />;

export const JobHeader_ = Template.bind({});

JobHeader_.args = {
  size: "large",
  title: "Engineer Mobile Developer for iOS & Android with React Native",
  company: "PT. Qerja Manfaat Bangsa",
  location: "Jakarta Selatan",
  salary: "Rp 10.8 juta - Rp 16.6 juta/bulan",
  profileMatch: 80,
  postedDate: "2022-10-10 22:00:00",
  isUpdated: false,
};
