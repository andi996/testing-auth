import React from "react";
import JobAlert from "../../../components/Template/EmailTemplate/JobAlert"

export default {
  component: JobAlert,
  title: "Design System/Template/Email Template/Job Alert",
  argTypes:{
    variant: {
      options: ["Preferensi", "Rekomendasi"],
      control: { type: "select" },
    }
  },
};

const Template = (args) => <JobAlert {...args}/> ;

export const JobAlert_ = Template.bind({});

JobAlert_.args = {
  variant: "Preferensi"
};
