import React from "react";
import EmptyState from "../../../components/Template/EmptyState";

export default {
  component: EmptyState,
  title: "Design System/Template/Empty State",
  argTypes: {
    variant: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <EmptyState {...args} />;

export const Empty_State = Template.bind({});

Empty_State.args = {
  button: false,
};
