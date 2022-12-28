import React from "react";
import EndPage from "../../../../components/Molecul/EndPage";

export default {
  component: EndPage,
  title: "Design System/Molecul/End Page",
  argTypes: {
    variant: {
      options: ["white", "blue"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <EndPage {...args} />;

export const End_Page = Template.bind({});

End_Page.args = {};
