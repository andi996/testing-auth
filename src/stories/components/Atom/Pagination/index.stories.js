import React from "react";
import Pagination from "../../../../components/Atom/Pagination";

export default {
  component: Pagination,
  title: "Design System/Atom/Pagination",
  argTypes: {
    width: {
      control: { type: "number" },
    },
    shadow: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => {
  return <Pagination {...args} />;
};

export const Pagination_ = Template.bind({});

Pagination_.args = {
  width: 380,
  shadow: true,
};
