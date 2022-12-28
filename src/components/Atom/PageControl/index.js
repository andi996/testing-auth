import { MobileStepper } from "@mui/material";
import React from "react";
import { Colors } from "../../../themes";

export default function PageControl(props) {
  const { steps, activeStep } = props;
  return (
    <MobileStepper
      variant="dots"
      steps={steps}
      position="static"
      activeStep={activeStep}
      sx={{
        "& .MuiMobileStepper-dot": {
          backgroundColor: Colors.primary.very_light_blue,
        },
        "& .MuiMobileStepper-dotActive": {
          backgroundColor: `${Colors.primary.mid_blue} !important`,
        },
      }}
    />
  );
}
