import { Box } from "@mui/material";
import React from "react";
import { Colors } from "../../../themes";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

export default function Loader({ variant, zIndex }) {
  function FacebookCircularProgress(props) {
    return (
      <Box sx={{ position: "relative", margin: `8px`, zIndex: zIndex }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color:
              variant === `white`
                ? Colors.neutral.very_light_grey
                : Colors.primary.very_light_blue,
          }}
          size={48}
          thickness={6}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: variant === `white` ? `white` : Colors.primary.mid_blue,
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
              strokeDasharray: "20px,200px",
            },
            // "& svg": {
            //     color: variant === `white` ? `white` : Colors.primary.mid_blue,
            //   },
          }}
          size={48}
          thickness={6}
          {...props}
        />
      </Box>
    );
  }

  return <FacebookCircularProgress />;
}
