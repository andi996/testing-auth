import { Close, Done } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { Colors, Radius } from "../../../../themes";
import { isMobile } from "../../../../utils/useMediaQuery";
import { Body2, Body3 } from "../../Typography";

function InputChip(props) {
  const {
    disable,
    size = "medium",
    children,
    icon,
    skeleton,
    onClick,
    onClickChip,
  } = props;
  const [Show, setShow] = useState(true);
  const Mobile = isMobile();

  return (
    Show && (
      <>
        <style jsx>
          {`
            * {
              box-sizing: border-box;
            }
            .label {
              transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)
                  0ms,
                box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              margin: 4px;
              display: inline-flex;
              align-items: center;
              width: auto;
              height: ${(Mobile && "26px") ||
              (size === "medium" && "40px") ||
              (size === "small" && "32px")};
              padding: ${Mobile ? "4px 8px;" : "8px"};
              background-color: ${disable
                ? "white !important"
                : Colors.primary.very_light_blue};
              border-radius: ${Radius.large};
              color: ${disable
                ? Colors.neutral.brown_light_grey
                : Colors.primary.mid_blue};
              border: ${disable
                ? `1px solid ${Colors.neutral.very_light_grey}`
                : `1px solid ${Colors.primary.mid_blue}`};
              // :hover {
              //   border: 1px solid ${Colors.primary.mid_blue};
              //   color: ${Colors.primary.mid_blue};
              //   svg {
              //     color: ${Colors.primary.mid_blue};
              //   }
              // }
              // :active {
              //   background-color: ${Colors.primary.very_light_blue};
              //   border: 1px solid ${Colors.primary.mid_blue};
              //   color: ${Colors.primary.mid_blue};
              //   svg {
              //     color: ${Colors.primary.mid_blue};
              //   }
              // }
              svg {
                margin: 4px;
              }
            }
            .disabled {
              pointer-events: none;
            }
          `}
        </style>
        {skeleton ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={
              (Mobile && "26px") ||
              (size === "medium" && "40px") ||
              (size === "small" && "32px")
            }
            width="124px"
            sx={{ borderRadius: Radius.large, margin: "4px" }}
          />
        ) : (
          <div
            className={disable ? "disabled label" : "label"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              // setShow(false);
              onClickChip();
            }}
          >
            {/* {icon} */}
            {icon && (
              <Done
                style={{ width: `16px`, height: `16px`, marginRight: `4px` }}
              />
            )}
            {Mobile ? <Body3>{children}</Body3> : <Body2>{children}</Body2>}
            <div
              onClick={(e) => {
                // setShow(false);
                onClick();
                e.stopPropagation();
              }}
              style={{ display: `flex`, alignItems: `center` }}
            >
              <Close
                style={{
                  width: `20px`,
                  height: `20px`,
                  color: disable
                    ? Colors.neutral.light_grey
                    : Colors.neutral.brown_grey,
                  cursor: "pointer",
                  marginLeft: 4,
                }}
              />
            </div>
          </div>
        )}
      </>
    )
  );
}
export default InputChip;
