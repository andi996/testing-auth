import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { Colors, Radius, Elevation } from "../../../../themes";
import CloseIcon from "@mui/icons-material/Close";
import { Body2 } from "../../Typography";
import { isMobile } from "../../../../utils/useMediaQuery";

function Pill(props) {
  const { variant, children, onClick, skeleton } = props;
  const [Show, setShow] = useState(true);
  const Mobile = isMobile();

  return (
    Show && (
      <>
        <style jsx>
          {`
            .container {
              background-color: #ffffff;
              min-width: ${(variant === "default" && skeleton && "160px") ||
              (variant === "close" && skeleton && "180px")};
              width: ${Mobile ? "100%" : "fit-content"};
              height: 48px;
              border-radius: ${Radius.medium};
              padding: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: ${!skeleton && Elevation.card};
              cursor: pointer;
              margin: 4px;
            }
            .label {
              display: flex;
              align-items: center;
            }
            img {
              width: 32px;
              height: 32px;
              margin-right: 8px;
            }
          `}
        </style>

        <div className="container" onClick={onClick}>
          <div className="label">
            {skeleton ? (
              <>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height="32px"
                  width="32px"
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height="12px"
                  width="100px"
                  sx={{ borderRadius: Radius.medium, marginLeft: "8px" }}
                />
              </>
            ) : (
              <>
                <img
                  alt=""
                  src="/images/Principle/Logo/Karir/Avatar/Karir=Blue.png"
                  width={32}
                  height={32}
                />
                <Body2>{children}</Body2>
              </>
            )}
          </div>

          {skeleton
            ? variant === "close" && (
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height="16px"
                  width="16px"
                />
              )
            : variant === "close" && (
                <div
                  onClick={() => setShow(false)}
                  style={{ display: `flex`, alignItems: `center` }}
                >
                  <CloseIcon
                    style={{
                      fill: Colors.neutral.brown_grey,
                      cursor: `pointer`,
                      marginLeft: 4,
                    }}
                  />
                </div>
              )}
        </div>
      </>
    )
  );
}

export default Pill;
