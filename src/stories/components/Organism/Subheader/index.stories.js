import React from "react";
import Subheader from "../../../../components/Organism/Subheader";

export default {
  component: Subheader,
  title: "Design System/Organism/Subheader",
};

const Template = (args) => <Subheader {...args} />;

export const Subheader_ = Template.bind({});

Subheader_.args = {
  title: " Pekerjaan Apa Yang Anda Cari? ",
};
