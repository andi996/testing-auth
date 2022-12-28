import React, { useRef, useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import css from "styled-jsx/css";
import { Colors, Elevation, Radius } from "../../../themes";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import { Body2 } from "../../Atom/Typography";

const scrollBar = css`
  ::-webkit-scrollbar {
    width: 0;
  }
`;

export default function TimePicker({ onClick, handleTime }) {
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef();
  useOutsideAlerter(ref, setDropdown);

  const handleClick = (load) => {
    const value = {
      selectedHour: hours[selectedHour],
      selectedMinute: minutes[selectedMinute],
    };

    if (load.type === "hour") {
      setSelectedHour(load.value);
      value.selectedHour = hours[load.value];
    } else {
      setSelectedMinute(load.value);
      value.selectedMinute = minutes[load.value];
    }
    // onClick(value);
    handleTime &&
      handleTime(`${hours[selectedHour]}:${minutes[selectedMinute]}`);
  };

  return (
    <Box position="relative" width="fit-content">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        width="fit-content !important"
      >
        <TextField
          id="outlined-basic"
          value={`${hours[selectedHour]}:${minutes[selectedMinute]}`}
          onClick={() => setDropdown(true)}
          label="Waktu"
          variant="outlined"
          size="small"
          sx={{
            maxWidth: 200,
            "& .MuiOutlinedInput-root": {
              fontFamily: "MuseoSans",
              color: "#4C4C4C",
            },
          }}
          InputProps={{
            endAdornment: (
              <ArrowForwardIosIcon
                style={{
                  fontSize: 18,
                  color: Colors.neutral.brown_grey,
                  transform: dropdown ? `rotate(-90deg)` : `rotate(90deg)`,
                  cursor: "pointer",
                }}
              />
            ),
          }}
        />
      </Box>

      <Box
        ref={ref}
        position="absolute"
        right={0}
        marginTop="5px"
        display={dropdown ? "block" : "none"}
        pb="10px"
      >
        <Box
          display={dropdown ? "flex" : "none"}
          justifyContent="space-between"
          width="156px"
          height="214px"
          padding="16px 26px 6px 26px"
          boxShadow={Elevation.card}
          borderRadius={Radius.medium}
          zIndex={10}
        >
          <div
            style={{
              overflow: "auto",
              width: "fit-content",
              maxHeight: "100%",
            }}
          >
            <style jsx>{scrollBar}</style>
            {hours.map((hour, index) => {
              return (
                <Button
                  key={index}
                  id="btn-hour"
                  style={{
                    display: "block",
                    minWidth: 0,
                    width: 36,
                    padding: "8px 0",
                    backgroundColor:
                      index === selectedHour
                        ? Colors.primary.mid_blue
                        : "transparent",
                    color:
                      index === selectedHour
                        ? "white"
                        : index < selectedHour
                        ? Colors.neutral.light_grey
                        : Colors.neutral.brown_light_grey,
                    borderRadius: Radius.circle,
                    marginBottom: 5,
                    transition: "all 200ms ease",
                  }}
                  onMouseDown={() =>
                    handleClick({ type: "hour", value: index })
                  }
                >
                  <Body2>{hour}</Body2>
                </Button>
              );
            })}
          </div>

          <div
            style={{
              overflow: "auto",
              width: "fit-content",
              maxHeight: "100%",
            }}
          >
            <style jsx>{scrollBar}</style>
            {minutes.map((minute, index) => {
              return (
                <Button
                  key={index}
                  style={{
                    display: "block",
                    minWidth: 0,
                    width: 36,
                    padding: "8px 0",
                    backgroundColor:
                      index === selectedMinute
                        ? Colors.primary.mid_blue
                        : "transparent",
                    color:
                      index === selectedMinute
                        ? "white"
                        : index < selectedMinute
                        ? Colors.neutral.light_grey
                        : Colors.neutral.brown_light_grey,
                    borderRadius: Radius.circle,
                    marginBottom: 5,
                    transition: "all 200ms ease",
                  }}
                  onMouseDown={() =>
                    handleClick({ type: "minute", value: index })
                  }
                >
                  <Body2>{minute}</Body2>
                </Button>
              );
            })}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
