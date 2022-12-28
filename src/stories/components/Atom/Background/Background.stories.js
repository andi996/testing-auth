import React from "react";
import Background from "../../../../components/Layout/Background";

export default {
  component: Background,
  title: "Design System/Atom/Background",
  argTypes: {
    color: {
      options: ["DarkBlue", "LightBlue", "People"],
      control: false,
    },
    size: {
      options: ["desktop", "mobile"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => {
  const style = {
    desktop: {
      height: "100vh",
      width: "100vw",
    },
    mobile: {
      height: "640px",
      width: "360px",
    },
  };
  return (
    <div style={style[args?.size]}>
      <Background {...args}>
        <div style={style[args?.size]}></div>
      </Background>
    </div>
  );
};

export const DarkBlue = Template.bind({});
export const LightBlue = Template.bind({});
export const People = Template.bind({});

DarkBlue.args = {
  color: "DarkBlue",
  size: "mobile",
};

LightBlue.args = {
  color: "LightBlue",
  size: "mobile",
};

People.args = {
  color: "People",
  size: "mobile",
};
