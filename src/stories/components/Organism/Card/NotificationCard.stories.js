import React from "react";
import NotificationCard from "../../../../components/Organism/Card/NotificationCard";

export default {
  component: NotificationCard,
  title: "Design System/Organism/Notification Card",
  argTypes: {
    variant: {
      options: [
        "Job Alert (Rekomendasi)",
        "Job Alert (Preferensi)",
        "Subscribe Perusahaan",
        "Status Lamaran",
        "Resume Search",
      ],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <NotificationCard {...args} />;

export const Notification_Card = Template.bind({});

Notification_Card.args = {
  title: "Rekomendasi Lowongan Kerja Terbaru Untuk Anda!",
  description:
    "Temukan pekerjaan terbaru yang sesuai dengan profile anda di sini",
  timestamp: "27 Okt 2021",
  skeleton: false,
  isRead: false,
};
