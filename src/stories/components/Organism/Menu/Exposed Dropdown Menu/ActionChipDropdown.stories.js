import React, { Fragment } from "react";
import ActionChipDropdown from "../../../../../components/Organism/Menu/Exposed Dropdown Menu/ActionChipDropdown";

export default {
  component: ActionChipDropdown,
  title:
    "Design System/Organism/Menu/Exposed Dropdown Menu/Action Chip Dropdown",
  argTypes: {
    skeleton: {
      control: { type: "boolean" },
    },
    disable: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "boolean" },
    },
    size: {
      options: ["small", "medium"],
      control: { type: "select" },
    },
  },
};

const Template4 = (args) => (
  <ActionChipDropdown {...args}>{args.label}</ActionChipDropdown>
);

export const ActionChipDropdown_ = Template4.bind({});

ActionChipDropdown_.args = {
  label: "Action Chip",
  chevron: false,
  optionList: ["Menu 1", "Menu 2", "Menu 3"],
  range: false,
  search: false,
};
