import React from "react";
import StatusLamaran from "../../../components/Template/EmailTemplate/StatusLamaran";

export default {
  component: StatusLamaran,
  title: "Design System/Template/Email Template/Status Lamaran",
  argTypes: {
    variant: {
      options: [
        "Apply",
        "Shortlist",
        "TLD Invitation",
        "TLD Invitation Reminder",
        "ORVI Invitation",
        "ORVI Invitation Reminder",
        "MCU Invitation",
        "MCU Invitation Reminder",
        "Interview Invitation",
        "Interview Invitation Update",
        "Interview Invitation Confirmed",
        "Interview Invitation Denied",
        "Interview Invitation Reminder",
        "Offering",
        "OfferingReminder",
        "Hired",
        "Gagal",
      ],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <StatusLamaran {...args} />;

export const StatusLamaran_ = Template.bind({});

StatusLamaran_.args = {
  variant: "Apply",
};
