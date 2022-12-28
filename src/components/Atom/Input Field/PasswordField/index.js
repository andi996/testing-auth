import React, { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment, styled } from "@mui/material";
import { Colors } from "../../../../themes";
import { Error, Clear, VisibilityOff, Visibility } from "@mui/icons-material";
import ProgressBar from "@ramonak/react-progress-bar";
import { Body3 } from "../../Typography";
import { isMobile } from "../../../../utils/useMediaQuery";

const CostumTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: Colors.primary.mid_blue,
  },
  "& label": {
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: `22px`,
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    height: 40,
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: `22px`,
    // minWidth: 382,
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
});

function InputPasswordField(props) {
  const {
    disable,
    label,
    helperText,
    passwordStrength,
    fullWidth,
    name,
    error,
    defaultValue,
    handleChange,
    errorIcon = true,
  } = props;
  const Mobile = isMobile();
  const [Value, setValue] = useState(defaultValue);
  const [ErrorValue, setErrorValue] = useState(error);
  const [ShowPassword, setShowPassword] = useState(false);
  const [PasswordLevel, setPasswordLevel] = useState(0);
  const strongPassword = new RegExp(
    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*?<>,._=+(){};:'])(?=.{8,})"
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );
  const mediumPassword = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[`~!@#$%^&*?<>,._=+(){};:'])))(?=.{8,})"
  );
  const lowPasword = new RegExp(
    "^((?=.*[a-z])|(?=.*[0-9])|(?=.*[A-Z]))(?=.{8,})"
  );

  useEffect(() => {
    if (props.handleChange) {
      props.handleChange(Value);
    }
  }, []);

  useEffect(() => {
    if (strongPassword.test(Value)) {
      setPasswordLevel(3);
    } else if (mediumPassword.test(Value)) {
      setPasswordLevel(2);
    } else if (lowPasword.test(Value)) {
      setPasswordLevel(1);
    } else {
      setPasswordLevel(0);
    }
  });

  useEffect(() => {
    setErrorValue(error);
  }, [error]);

  return (
    <CostumTextField
      type={ShowPassword ? "text" : "password"}
      error={ErrorValue}
      disabled={disable}
      name={name}
      label={label}
      value={Value}
      onChange={(e) => {
        setValue(e.target.value);
        handleChange(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!ShowPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {ShowPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      FormHelperTextProps={{ sx: { mx: 0 } }}
      helperText={
        (helperText || passwordStrength) && (
          <div
            className="d-flex-fullwidth"
            style={{ alignItems: `flex-start` }}
          >
            {helperText && (
              <div className="d-flex" style={{ width: `fit-content` }}>
                {errorIcon && (
                  <Error
                    style={{
                      width: Mobile ? 14 : 16,
                      height: Mobile ? 14 : 16,
                      marginRight: 4,
                    }}
                  />
                )}
                <div
                  style={{ maxWidth: Mobile && passwordStrength && `197px` }}
                >
                  <Body3>{helperText}</Body3>
                </div>
              </div>
            )}

            {passwordStrength && (
              <div className="d-flex" style={{ width: `fit-content` }}>
                <span>
                  {(PasswordLevel === 3 && "Strong") ||
                    (PasswordLevel === 2 && "Average") ||
                    (PasswordLevel === 1 && "Weak") ||
                    "Too Short"}
                </span>
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: 5,
                    marginBottom: 2,
                  }}
                >
                  <ProgressBar
                    maxCompleted={3}
                    completed={PasswordLevel}
                    height="4px"
                    width="64px"
                    baseBgColor={Colors.neutral.light_grey}
                    bgColor={
                      (PasswordLevel === 3 &&
                        Colors.secondary.highlight_green) ||
                      (PasswordLevel === 2 && Colors.secondary.orange_yellow) ||
                      (PasswordLevel === 1 && Colors.secondary.red)
                    }
                    isLabelVisible={false}
                  />
                </div>
              </div>
            )}
          </div>
        )
      }
      size="small"
      fullWidth={fullWidth}
    >
      {defaultValue}
    </CostumTextField>
  );
}

export default InputPasswordField;
