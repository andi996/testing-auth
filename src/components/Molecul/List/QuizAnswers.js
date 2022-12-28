import React from "react";
import { Body1 } from "../../../components/Atom/Typography";
import { Colors, Radius, Elevation } from "../../../themes";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

function QuizAnswers({ value, options, onChange, styles }) {
  return (
    <FormControl sx={{ width: styles?.fullWidth ? `100%` : `fit-content` }}>
      <RadioGroup value={value} row={false} onChange={onChange}>
        {Array.isArray(options) ? (
          options.map((el, index) => {
            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={index > 0 ? (styles?.background ? "4px" : 0) : 0}
                mb={
                  index < options.length - 1
                    ? styles?.background
                      ? "4px"
                      : 0
                    : 0
                }
              >
                <FormControlLabel
                  value={el.value}
                  control={
                    <Radio
                      style={{
                        padding: styles?.padding || 0,
                        marginRight: 8,
                      }}
                    />
                  }
                  label={
                    <Body1
                      color={
                        value === el.value
                          ? Colors.primary.mid_blue
                          : Colors.neutral.brown_grey
                      }
                    >
                      {el.label}
                    </Body1>
                  }
                  sx={{
                    width: `100%`,
                    mx: 0,
                    padding: styles?.background ? `8px 16px` : 0,
                    borderRadius: Radius.medium,
                    backgroundColor: styles?.background
                      ? value === el.value
                        ? Colors.primary.very_light_blue
                        : "#FFFFF"
                      : "#FFFFF",
                  }}
                />

                {el.endAdornment && (
                  <Box ml="160px" sx={{ cursor: "pointer" }}>
                    {el.endAdornment}
                  </Box>
                )}
              </Box>
            );
          })
        ) : (
          // hanya 1 untuk preview
          <FormControlLabel
            value={options.value}
            control={<Radio />}
            label={
              <Body1 color={Colors.neutral.brown_grey}>{options.label}</Body1>
            }
          />
        )}
      </RadioGroup>
    </FormControl>
  );
}

export default QuizAnswers;
