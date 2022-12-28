import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  InputAdornment,
  Skeleton,
  styled,
  TextField,
} from "@mui/material";
import { Colors, Radius } from "../../../themes";
import {
  Clear,
  LocationOn,
  LocationOnOutlined,
  Search,
} from "@mui/icons-material";
import { Body1 } from "../../Atom/Typography";
import RectangleButton from "../../Atom/Button/RectangleButton";
import InputChip from "../../Atom/Selection Control/Chips/InputChip";

const CostumTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    // background: `white`,
    boxSizing: `border-box`,
    fontSize: 14,
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: `22px`,
    width: 466,
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
    borderRadius: `4px 0 0 4px`,
  },
});

const CostumTextField2 = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    // background: `white`,
    boxSizing: `border-box`,
    fontSize: 14,
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: `22px`,
    width: 204,
    color: Colors.neutral.greyish_brown,
    marginLeft: -1,
    marginRight: -8,
    "& fieldset": {
      borderColor: Colors.neutral.brown_light_grey,
    },
    "&:hover fieldset": {
      borderColor: Colors.neutral.brown_light_grey,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.primary.mid_blue,
    },
    borderRadius: 0,
  },
});

export default function SearchBarCompany(props) {
  const {
    disable,
    label,
    fullWidth,
    name,
    size = `small`,
    options,
    options2,
    skeleton,
    onButtonClick,
    onCloseChip,
    company,
    customStyle,
  } = props;
  const [Value, setValue] = useState(``);
  const [Value2, setValue2] = useState(``);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [Show, setShow] = useState(true);
  const Combo = useRef();
  const onBlur = () => {
    Combo.current.inputValue = Value;
  };
  const onBlur2 = () => {
    Combo.current.inputValue = Value2;
  };

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={
        (size === "large" && 64) ||
        (size === "medium" && 48) ||
        (size === "small" && 40)
      }
      width={690}
      sx={{ borderRadius: Radius.small }}
    />
  ) : (
    <div
      className="d-flex"
      style={{
        backgroundColor: "white",
        height:
          (size === `small` && `40px`) ||
          (size === `medium` && `48px`) ||
          (size === `large` && `64px`),
        borderRadius: `4px 8px 8px 4px`,
        width: "calc(100% - 60x)",
      }}
    >
      <Autocomplete
        ref={Combo}
        open={open}
        onOpen={() => {
          // only open when in focus and inputValue is not empty
          if (Value) {
            setOpen(true);
          }
        }}
        onClose={() => setOpen(false)}
        inputValue={Value}
        onInputChange={(_, newInputValue) => {
          setValue(newInputValue);
        }}
        onBlur={onBlur}
        clearOnBlur={false}
        disabled={disable}
        fullWidth={fullWidth}
        options={options}
        freeSolo
        renderInput={(params) => (
          <>
            <CostumTextField
              sx={{
                "& label": {
                  marginTop: `-10px`,
                },
                "& .MuiOutlinedInput-root": {
                  height:
                    (size === `small` && `40px`) ||
                    (size === `medium` && `48px`) ||
                    (size === `large` && `64px`),
                  "& input": {
                    marginLeft: Show ? `128px` : `28px`,
                    marginTop:
                      (size === `small` && `-8px`) ||
                      (size === `medium` && `-4px`) ||
                      (size === `large` && `4px`),
                  },
                },
              }}
              {...params}
              name={name}
              label={
                <div
                  className="d-flex"
                  style={{
                    marginTop:
                      (size === `medium` && `4px`) ||
                      (size === `large` && `12px`),
                  }}
                >
                  <Search style={{ color: Colors.neutral.brown_grey }} />

                  {/* {!Value && ( */}
                  <Body1 color={Colors.neutral.brown_light_grey} margin="4px">
                    {label}
                  </Body1>
                  {/* )} */}
                </div>
              }
              InputLabelProps={{ shrink: false }}
            />
            <div
              style={{
                position: `absolute`,
                top:
                  (size === `small` ? 16 : size === `medium` ? 20 : 28) ,
                  // ||(size === `medium` && `4px`) || (size === `large` && `12px`),
                left: 50,
              }}
            >
              <InputChip
                size="small"
                onClick={() => {
                  setShow(false);
                  onCloseChip();
                }}
              >
                {company}
              </InputChip>
            </div>
          </>
        )}
      />
      <Autocomplete
        ref={Combo}
        open={open2}
        onOpen={() => {
          // only open when in focus and inputValue is not empty
          if (Value2) {
            setOpen2(true);
          }
        }}
        onClose={() => setOpen2(false)}
        inputValue={Value2}
        onInputChange={(_, newInputValue) => {
          setValue2(newInputValue);
        }}
        onBlur={onBlur2}
        clearOnBlur={false}
        disabled={disable}
        fullWidth={fullWidth}
        options={options2}
        freeSolo
        renderInput={(params) => (
          <CostumTextField2
            sx={{
              "& label": {
                marginTop: `-10px`,
              },
              "& .MuiOutlinedInput-root": {
                height:
                  (size === `small` && `40px`) ||
                  (size === `medium` && `48px`) ||
                  (size === `large` && `64px`),
                "& input": {
                  marginLeft: `28px`,
                  marginTop:
                    (size === `small` && `-8px`) ||
                    (size === `medium` && `-4px`) ||
                    (size === `large` && `4px`),
                },
              },
            }}
            {...params}
            name={name}
            label={
              <div
                className="d-flex"
                style={{
                  marginTop:
                    (size === `medium` && `4px`) ||
                    (size === `large` && `12px`),
                }}
              >
                <LocationOnOutlined
                  style={{ color: Colors.neutral.brown_grey }}
                />
                {/* {!Value && ( */}
                <Body1 color={Colors.neutral.brown_light_grey} margin="4px">
                  {label}
                </Body1>
                {/* )} */}
              </div>
            }
            InputLabelProps={{ shrink: false }}
          />
        )}
      />
      <RectangleButton
        size={
          (size === `small` && `medium`) ||
          (size === `medium` && `large`) ||
          (size === `large` && `xtra large`)
        }
        onClick={onButtonClick}
        zIndex={2}
        customStyle={customStyle}
      >
        Cari
      </RectangleButton>
    </div>
  );
}
