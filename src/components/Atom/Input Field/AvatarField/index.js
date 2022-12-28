import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors, Radius } from "../../../../themes";
import RectangleButton from "../../Button/RectangleButton";
import Loader from "../../Loader";
import { Small, Label, Body3 } from "../../Typography";
import { isMobile } from "../../../../utils/useMediaQuery";

export default function InputAvatarField(props) {
  const { skeleton, error, disable, value, loader, helperText, onChange } =
    props;
  const Mobile = isMobile();
  return (
    <>
      <style jsx>
        {`
          input[type="file"] {
            visibility: hidden;
            width: 0;
            height: 0;
          }
          .container {
            width: ${Mobile ? "100px" : "160px"};
            // height: ${Mobile ? "100px" : "160px"};
            position: relative;
            border-radius: ${Radius.circle};
          }
          .empty {
            width: ${Mobile ? "100px" : "160px"};
            height: ${Mobile ? "100px" : "160px"};
            position: absolute;
            top: 0;
            bottom: 0;
            background-color: ${Colors.neutral.greyish_brown};
            opacity: 0.9;
            z-index: 2;
            border-radius: ${Radius.circle};
            cursor: pointer;
          }
          .placeholder {
            border-radius: ${Radius.circle};
            object-fit: cover;
            width: ${Mobile ? "100px" : "160px"};
            height: ${Mobile ? "100px" : "160px"};
            position: absolute;
            top: 0;
            bottom: 0;
            cursor: pointer;
          }
          .indicator {
            display: flex;
            width: ${Mobile ? "100px" : "160px"};
            height: ${Mobile ? "100px" : "160px"};
            justify-content: center;
            align-items: center;
            padding: ${Mobile ? "10px" : "16px"};
          }
        `}
      </style>
      {skeleton ? (
        <Skeleton
          variant="circular"
          animation="wave"
          height={Mobile ? "100px" : "160px"}
          width={Mobile ? "100px" : "160px"}
        />
      ) : (
        <>
          <div className="container">
            <label htmlFor="file-input">
              {value ? (
                <img alt="" src={value} className="placeholder" />
              ) : (
                <div>
                  <span className="empty"></span>
                  <img
                    alt=""
                    src="/images/Principle/Logo/Karir/Avatar/State=Avatar.png"
                    className="placeholder"
                  />
                </div>
              )}
              <div className="indicator">
                {!value &&
                  (loader ? (
                    <Loader variant="white" zIndex={3} />
                  ) : (
                    <RectangleButton
                      fullWidth
                      size={Mobile ? "micro" : "medium"}
                      variant="ghost"
                      state="alternate"
                      zIndex={3}
                      label
                      customStyle={{ margin: 0, padding: 0 }}
                    >
                      <Label
                        size={Mobile ? "micro" : "medium"}
                        value="Upload Foto*"
                      />
                    </RectangleButton>
                  ))}
              </div>
            </label>

            {error && (
              <>
                {Mobile ? (
                  <Small
                    align="center"
                    color={Colors.secondary.red}
                    width={Mobile ? "100px" : "160px"}
                    mt="8px"
                  >
                    {helperText || " Maksimum 2mb"}
                  </Small>
                ) : (
                  <Body3
                    align="center"
                    color={Colors.secondary.red}
                    width={Mobile ? "100px" : "160px"}
                    mt="8px"
                  >
                    {helperText || " Maksimum 2mb"}
                  </Body3>
                )}
              </>
            )}
          </div>

          <input
            id="file-input"
            type="file"
            disabled={disable || loader}
            //   value={value}
            onChange={(e) => onChange(e.target.files[0])}
            accept="image/png, image/jpeg"
          />
        </>
      )}
    </>
  );
}
