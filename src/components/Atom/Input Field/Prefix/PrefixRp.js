import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment, styled } from "@mui/material";
import { Colors } from "../../../../themes";
import { Error, Clear } from "@mui/icons-material";
import { Body1, Body2, Body3, Small } from "../../Typography";
import { isMobile } from "../../../../utils/useMediaQuery";

const CostumTextField = styled(TextField)(({ Mobile }) => ({
  "& label.Mui-focused": {
    color: Colors.primary.mid_blue,
  },
  "& label": {
    backgroundColor: "white",
    fontWeight: Mobile ? 400 : 500,
    fontSize: Mobile ? 12 : 16,
    letterSpacing: 0,
    lineHeight: Mobile ? `20px` : `22px`,
  },
  "& .MuiOutlinedInput-root": {
    fontSize: Mobile ? 12 : 16,
    fontWeight: Mobile ? 400 : 500,
    letterSpacing: 0,
    lineHeight: Mobile ? `20px` : `22px`,
    height: 40,
    // minWidth: 382,
    width: `100%`,
    color: Colors.neutral.greyish_brown,
    "& .MuiOutlinedInput-input": {
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
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
    "& p": {
      color: Colors.secondary.red,
    },
  },
}));

function InputPrefixRp(props) {
  const {
    disable,
    label,
    helperText,
    fullWidth,
    name,
    error,
    handleChange,
    defaultValue,
  } = props;
  const [ErrorValue, setErrorValue] = useState(error);
  const [Value, setValue] = useState(defaultValue ?? "");
  const Mobile = isMobile();

  useEffect(() => {
    setErrorValue(error);
  }, [error]);

  useEffect(() => {
    // console.log(defaultValue);
    setValue(defaultValue);
  }, [defaultValue]);

  const removeError = () => {
    setValue("");
    setErrorValue(false);
  };

  function ccNumberFormat(value) {
    const v = value
      .toString()
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "");
    const part = [];
    let last = v.length;
    for (let i = 0, len = v.length; i < len; i += 3) {
      part.push(v.substring(last - 3, last));
      last = last - 3;
    }
    return part.reverse().join(".");
    // menggunakan regex
    // return value.replace(/\D*/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <CostumTextField
      Mobile={Mobile}
      value={Value ? ccNumberFormat(Value) : ""}
      onChange={(e) => {
        setValue(e.target.value.replace(/[^\d\,]/g, ""));
        handleChange(parseFloat(e.target.value.replace(/[^\d\,]/g, "")));
        // handleChange(ccNumberFormat(e.target.value));
      }}
      error={ErrorValue}
      disabled={disable}
      type="text"
      name={name}
      label={label}
      // defaultValue={Value == 0 ? null : Value}
      InputProps={
        (ErrorValue && {
          startAdornment: (
            <InputAdornment position="start">
              {Mobile ? <Body3>Rp.</Body3> : <Body1>Rp.</Body1>}
            </InputAdornment>
          ),
          endAdornment: (
            <div style={{ cursor: "pointer" }} onClick={removeError}>
              <InputAdornment position="end">
                <Clear />
              </InputAdornment>
            </div>
          ),
        }) || {
          startAdornment: (
            <InputAdornment position="start">
              {Mobile ? <Body3>Rp.</Body3> : <Body1>Rp.</Body1>}
            </InputAdornment>
          ),
        }
      }
      helperText={
        <div
          className="d-flex"
          style={{ alignItems: "flex-start", margin: "0 -13px" }}
        >
          {ErrorValue ? (
            <>
              <Error
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 4,
                }}
              />
              <div>
                {Mobile ? (
                  <Small>{helperText}</Small>
                ) : (
                  <Body3>{helperText}</Body3>
                )}
              </div>
            </>
          ) : Mobile ? (
            <Small>{helperText}</Small>
          ) : (
            <Body3>{helperText}</Body3>
          )}
        </div>
      }
      size="small"
      fullWidth={fullWidth}
    />
  );
}

export default InputPrefixRp;
