import { AccessTimeOutlined, Person } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";
import RectangleAvatar from "../../Atom/Avatar/Rectangle";
import {
  Body1,
  Body2,
  Body3,
  Heading4,
  Heading5,
  Heading6,
  Small,
} from "../../Atom/Typography";

export default function NotificationCard(props) {
  const {
    title,
    description,
    isRead,
    skeleton,
    timestamp,
    variant = `Job Alert (Rekomendasi)`,
    onClick,
  } = props;
  const Mobile = isMobile();

  return (
    <>
      <style jsx>
        {`
          .container {
            cursor: pointer;
            min-width: ${Mobile && "360px"};
            width: 100%;
            height: 124px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: ${!Mobile && Elevation.card};
            position: relative;
            border-radius: ${!Mobile && Radius.medium};
            padding: ${Mobile ? "16px" : "12px"};
            background: ${isRead ? `white` : Colors.primary.pale_gray};
            border-bottom: ${Mobile &&
            `1px solid ${Colors.neutral.very_light_grey}`};
            :hover {
              background: ${Colors.primary.very_light_blue} !important;
            }
            margin: ${Mobile ? "0px" : "8px 0px"};
          }
          .timestapm {
            display: flex;
            align-items: center;
          }
          .top-stack {
            align-items: center;
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .content {
            display: flex;
            width: 100%;
          }
          .text {
            display: flex;
            flex-grow: 1;
            align-self: stretch;
            justify-content: center;
            flex-direction: column;
            width: 250px;
          }
        `}
      </style>
      <div className="container" onClick={onClick}>
        <div className="top-stack">
          {skeleton ? (
            <Skeleton width={101} animation="wave" />
          ) : Mobile ? (
            <Heading6 color={Colors.secondary.clear_blue}>
              {variant}
            </Heading6>
          ) : (
            <Heading5 color={Colors.secondary.clear_blue} marginLeft="8px">
              {variant}
            </Heading5>
          )}
          {skeleton ? (
            <Skeleton width={65} height={11} animation="wave" />
          ) : (
            <div className="timestapm">
              <AccessTimeOutlined
                style={{
                  color: Colors.neutral.brown_light_grey,
                  height: 12,
                  width: 12,
                  margin: 4,
                }}
              />
              {Mobile ? (
                <Small color={Colors.neutral.brown_light_grey}>
                  {timestamp}
                </Small>
              ) : (
                <Body3 color={Colors.neutral.brown_light_grey}>
                  {timestamp}
                </Body3>
              )}
            </div>
          )}
        </div>

        <div className="content">
          {skeleton ? (
            <Skeleton
              variant="circular"
              width={64}
              height={64}
              animation="wave"
            />
          ) : (
            <RectangleAvatar state="karir" type="blue" />
          )}
          {skeleton ? (
            <div className="text">
              <Skeleton width="90%" animation="wave" />
              <Skeleton width="90%" animation="wave" />
              <Skeleton width="90%" animation="wave" />
            </div>
          ) : Mobile ? (
            <div className="text">
              <Heading5
                color={Colors.neutral.greyish_brown}
                marginLeft={`8px`}
                style={{
                  height: 20,
                  overflow: `hidden`,
                  whiteSpace: `nowrap`,
                  textOverflow: `ellipsis`,
                  width: `100%`,
                }}
              >
                {title}
              </Heading5>
              <Body3
                color={Colors.neutral.greyish_brown}
                marginLeft={`8px`}
                style={{
                  maxHeight: 40,
                  overflow: `hidden`,
                  width: `100%`,
                }}
              >
                {description}
              </Body3>
            </div>
          ) : (
            <div className="text">
              <Heading4
                color={Colors.neutral.greyish_brown}
                marginLeft={`8px`}
                style={{
                  height: 20,
                  overflow: `hidden`,
                  whiteSpace: `nowrap`,
                  textOverflow: `ellipsis`,
                  width: `100%`,
                }}
              >
                {title}
              </Heading4>
              <Body2
                color={Colors.neutral.greyish_brown}
                marginLeft={`8px`}
                style={{
                  maxHeight: 40,
                  overflow: `hidden`,
                  width: `100%`,
                }}
              >
                {description}
              </Body2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
