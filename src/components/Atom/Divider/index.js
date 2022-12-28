import React from "react";
import { Colors } from "../../../themes";
import { Body3 } from "../Typography";

export default function Divider({
  size = "1px",
  variant = "default",
  state,
  costumStyle,
  children,
}) {
  return (
    <>
      <style jsx>
        {`
          .label {
            position: absolute;
            width: fit-content;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            z-index: 2;
          }
        `}
      </style>
      <div
        style={{
          height: size,
          minHeight: size,
          background:
            (variant == "default" && Colors.neutral.light_grey) ||
            (variant == "light" && Colors.neutral.very_light_grey),
          border: "none",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          width: "100%",
          margin: "8px 0",
          ...costumStyle,
        }}
      >
        <div className="label">
          <Body3
            bgcolor={
              (state == "white" && "white") ||
              (state == "blue" && Colors.secondary.clear_blue_light)
            }
          >
            {children}
          </Body3>
        </div>
      </div>
    </>
  );
}
