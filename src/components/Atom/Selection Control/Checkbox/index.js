import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { Colors } from "../../../../themes";
import { isMobile } from "../../../../utils/useMediaQuery";
import { Body1, Body2 } from "../../Typography";

function CheckboxButton(props) {
  const {
    defaultValue,
    disable,
    options,
    variant,
    onChange,
    direction,
    skeleton,
    col,
    customStyle,
  } = props;
  //   console.log(options);
  const Mobile = isMobile();
  const [Cheked, setCheked] = useState([]);

  // useEffect(() => {
  //   defaultValue && setCheked(defaultValue);
  // }, []);

  useEffect(() => {
    for (let index = 0; index < options.length; index++) {
      setCheked((oldArray) => [
        ...oldArray,
        defaultValue ? defaultValue[index] : false,
      ]);
    }
  }, []);

  function handleChange(e, idx) {
    let newCheked = [...Cheked];

    if (e.target.checked) {
      newCheked[idx] = true;
    } else {
      newCheked[idx] = false;
    }
    setCheked(newCheked);
  }

  return (
    <FormControl disabled={disable} style={{ padding: 8, ...customStyle }}>
      <FormGroup onChange={onChange} row={direction === "row"}>
        {col ? (
          <Row>
            {Cheked.length > 0 &&
              options.map((el, idx) => (
                <Col lg={6} md={6} sm={6} xs={3} key={idx}>
                  <FormControlLabel
                    onChange={(e) => handleChange(e, idx)}
                    checked={Cheked[idx]}
                    value={el.value}
                    control={
                      skeleton ? (
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height="18px"
                          width="18px"
                          sx={{ margin: "8px" }}
                        />
                      ) : (
                        <Checkbox
                          style={{
                            color: disable
                              ? Colors.neutral.very_light_grey
                              : Cheked[idx]
                              ? Colors.primary.mid_blue
                              : Colors.neutral.brown_light_grey,
                            padding: "4px",
                          }}
                        />
                      )
                    }
                    label={
                      variant && variant !== "none" ? (
                        Mobile ? (
                          <Body2
                            style={{
                              color:
                                Cheked[idx] && !disable
                                  ? Colors.primary.mid_blue
                                  : Colors.neutral.brown_grey,
                              minWidth: 45,
                            }}
                          >
                            {skeleton ? (
                              <Skeleton animation="wave" />
                            ) : (
                              el.label
                            )}
                          </Body2>
                        ) : (
                          <Body1
                            style={{
                              color:
                                Cheked[idx] && !disable
                                  ? Colors.primary.mid_blue
                                  : Colors.neutral.brown_grey,
                              minWidth: 45,
                            }}
                          >
                            {skeleton ? (
                              <Skeleton animation="wave" />
                            ) : (
                              el.label
                            )}
                          </Body1>
                        )
                      ) : (
                        ""
                      )
                    }
                    labelPlacement={variant === "left" ? "end" : "start"}
                  />
                </Col>
              ))}
          </Row>
        ) : (
          Cheked.length > 0 &&
          options.map((el, idx) => (
            <FormControlLabel
              onChange={(e) => handleChange(e, idx)}
              checked={Cheked[idx]}
              value={el.value}
              key={idx}
              control={
                skeleton ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height="18px"
                    width="18px"
                    sx={{ margin: "8px" }}
                  />
                ) : (
                  <Checkbox
                    style={{
                      color: disable
                        ? Colors.neutral.very_light_grey
                        : Cheked[idx]
                        ? Colors.primary.mid_blue
                        : Colors.neutral.brown_light_grey,
                      padding: "4px",
                      ...customStyle?.checkbox,
                    }}
                  />
                )
              }
              label={
                variant && variant !== "none" ? (
                  Mobile ? (
                    <Body2
                      style={{
                        color:
                          Cheked[idx] && !disable
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey,
                        minWidth: 45,
                      }}
                    >
                      {skeleton ? <Skeleton animation="wave" /> : el.label}
                    </Body2>
                  ) : (
                    <Body1
                      style={{
                        color:
                          Cheked[idx] && !disable
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey,
                        minWidth: 45,
                      }}
                    >
                      {skeleton ? <Skeleton animation="wave" /> : el.label}
                    </Body1>
                  )
                ) : (
                  ""
                )
              }
              labelPlacement={variant === "left" ? "end" : "start"}
            />
          ))
        )}
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxButton;
