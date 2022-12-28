import React from "react";
import BlogCard from "../../../../components/Organism/Card/BlogCard";

export default {
  component: BlogCard,
  title: "Design System/Organism/Blog Card",
};

const Template = (args) => <BlogCard {...args} />;

export const Blog_Card = Template.bind({});

Blog_Card.args = {
  skeleton: false,
  image: "/images/Principle/Background/Cover.png",
  title: "Jenis Software Digital Yang Wajib Dimiliki Pekerja Milenial Saat ini",
  category: "Tips Karir",
  date: "20 Des 21",
};
