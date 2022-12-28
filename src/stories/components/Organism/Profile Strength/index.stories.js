import React from "react";
import ProfileStrength from "../../../../components/Organism/ProfileStrength";

export default {
  component: ProfileStrength,
  title: "Design System/Organism/Profile Strength",
  state: {
    control: { type: "range", min: 0, max: 8, step: 1 },
  },
};

const Template = (args) => <ProfileStrength {...args} />;

export const Profile_Strength = Template.bind({});

Profile_Strength.args = {};
