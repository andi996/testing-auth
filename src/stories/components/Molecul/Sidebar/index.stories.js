import React from "react";
import Sidebar from "../../../../components/Molecul/Sidebar";

export default {
  component: Sidebar,
  title: "Design System/Molecul/Sidebar",
};

const Template = () => (
  <Sidebar>
    <Sidebar.Content notification={true}>Menu Label</Sidebar.Content>
    <Sidebar.Content notification={true}>Menu Label</Sidebar.Content>
    <Sidebar.Content>Menu Label</Sidebar.Content>
    <Sidebar.Content>Menu Label</Sidebar.Content>
  </Sidebar>
);

export const Sidebar_ = Template.bind({});

Sidebar_.args = {};
