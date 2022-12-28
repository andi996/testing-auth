// import styled from "@emotion/styled/base";
// import { Slider } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Colors, Elevation } from "../../../../themes";
import classNames from "classnames";
import InputPrefixRp from "../../Input Field/Prefix/PrefixRp";
import { isMobile } from "../../../../utils/useMediaQuery";

// const CostumSlider = styled(Slider)({
//   color: Colors.neutral.light_grey,
//   height: 5,
//   "& .MuiSlider-track": {
//     border: "none",
//     backgroundColor: Colors.primary.mid_blue,
//   },
//   "& .MuiSlider-thumb": {
//     height: 24,
//     width: 24,
//     backgroundColor: "#fff",
//     "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
//       boxShadow: "inherit",
//     },
//     "&:before": {
//       display: "none",
//     },
//   },
// });
export default function SliderComponent(props) {
  const { variant, min, max, onChange } = props;
  // Convert to percentage
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const [index, setIndex] = useState(0);
  const Mobile = isMobile();

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <style jsx>
        {`
          .container {
            height: ${Mobile ? "64px" : "50vh"};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .slider {
            position: relative;
            width: 100%;
          }

          .slider__track,
          .slider__range,
          .slider__left-value,
          .slider__right-value {
            position: absolute;
          }

          .slider__track,
          .slider__range {
            border-radius: 3px;
            height: 5px;
            position: absolute;
          }

          .slider__track {
            background-color: ${Colors.neutral.light_grey};
            width: 100%;
            z-index: 1;
          }

          .slider__range {
            background-color: ${Colors.primary.mid_blue};
            z-index: 2;
          }

          .slider__left-value,
          .slider__right-value {
            color: #dee2e6;
            font-size: 12px;
            margin-top: 20px;
          }

          .slider__left-value {
            left: 6px;
          }

          .slider__right-value {
            right: -4px;
          }

          /* Removing the default appearance */
          .thumb,
          .thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }

          .thumb {
            pointer-events: none;
            position: absolute;
            height: 0;
            width: 90%;
            outline: none;
          }

          .thumb--zindex-3 {
            z-index: 3;
          }

          .thumb--zindex-4 {
            z-index: 4;
          }

          /* For Chrome browsers */
          .thumb::-webkit-slider-thumb {
            background-color: white;
            border: 1px solid ${Colors.primary.mid_blue};
            border-radius: 50%;
            box-shadow: ${Elevation.card};
            cursor: pointer;
            height: 24px;
            width: 24px;
            margin-top: 4px;
            pointer-events: all;
            position: relative;
          }

          /* For Firefox browsers */
          .thumb::-moz-range-thumb {
            background-color: white;
            border: none;
            border-radius: 50%;
            border: 1px solid ${Colors.primary.mid_blue};
            box-shadow: ${Elevation.card};
            cursor: pointer;
            height: 24px;
            width: 24px;
            margin-top: 4px;
            pointer-events: all;
            position: relative;
          }
        `}
      </style>
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classNames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          {/* <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div> */}
        </div>
      </div>
      <div
        className="d-flex-fullwidth"
        style={{ marginTop: 16, marginBottom: Mobile ? 64 : 24 }}
      >
        <div onClick={() => setIndex(0)}>
          <InputPrefixRp
            label="Gaji Terkecil"
            handleChange={(val) => setMinVal(val)}
            ref={minValRef}
            defaultValue={minVal}
            index={index}
          />
        </div>{" "}
        <span style={{ margin: "0 12px", fontWeight: `bold` }}>-</span>
        <div onClick={() => setIndex(1)}>
          <InputPrefixRp
            label="Gaji Terbesar"
            handleChange={(val) => setMaxVal(val)}
            defaultValue={maxVal}
            ref={maxValRef}
            index={index}
          />
        </div>
      </div>
    </>
  );
}

SliderComponent.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
