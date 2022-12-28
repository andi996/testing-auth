import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  SwapVert,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import { Colors, Radius } from "../../../../themes";
import { isMobile } from "../../../../utils/useMediaQuery";
import { Body2, Body3 } from "../../Typography";

function ActionChip(props) {
  const {
    disable,
    size = "medium",
    icon,
    chevron,
    children,
    onClick,
    skeleton,
    isOpen,
    active,
  } = props;
  const Mobile = isMobile();

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={
        (size === "medium" && "40px") ||
        (size === "small" && "32px") ||
        (size === "mobile" && "26px")
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
            // margin: 4px 4px 4px 0;
          }
          .label {
            transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            // margin: 4px 4px 4px 0;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            width: auto;
            height: ${(Mobile && "26px") ||
            (size === "medium" && "40px") ||
            (size === "small" && "32px")};
            padding: ${Mobile ? "4px 8px;" : "12px"};
            background-color: white;
            border-radius: ${Radius.large};
            color: ${disable
              ? Colors.neutral.brown_light_grey
              : Colors.neutral.brown_grey};
            border: ${disable
              ? `1px solid ${Colors.neutral.very_light_grey}`
              : `1px solid ${Colors.neutral.brown_grey}`};
            :hover {
              border: 1px solid ${Colors.primary.mid_blue} !important;
              color: ${Colors.primary.mid_blue};
              svg {
                color: ${Colors.primary.mid_blue};
              }
            }
            :active {
              background-color: ${Colors.primary.very_light_blue};
              border: 1px solid ${Colors.primary.mid_blue};
              color: ${Colors.primary.mid_blue};
              svg {
                color: ${Colors.primary.mid_blue};
              }
            }
            &.active {
              background-color: ${Colors.primary.very_light_blue} !important;
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
      <div
        className={`${disable ? `disabled label` : `label`} ${
          active ? `active` : null
        }`}
        onClick={onClick}
      >
        {icon}
        {Mobile ? (
          <Body3 whiteSpace="nowrap">{children}</Body3>
        ) : (
          <Body2 whiteSpace="nowrap">{children}</Body2>
        )}

        {chevron ? isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown /> : null}
      </div>
    </>
  );
}

export default ActionChip;
