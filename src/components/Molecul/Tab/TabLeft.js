import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { Colors } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
  />
))((props) => ({
  overflowX: "auto",
  minHeight: "unset",
  padding: "0 8px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 35,
    width: "100%",
    backgroundColor: Colors.primary.mid_blue,
    ...props.indicatorSpanStyles,
  },
  " .MuiTabs-scroller": {
    overflowX: "auto !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

export default function TabLeft(props) {
  const { fullWidth, children, indicatorSpanStyles, value, onChange } = props;
  const Mobile = isMobile();
  // const [Value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <Box
      sx={{
        borderBottom: Mobile ? 1 : 0,
        borderColor: "divider",
        width: fullWidth ? `100%` : `fit-content`,
      }}
    >
      <StyledTabs
        value={value}
        onChange={onChange}
        indicatorSpanStyles={indicatorSpanStyles}
      >
        {children}
      </StyledTabs>
    </Box>
  );
}
