import React from "react";
import TabLeft from "../../../../components/Molecul/Tab/TabLeft";
import TabCenter from "../../../../components/Molecul/Tab/TabCenter";
import { Tab } from "@mui/material";
import { Colors } from "../../../../themes";
import { Heading5, Heading6 } from "../../../../components/Atom/Typography";
import { isMobile } from "../../../../utils/useMediaQuery";
import { Business } from "@mui/icons-material";

export default {
  component: TabLeft,
  component: TabCenter,
  title: "Design System/Molecul/Tab",
  argTypes: {
    value: { control: { type: "number" } },
  },
};

const Template = (args) => {
  const Mobile = isMobile();
  return (
    <TabLeft {...args}>
      <Tab
        value={0}
        label={Mobile ? <Heading6>Tab 1</Heading6> : <Heading5>Tab 1</Heading5>}
        style={{
          minWidth: 32,
          minHeight: Mobile ? 20 : 24,
          padding: Mobile ? 8 : "12px 8px",
          color:
            args.value == 0
              ? Colors.primary.mid_blue
              : Colors.neutral.brown_light_grey,
        }}
      />
      <Tab
        value={1}
        label={Mobile ? <Heading6>Tab 2</Heading6> : <Heading5>Tab 2</Heading5>}
        style={{
          minWidth: 32,
          minHeight: Mobile ? 20 : 24,
          padding: Mobile ? 8 : "12px 8px",
          color:
            args.value == 1
              ? Colors.primary.mid_blue
              : Colors.neutral.brown_light_grey,
        }}
      />
      <Tab
        value={2}
        label={Mobile ? <Heading6>Tab 3</Heading6> : <Heading5>Tab 3</Heading5>}
        style={{
          minWidth: 32,
          minHeight: Mobile ? 20 : 24,
          padding: Mobile ? 8 : "12px 8px",
          color:
            args.value == 2
              ? Colors.primary.mid_blue
              : Colors.neutral.brown_light_grey,
        }}
      />
    </TabLeft>
  );
};

const Template2 = (args) => {
  const Mobile = isMobile();
  return (
    <TabCenter {...args}>
      <Tab
        value={0}
        label={
          Mobile ? (
            <Heading6 style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {args.icon && <Business />} Tab 1
            </Heading6>
          ) : (
            <Heading5 style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {args.icon && <Business />} Tab 1
            </Heading5>
          )
        }
        style={{
          display: "flex",
          flex: 1,
          maxWidth: "100%",
          minHeight: Mobile ? 20 : 24,
          padding: Mobile ? "8px 16px" : 16,
          color:
            args.value == 0
              ? Colors.primary.mid_blue
              : Colors.neutral.brown_light_grey,
        }}
      />
      <Tab
        value={1}
        label={
          Mobile ? (
            <Heading6 style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {args.icon && <Business />} Tab 2
            </Heading6>
          ) : (
            <Heading5 style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {args.icon && <Business />} Tab 2
            </Heading5>
          )
        }
        style={{
          display: "flex",
          flex: 1,
          maxWidth: "100%",
          minHeight: Mobile ? 20 : 24,
          padding: Mobile ? "8px 16px" : 16,
          color:
            args.value == 1
              ? Colors.primary.mid_blue
              : Colors.neutral.brown_light_grey,
        }}
      />
    </TabCenter>
  );
};

export const Tab_Left = Template.bind({});
export const Tab_Center = Template2.bind({});

Tab_Left.args = {
  value: 0,
};
Tab_Center.args = {
  value: 0,
  icon: false,
};
