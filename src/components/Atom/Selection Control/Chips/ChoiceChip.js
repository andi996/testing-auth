import { Done } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import { Colors, Radius } from "../../../../themes";
import { isMobile } from "../../../../utils/useMediaQuery";
import { Body2, Body3 } from "../../Typography";

function ChoiceChip(props) {
  const {
    disable,
    size = "medium",
    icon,
    children,
    name,
    id,
    onClick,
    value,
    checked,
    skeleton,
  } = props;
  const Mobile = isMobile();

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={
        (Mobile && "26px") ||
        (size === "medium" && "40px") ||
        (size === "small" && "32px")
      }
      width="100px"
      sx={{ borderRadius: Radius.large, margin: "4px" }}
    />
  ) : (
    <>
      <style jsx>
        {`
          * {
            box-sizing: border-box;
          }
          input[type="radio"]:checked + div {
            background-color: ${Colors.primary.very_light_blue};
            border: 1px solid ${Colors.primary.mid_blue};
            color: ${Colors.primary.mid_blue};
          }
          .container {
            display: inline-flex;
            position: relative;
            margin: 4px;
          }
          .label {
            transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            display: flex;
            align-items: center;
            width: 100%;
            height: ${(Mobile && "26px") ||
            (size === "medium" && "40px") ||
            (size === "small" && "32px")};
            padding: ${Mobile ? "4px 8px;" : "8px"};
            background-color: white;
            border-radius: ${Radius.large};
            color: ${Colors.neutral.brown_grey};
            border: ${disable
              ? `1px solid ${Colors.neutral.very_light_grey}`
              : `1px solid ${Colors.neutral.brown_grey}`};
          }
          .container:hover {
            .label {
              border: 1px solid ${Colors.primary.mid_blue};
              color: ${Colors.primary.mid_blue};
              svg {
                color: ${Colors.primary.mid_blue};
              }
            }
          }
          .disabled {
            pointer-events: none;
          }
        `}
      </style>
      <div className="container">
        <input
          checked={checked}
          type="radio"
          id={id}
          name={name}
          onClick={onClick}
          value={value}
          className={disable ? "disabled" : undefined}
          style={{
            position: "absolute",
            opacity: 0,
            cursor: "pointer",
            height:
              (Mobile && "26px") ||
              (size === "medium" && "40px") ||
              (size === "small" && "32px"),
            width: "100%",
          }}
        />
        <div className={disable ? "disabled label" : "label"} htmlFor={name}>
          {/* {icon} */}
          {icon && (
            <Done
              style={{ width: `16px`, height: `16px`, marginRight: `4px` }}
            />
          )}

          {Mobile ? <Body3>{children}</Body3> : <Body2>{children}</Body2>}
        </div>
      </div>
    </>
  );
}

export default ChoiceChip;
