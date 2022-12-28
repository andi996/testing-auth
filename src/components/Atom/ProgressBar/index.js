import React, { useState, useEffect } from "react";
import { Colors, Radius } from "../../../themes";
import { Body2, Body3 } from "../Typography";

export default function ProgressBar(props) {
  const { type = "dekstop", variant, state = 0 } = props;
  const bars = variant === "3 bar" ? 3 : 2;

  const ShowBars = ({ index }) => {
    if (index < state) {
      return (
        <span
          style={{
            maxWidth: variant === "3 bar" ? "261.33px" : "396px",
            height: type === "dekstop" ? 16 : 8,
            background: Colors.secondary.highlight_green,
            borderRadius: Radius.medium,
            flex: `none`,
            flexGrow: 1,
          }}
        />
      );
    } else {
      return (
        <span
          style={{
            maxWidth: variant === "3 bar" ? "261.33px" : "396px",
            height: type === "dekstop" ? 16 : 8,
            background: Colors.neutral.light_grey,
            borderRadius: Radius.medium,
            flex: `none`,
            flexGrow: 1,
          }}
        />
      );
    }
  };
  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            gap: ${type === `mobile` ? `4px` : `8px`};
            width: 100%;
            max-width: 830px;
            height: fit-content;
            position: relative;
          }
          .text-right {
            // position: absolute;
            // bottom: 0;
            // right: 10px;
            width: fit-content;
            margin-top: 4px;
            margin-right: 4px;
            margin-left: auto;
            color: ${Colors.neutral.brown_grey};
          }
        `}
      </style>
      <div className="container">
        <ShowBars index={0} />
        <ShowBars index={1} />
        {variant === "3 bar" && <ShowBars index={2} />}
      </div>
      <div className="text-right">
        {type === "dekstop" && (
          <Body2>
            {state}/{bars}
          </Body2>
        )}

        {type === "mobile" && (
          <Body3>
            {state}/{bars}
          </Body3>
        )}
      </div>
    </>
  );
}
