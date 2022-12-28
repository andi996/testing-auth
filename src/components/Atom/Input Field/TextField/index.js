import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment, styled } from "@mui/material";
import { Colors } from "../../../../themes";
import { Error, Clear, Email } from "@mui/icons-material";
import { Body3, Small } from "../../Typography";
import { isMobile } from "../../../../utils/useMediaQuery";

const CostumTextField = styled(TextField)(({ minWidth, Mobile }) => ({
  "& label.Mui-focused": {
    color: Colors.primary.mid_blue,
  },
  "& label": {
    backgroundColor: "white",
    fontWeight: Mobile ? 400 : 500,
    fontSize: Mobile ? 14 : 16,
    letterSpacing: 0,
    lineHeight: Mobile ? `20px` : `22px`,
  },
  "& .MuiOutlinedInput-root": {
    fontSize: Mobile ? 14 : 16,
    fontWeight: Mobile ? 400 : 500,
    letterSpacing: 0,
    lineHeight: Mobile ? `20px` : `22px`,
    height: 40,
    minWidth: minWidth || 382,
    color: Colors.neutral.greyish_brown,
    "& fieldset": {
      borderColor: Colors.neutral.brown_light_grey,
    },
    "&:hover fieldset": {
      borderColor: Colors.neutral.brown_light_grey,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.primary.mid_blue,
    },
  },
  "& .Mui-error": {
    color: Colors.secondary.red,
    "& svg": {
      color: Colors.secondary.red,
    },
  },
}));

function InputTextField(props) {
  const {
    disable,
    label,
    defaultValue,
    helperText,
    characterCount,
    minWidth,
    fullWidth,
    name,
    error,
    icon,
    handleChange,
  } = props;
  const [Length, setLength] = useState(0);
  const [Value, setValue] = useState(defaultValue);
  const [ErrorValue, setErrorValue] = useState(error);
  const Mobile = isMobile();

  useEffect(() => {
    setErrorValue(error);
  }, [error]);
  const removeError = (e) => {
    setValue("");
    setLength(0);
    setErrorValue(false);
  };

  // useEffect(() => {
  //   if (props.handleChange) {
  //     props.handleChange(Value);
  //   }
  // }, []);

  useEffect(() => {
    Value ? setLength(Value.length) : 0;
  }, [Value]);

  return (
    <CostumTextField
      error={ErrorValue}
      disabled={disable}
      name={name}
      label={label}
      value={Value}
      onChange={(e) => {
        setValue(e.target.value);
        handleChange && handleChange(e.target.value);
      }}
      InputProps={
        (ErrorValue && {
          endAdornment: (
            <div style={{ cursor: "pointer" }} onClick={removeError}>
              <InputAdornment position="end">
                <Clear
                  onClick={(e) => {
                    setValue(null);
                    handleChange && handleChange(null);
                  }}
                />
              </InputAdornment>
            </div>
          ),
        }) ||
        (icon && {
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        })
      }
      FormHelperTextProps={{ sx: { mx: 0 } }}
      helperText={
        helperText && (
          <div className="d-flex">
            <div className="d-flex">
              {ErrorValue && (
                <Error
                  style={{
                    width: Mobile ? 14 : 16,
                    height: Mobile ? 14 : 16,
                    marginRight: 4,
                  }}
                />
              )}
              <div>
                <Body3>{helperText}</Body3>
              </div>
            </div>

            {characterCount && (
              <span style={{ marginLeft: 5, float: "right" }}>
                {Length}/100
              </span>
            )}
          </div>
        )
      }
      size="small"
      fullWidth={fullWidth}
      minWidth={minWidth}
      Mobile={Mobile}
    >
      {defaultValue}
    </CostumTextField>
  );
}

export default InputTextField;
