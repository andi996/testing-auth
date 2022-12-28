import React from "react";
import { Row } from "react-grid-system";
import DesktopGrid from "../../../../components/Layout/Grid/Desktop";
import Column from "../../../../components/Layout/Grid/Column";
import RectangleButton from "../../../../components/Atom/Button/RectangleButton";
export default {
  component: DesktopGrid,
  title: "Design System/Principle/Grid",
};

const Template = (args) => {
  return (
    <DesktopGrid {...args}>
      <Row>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={1}>
          <RectangleButton variant="filled">1</RectangleButton>
        </Column>
        <Column xs={2}>
          <RectangleButton variant="filled">2</RectangleButton>
        </Column>
        <Column xs={2}>
          <RectangleButton variant="filled">2</RectangleButton>
        </Column>
        <Column xs={2}>
          <RectangleButton variant="filled">2</RectangleButton>
        </Column>
        <Column xs={2}>
          <RectangleButton variant="filled">2</RectangleButton>
        </Column>
        <Column xs={2}>
          <RectangleButton variant="filled">2</RectangleButton>
        </Column>
        <Column xs={2}>
          <RectangleButton variant="filled">2</RectangleButton>
        </Column>
        <Column xs={3}>
          <RectangleButton variant="filled">3</RectangleButton>
        </Column>
        <Column xs={3}>
          <RectangleButton variant="filled">3</RectangleButton>
        </Column>
        <Column xs={3}>
          <RectangleButton variant="filled">3</RectangleButton>
        </Column>
        <Column xs={3}>
          <RectangleButton variant="filled">3</RectangleButton>
        </Column>
        <Column xs={4}>
          <RectangleButton variant="filled">4</RectangleButton>
        </Column>
        <Column xs={4}>
          <RectangleButton variant="filled">4</RectangleButton>
        </Column>
        <Column xs={4}>
          <RectangleButton variant="filled">4</RectangleButton>
        </Column>
        <Column xs={6}>
          <RectangleButton variant="filled">6</RectangleButton>
        </Column>
        <Column xs={6}>
          <RectangleButton variant="filled">6</RectangleButton>
        </Column>
        <Column xs={12}>
          <RectangleButton variant="filled">12</RectangleButton>
        </Column>
      </Row>
    </DesktopGrid>
  );
};

export const Desktop_Grid = Template.bind({});

Desktop_Grid.args = {};
