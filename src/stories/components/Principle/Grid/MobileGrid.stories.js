import React from "react";
import { Row } from "react-grid-system";
import RectangleButton from "../../../../components/Atom/Button/RectangleButton";
import Column from "../../../../components/Layout/Grid/Column";
import MobileGrid from "../../../../components/Layout/Grid/Mobile/ios";

export default {
  component: MobileGrid,
  title: "Design System/Principle/Grid",
};

const Template2 = (args) => {
  return (
    <MobileGrid {...args}>
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
        <Column xs={6}>
          <RectangleButton variant="filled">6</RectangleButton>
        </Column>
      </Row>
    </MobileGrid>
  );
};

export const Mobile_Grid = Template2.bind({});

Mobile_Grid.args = {};
