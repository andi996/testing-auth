import React from "react";
import CircleAvatar from "../../../../components/Atom/Avatar/Circle";

export default {
  component: CircleAvatar,
  title: "Design System/Atom/Avatar/Circle",
  argTypes: {
    state: {
      options: ["karir, laguage, people, browser"],
      control: false,
    },
    type: {
      options: [
        "gradient",
        "blue",
        "white",
        "inggris",
        "indonesia",
        "boy",
        "girl",
        "chrome",
        "safari",
      ],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <CircleAvatar {...args} />;
const Template2 = (args) => <CircleAvatar {...args} />;
const Template3 = (args) => <CircleAvatar {...args} />;
const Template4 = (args) => <CircleAvatar {...args} />;

export const Karir = Template.bind({});
export const Language = Template2.bind({});
export const People = Template3.bind({});
export const Browser = Template4.bind({});

Karir.args = {
  state: "karir",
  type: "gradient",
};

Language.args = {
  state: "language",
  type: "inggris",
};

People.args = {
  state: "people",
  type: "boy",
};

Browser.args = {
  state: "browser",
  type: "chrome",
};
