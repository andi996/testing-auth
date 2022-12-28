import React from "react";
import PopoverTooltip from "../../../../components/Molecul/Tooltip";

export default {
  component: PopoverTooltip,
  title: "Design System/Molecul/Tooltip",
  argTypes: {
    variant: {
      options: ["up", "right", "down"],
      control: { type: "select" },
    },
    state: {
      options: ["left", "right", "up", "down"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => (
  <div
    style={{
      width: 200,
      height: 200,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
    }}
  >
    <PopoverTooltip {...args} />
  </div>
);

export const Tooltip = Template.bind({});

Tooltip.args = {
  title: "title",
  desciption: "description",
};
