import React from "react";
import Images from "../../../../components/Atom/Image";

export default {
  component: Images,
  title: "Design System/Atom/Images",
  argTypes: {
    variant: {
      options: ["1:1", "2:1", "3:1", "4:1"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    skeleton: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <Images {...args} />;

export const Images_ = Template.bind({});

Images_.args = {
  image: "/images/Principle/Background/Cover.png",
};
