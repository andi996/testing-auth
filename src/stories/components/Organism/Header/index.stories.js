import React from "react";
import RectangleButton from "../../../../components/Atom/Button/RectangleButton";
import Header from "../../../../components/Organism/Header";
import HeaderGuest from "../../../../components/Organism/Header/Guest";
import { isMobile } from "../../../../utils/useMediaQuery";

export default {
  component: Header,
  title: "Design System/Organism/Header",
  argTypes: {
    variant: {
      options: ["default", "action", "notification"],
      control: { type: "select" },
    },
    type: {
      options: [
        "Landing",
        "Home",
        "Status Lamaran",
        "Search Lowongan",
        "Lowongan Disimpan",
      ],
      control: { type: "select" },
    },
    profile: {
      options: ["not filled", "itermediate", "amazing"],
      control: { type: "select" },
    },
    state: {
      options: ["sticky", "navigation"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => {
  const Mobile = isMobile();
  return !args.isLogin && !Mobile ? (
    <HeaderGuest />
  ) : (
    <Header {...args}>
      <RectangleButton variant="text" fullWidth customStyle={{ margin: 0 }}>
        Employer
      </RectangleButton>
      <RectangleButton
        variant="ghost"
        customStyle={{ minWidth: 124, margin: 0 }}
        fullWidth
      >
        Masuk
      </RectangleButton>
      <RectangleButton customStyle={{ minWidth: 124, margin: 0 }} fullWidth>
        Buat Akun
      </RectangleButton>
    </Header>
  );
};

export const Header_ = Template.bind({});

Header_.args = {
  title: "Title",
  search: true,
  skeleton: false,
  isEmpty: false,
  isLogin: true,
};
