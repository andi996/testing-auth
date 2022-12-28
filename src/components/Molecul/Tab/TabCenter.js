import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { Colors } from "../../../themes";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
  />
))({
  minHeight: "unset",
  "& .MuiTabs-flexContainer": {
    // height: `52px`,
    alignItems: `center`,
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: Colors.neutral.light_grey,
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: Colors.primary.mid_blue,
  },
});

export default function TabCenter(props) {
  const { children, value, handleChange, costumStyle } = props;
  // const [Value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <StyledTabs value={value} onChange={handleChange} style={costumStyle}>
        {children}
      </StyledTabs>
    </Box>
  );
}
