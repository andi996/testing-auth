import React, { Fragment } from "react";
import ChoiceChip from "../../../../components/Atom/Selection Control/Chips/ChoiceChip";
import FilterChip from "../../../../components/Atom/Selection Control/Chips/FilterChip";
import InputChip from "../../../../components/Atom/Selection Control/Chips/InputChip";
import ActionChip from "../../../../components/Atom/Selection Control/Chips/ActionChip";

export default {
  component: FilterChip,
  component: ChoiceChip,
  component: InputChip,
  component: ActionChip,
  title: "Design System/Atom/Chips",
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

const Template = (args) => (
  <div className="d-flex">
    <FilterChip {...args}>{args.label}</FilterChip>
    <FilterChip {...args}>{args.label}</FilterChip>
  </div>
);
const Template2 = (args) => (
  <div className="d-flex">
    <ChoiceChip {...args}>{args.label}</ChoiceChip>
    <ChoiceChip {...args}>{args.label}</ChoiceChip>
  </div>
);
const Template3 = (args) => <InputChip {...args}>{args.label}</InputChip>;
const Template4 = (args) => <ActionChip {...args}>{args.label}</ActionChip>;

export const Filter_Chip = Template.bind({});
export const Choice_Chip = Template2.bind({});
export const Input_Chip = Template3.bind({});
export const Action_Chip = Template4.bind({});

Filter_Chip.args = {
  label: "Filter Chip",
  name: "Filter Chips",
  size: "medium",
};

Choice_Chip.args = {
  label: "Choice Chip",
  name: "Choice Chips",
  size: "medium",
};

Input_Chip.args = {
  label: "Input Chip",
  size: "medium",
};

Action_Chip.args = {
  label: "Action Chip",
  active: false,
  chevron: false,
  isOpen: false,
  size: "medium",
};
