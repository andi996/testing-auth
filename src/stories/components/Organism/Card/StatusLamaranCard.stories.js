import React from "react";
import StatusLamaranCard from "../../../../components/Organism/Card/StatusLamaranCard";

export default {
  component: StatusLamaranCard,
  title: "Design System/Organism/Status Lamaran Card",
  argTypes: {
    variant: {
      options: [
        "terkirim",
        "shortlist",
        "tes logika dasar",
        "medical checkup",
        "orvi invitation",
        "interview invitation",
        "gagal",
        "berhasil",
        "lowongan ditutup",
      ],
      control: { type: "select" },
    },
    state: {
      options: ["active", "terkirim", "deadline", "negosiasi", "unread"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <StatusLamaranCard {...args} />;

export const Status_Lamaran_Card = Template.bind({});

Status_Lamaran_Card.args = {
  title: "UI/UX Designer",
  company: "PT. Qerja Manfaat Bangsa",
  location: "Jakarta Selatan",
  profileMatch: 59,
  timestamp: "27 Okt 2021",
  status: "Lamar Pribadi",
  skeleton: false,
};
