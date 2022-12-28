import React from "react";
import ResumeSearch from "../../../components/Template/EmailTemplate/ResumeSearch"

export default {
  component: ResumeSearch,
  title: "Design System/Template/Email Template/Resume Search",
  argTypes:{
    variant: {
      options: ["Shortlisted", "Unlock"],
      control: { type: "select" },
    }
  },
};

const Template = (args) => <ResumeSearch {...args}/> ;

export const ResumeSearch_ = Template.bind({});

ResumeSearch_.args = {
  variant:"Shortlisted"
};
