import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Colors, Radius } from "../../../themes";
import { Label, Body3, Heading5, Heading6 } from "../Typography";
import useMediaQuery from "../../../utils/useMediaQuery";

export default function ProfileMatch(props) {
  const { variant = `default`, value = 0, skeleton } = props;
  const [State, setState] = useState(``);
  const isTablet = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (value < 60) setState(`low match`);
    if (value >= 60 && value < 80) setState(`medium match`);
    if (value >= 80 && value <= 100) setState(`high match`);
  }, [value]);

  const image = {
    "low match": "/images/Principle/Background/Profile Match.png",
    "medium match": "/images/Principle/Background/Profile Match Medium.png",
    "high match": "/images/Principle/Background/Profile Match High.png",
  };
  const image2 = {
    "low match": "/images/Principle/Background/Profile Match 2.png",
    "medium match": "/images/Principle/Background/Profile Match Medium 2.png",
    "high match": "/images/Principle/Background/Profile Match High 2.png",
  };
  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={variant === "micro" ? `24px` : `32px`}
      width={
        variant === "micro" ? "72px" : variant === "short" ? "88px" : "218px"
      }
      sx={{ borderRadius: Radius.small }}
    />
  ) : (
    <>
      <style jsx>{`
        .container {
          // margin: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 ${variant === "micro" ? "4px" : "8px"};
          min-width: ${variant === "micro"
            ? "72px"
            : variant === "short"
            ? "88px"
            : "fit-content"};
          max-width: fit-content;
          height: ${variant === "micro" ? `24px` : `32px`};
          background: ${(value < 60 && Colors.secondary.red_light) ||
          (value >= 60 && value < 80 && Colors.secondary.orange_light) ||
          (value >= 80 && value <= 100 && Colors.secondary.green_light)};
          border-radius: ${Radius.small};
          position: relative;
          box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
            0px 2px 4px rgba(29, 98, 174, 0.12);
        }
        .gradient {
          position: absolute;
          // left: ${variant === "short" ? "34px" : "133px"};
          right: 0;
          top: 0;
          object-fit: cover;
          object-position: 10% 0;
          width: ${variant === "micro"
            ? "48px"
            : variant === "short"
            ? "54px"
            : "85px"};
          height: 32px;
        }
        .gradient-2 {
          position: absolute;
          // left: ${variant === "micro"
            ? "15px"
            : variant === "short"
            ? "58px"
            : "156px"};
          right: 0;
          top: 0;
          object-fit: cover;
          object-position: 10% 0;
          width: ${variant === "micro"
            ? "20px"
            : variant === "short"
            ? "30px"
            : "62px"};
          height: 32px;
        }
      `}</style>
      <div className="container">
        <img alt="" src={image[State]} className="gradient" />
        <img alt="" src={image2[State]} className="gradient-2" />

        {variant === "micro" ? (
          <Label
            value={`${value}% cocok`}
            color={
              (value < 60 && Colors.secondary.red) ||
              (value >= 60 && value < 80 && Colors.secondary.orange) ||
              (value >= 80 && value <= 100 && Colors.secondary.highlight_green)
            }
          />
        ) : (
          <Heading5
            style={{
              color:
                (value < 60 && Colors.secondary.red) ||
                (value >= 60 && value < 80 && Colors.secondary.orange) ||
                (value >= 80 &&
                  value <= 100 &&
                  Colors.secondary.highlight_green),
              zIndex: 3,
            }}
          >
            {value}% cocok
            {variant === "default" && " dengan profil Anda"}
          </Heading5>
        )}
      </div>
    </>
  );
}
