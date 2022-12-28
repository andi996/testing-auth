import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../../themes";
import { Body1, Body2, Body3 } from "../../Typography";
import useMediaQuery from "../../../../utils/useMediaQuery";

function RadioButton(props) {
  const {
    disable,
    options,
    variant,
    defaultValue,
    onChange,
    direction,
    skeleton,
    gap,
    customStyle,
    type,
    reset,
  } = props;

  const isMobile = useMediaQuery("(max-width: 640px)");

  const [Cheked, setCheked] = useState([]);

  useEffect(() => {
    if (reset) {
      let newChecked = [];
      options.forEach((item, index) => {
        newChecked[index] = false;
      });

      setCheked(newChecked);
    }
  }, [reset]);

  useEffect(() => {
    // for (let index = 0; index < options.length; index++) {
    // setCheked((oldArray) => [...oldArray, false]);
    defaultValue && setCheked(defaultValue);
    // }
  }, [defaultValue]);

  function handleChange(e, idx) {
    let newCheked = [...Cheked];
    if (e.target.checked) {
      for (let index = 0; index < options.length; index++) {
        if (idx === index) {
          newCheked[index] = true;
        } else {
          newCheked[index] = false;
        }
      }
      setCheked(newCheked);
    }
  }

  return (
    <>
      <style jsx>
        {`
          .radio {
            padding-left: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .label {
              // text-decoration: underline;
            }
          }
        `}
      </style>
      <FormControl
        disabled={disable}
        sx={({ width: isMobile ? `100%` : `fit-content` }, customStyle)}
      >
        <RadioGroup
          row={direction === "row" ? true : false}
          defaultValue={defaultValue}
          onChange={onChange}
          style={{ gap: gap || `8px` }}
        >
          {options.map((el, idx) => (
            <div className="radio" key={idx}>
              <FormControlLabel
                onChange={(e) => handleChange(e, idx)}
                checked={Cheked[idx]}
                value={el.value}
                control={
                  skeleton ? (
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      height="18px"
                      width="18px"
                      sx={{ margin: "8px" }}
                    />
                  ) : (
                    <Radio
                      style={{
                        color: disable
                          ? Colors.neutral.very_light_grey
                          : Cheked[idx]
                          ? Colors.primary.mid_blue
                          : Colors.neutral.brown_light_grey,
                        padding: "4px",
                        width: `24px`,
                        height: `24px`,
                        marginRight: `4px`,
                      }}
                    />
                  )
                }
                label={
                  variant && variant !== "none" ? (
                    <div className={el.url && `label`}>
                      {type === "mobile" ? (
                        <Body3
                          style={{
                            color:
                              Cheked[idx] && !disable
                                ? Colors.primary.mid_blue
                                : Colors.neutral.brown_grey,
                            minWidth: 0,
                            maxWidth: el.endAdornment ? 60 : `100%`,
                            whiteSpace: el.endAdornment && "nowrap",
                            overflow: el.endAdornment && "hidden",
                            textOverflow: el.endAdornment && "ellipsis",
                          }}
                          onClick={() =>
                            el.url && window.open(el.url, "_blank")
                          }
                        >
                          {skeleton ? <Skeleton animation="wave" /> : el.label}
                        </Body3>
                      ) : (
                        <Body1
                          style={{
                            color:
                              Cheked[idx] && !disable
                                ? Colors.primary.mid_blue
                                : Colors.neutral.brown_grey,
                            minWidth: 45,
                            maxWidth: el.endAdornment ? 180 : `100%`,
                            whiteSpace: el.endAdornment && "nowrap",
                            overflow: el.endAdornment && "hidden",
                            textOverflow: el.endAdornment && "ellipsis",
                          }}
                          onClick={() =>
                            el.url && window.open(el.url, "_blank")
                          }
                        >
                          {skeleton ? <Skeleton animation="wave" /> : el.label}
                        </Body1>
                      )}
                    </div>
                  ) : (
                    ""
                  )
                }
                labelPlacement={variant === "left" ? "end" : "start"}
              />

              <div>{el.endAdornment && el.endAdornment}</div>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default RadioButton;
