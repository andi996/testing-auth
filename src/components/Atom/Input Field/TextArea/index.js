import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment, styled } from "@mui/material";
import { Colors } from "../../../../themes";
import { Error, Clear, Email } from "@mui/icons-material";
import { Small, Body1, Body3 } from "../../Typography";
import { isMobile } from "../../../../utils/useMediaQuery";

const CostumTextField = styled(TextField)(({ Mobile, fullWidth }) => ({
  "& label.Mui-focused": {
    color: Colors.primary.mid_blue,
  },
  "& label": {
    backgroundColor: "white",
    fontWeight: 500,
    fontSize: Mobile ? 12 : 14,
    letterSpacing: 0,
    // lineHeight: Mobile ? `18px` : `20px`,
  },
  "& .MuiOutlinedInput-root": {
    fontWeight: 500,
    fontSize: Mobile ? 14 : 16,
    letterSpacing: 0,
    // lineHeight: Mobile ? `20px` : `22px`,
    maxWidth: fullWidth ? `100%` : Mobile ? 328 : 382,
    minHeight: 140,
    color: Colors.neutral.greyish_brown,

    "& textarea": { height: `117px !important` },
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
  ".MuiFormHelperText-root": {
    margin: `0`,
    marginTop: 4,
    maxWidth: fullWidth ? `100%` : Mobile ? 328 : 382,
  },
}));

function InputTextArea(props) {
  const {
    disable,
    label,
    helperText,
    characterCount = 100,
    fullWidth,
    name,
    error,
    // value,
    // setValue,
    handleChange,
    inputValue,
  } = props;
  const Mobile = isMobile();
  const [Length, setLength] = useState(0);
  const [ErrorValue, setErrorValue] = useState(error);

  useEffect(() => {
    setErrorValue(error);
  }, [error]);

  useEffect(() => {
    inputValue ? setLength(inputValue?.length) : 0;
  }, [inputValue]);

  const removeError = () => {
    setValue("");
    // setLength(0);
    setErrorValue(false);
  };

  return (
    <>
      <CostumTextField
        // autoFocus
        Mobile={Mobile}
        multiline
        rows={4}
        error={ErrorValue}
        disabled={disable}
        name={name}
        label={label}
        value={inputValue}
        onChange={handleChange}
        // InputProps={
        //   ErrorValue && {
        //     endAdornment: (
        //       <div style={{ cursor: "pointer" }} onClick={removeError}>
        //         <InputAdornment position="end">
        //           <Clear />
        //         </InputAdornment>
        //       </div>
        //     ),
        //   }
        // }
        helperText={
          <div
            className="d-flex"
            style={{ alignItems: `flex-start`, gap: Mobile ? 16 : 24 }}
          >
            <div className="d-flex">{helperText}</div>

            {characterCount > 0 && (
              <span style={{ width: `50px`, marginLeft: 5, float: "right" }}>
                {Length}/{characterCount}
              </span>
            )}
          </div>
        }
        size="small"
        fullWidth={fullWidth}
      />
    </>
  );
}

export default InputTextArea;
