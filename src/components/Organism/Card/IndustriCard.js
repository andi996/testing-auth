import { AccessTimeOutlined, SellOutlined } from "@mui/icons-material";
import React from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import { Body3, Heading4, Heading5, Heading6 } from "../../Atom/Typography";
import { Skeleton } from "@mui/material";
import {
  isMobile,
  isTablet,
  isSmallScreen,
} from "../../../utils/useMediaQuery";

export default function IndustriCard(props) {
  const { title, count, onClick, skeleton } = props;
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();

  return (
    <>
      <style jsx>
        {`
          .container {
            width: 180px;
            height: ${Mobile ? "58px" : "64px"};
            max-height: ${Mobile ? "58px" : "64px"};
            padding: 8px 16px;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: ${Radius.medium};
            cursor: pointer;
            background: white;
            border: 1px solid ${Colors.neutral.light_grey};
            :hover {
              background: ${Colors.secondary.green_light} !important;
            }
          }
          .content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // gap: 8px;
            // word-wrap: break-word;
          }
        `}
      </style>
      <div className="container" onClick={onClick}>
        <div className="content">
          <div>
            {skeleton ? (
              <Skeleton width="100%" height={20} animation="wave" />
            ) : Mobile ? (
              <Heading5
                className="text-ellipsis"
                color={Colors.neutral.greyish_brown}
                zIndex={3}
              >
                {title}
              </Heading5>
            ) : (
              <Heading4
                className="text-ellipsis"
                color={Colors.neutral.greyish_brown}
                zIndex={3}
              >
                {title}
              </Heading4>
            )}
          </div>

          <div>
            {skeleton ? (
              <Skeleton width="50%" height={20} animation="wave" />
            ) : Mobile ? (
              <Heading6 color={Colors.secondary.highlight_green} zIndex={3}>
                {count} Perusahaan
              </Heading6>
            ) : (
              <Heading5 color={Colors.secondary.highlight_green} zIndex={3}>
                {count} Perusahaan
              </Heading5>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
