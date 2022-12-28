import { AccessTimeOutlined, Person } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Colors, Elevation } from "../../../themes";
import RectangleAvatar from "../../Atom/Avatar/Rectangle";
import Divider from "../../Atom/Divider";
import {
  Small,
  Body1,
  Body2,
  Body3,
  Heading4,
  Heading5,
  Heading6,
} from "../../Atom/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ProfileMatch from "../../Atom/Label/ProfileMatch";
import Label from "../../Atom/Label";
import useMediaQuery, { isMobile } from "../../../utils/useMediaQuery";
import moment from "moment/moment";
import "moment/locale/id";

export default function JobCard(props) {
  const {
    // state = "default",
    title,
    company,
    location,
    salary,
    description,
    profileMatch,
    timestamp,
    skeleton,
    variant = `vertical`,
    prioritas,
    onClick,
    fullWidth,
    bookmark = false,
    onBookmark,
    margin,
    customHeight,
  } = props;

  const [state, setState] = useState();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const Mobile = isMobile();
  moment.locale("id");

  useEffect(() => {
    if (isTablet) {
      setState("mobile");
    } else {
      setState("default");
    }

    // if (!props?.state) {
    //   if (isTablet) {
    //     variant === "vertical" && state === "default" && setState("mobile");
    //   } else {
    //     state === "mobile" && setState("default");
    //   }
    // }
  }, [isTablet]);

  return (
    <>
      <style jsx>
        {`
          .container {
            cursor: pointer;
            width: ${
              fullWidth
                ? `100%`
                : state === "default"
                ? variant === `horizontal`
                  ? `384px` // horizontal
                  : `282px` // vertical
                : // if state === mobile
                variant === `horizontal`
                ? `328px` // horizontal
                : `235px` // vertical
            };
            max-width: 610px;
            height: ${customHeight
              ? customHeight
              : variant === `horizontal`
              ? `161px`
              : `fit-content`};
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: 8px;
            padding: ${Mobile ? "8px" : "12px"};
            background: white;
            :active {
              background: ${Colors.primary.very_light_blue} !important;
            }
            margin: ${margin ? margin : `0 0 16px 0`};
          }
          .info-company-button-stack {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            align-self: stretch;
            justify-content: space-between;
          }
          .info-company-stack {
            // flex-grow: 1;
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            // align-items: flex-start;
            // align-self: stretch;
            // min-width: 190px;
            width: 100%;
            max-width: 100%;
          }
          .bottom-stack {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
          }
        `}
      </style>
      <div className="container" onClick={onClick}>
        <div className="info-company-button-stack">
          <div>
            {skeleton ? (
              <Skeleton
                variant={variant === `horizontal` ? "rectangular" : "circular"}
                width={64}
                height={64}
                animation="wave"
              />
            ) : (
              <RectangleAvatar state="karir" type="blue" />
            )}

            <div style={{ marginTop: 1, marginBottom: 4 }}>
              {prioritas ? (
                skeleton ? (
                  <Skeleton width={64} animation="wave" />
                ) : (
                  <Label
                    variant="prioritas"
                    customStyle={"margin:0; padding: 3px 4px;"}
                  >
                    Prioritas
                  </Label>
                )
              ) : (
                // <div style={{ width: 65, height: 20 }}></div>
                <Label
                  customStyle={
                    "margin:0; padding: 3px 4px; background-color: unset"
                  }
                ></Label>
              )}
            </div>
          </div>
          {variant === `horizontal` && (
            <div className="info-company-stack">
              {skeleton ? (
                <div style={{ width: `100%`, paddingLeft: `12px` }}>
                  <Skeleton width="100%" animation="wave" />
                </div>
              ) : (
                <Heading4
                  color={Colors.neutral.greyish_brown}
                  marginLeft="12px"
                  className="text-ellipsis"
                >
                  {title}
                </Heading4>
              )}
              {skeleton ? (
                <div style={{ width: `100%`, paddingLeft: `12px` }}>
                  <Skeleton width="100%" animation="wave" />
                </div>
              ) : (
                <>
                  {state === "default" && (
                    <Body1
                      color={Colors.secondary.clear_blue}
                      marginLeft="12px"
                      style={{
                        height: 20,
                        overflow: `hidden`,
                        width: `100%`,
                        textOverflow: `ellipsis`,
                        // whiteSpace: `nowrap`,
                      }}
                    >
                      {company}
                    </Body1>
                  )}

                  {state === "mobile" && (
                    <Body2
                      color={Colors.secondary.clear_blue}
                      marginLeft="12px"
                      style={{
                        height: 20,
                        overflow: `hidden`,
                        width: `100%`,
                        textOverflow: `ellipsis`,
                        // whiteSpace: `nowrap`,
                      }}
                    >
                      {company}
                    </Body2>
                  )}
                </>
              )}
              {skeleton ? (
                <div
                  style={{
                    width: `100%`,
                    marginTop: `4px`,
                    paddingLeft: `12px`,
                  }}
                >
                  <Skeleton width="100%" animation="wave" />
                </div>
              ) : (
                <>
                  {state === "default" && (
                    <Body2
                      color={Colors.secondary.highlight_green}
                      marginTop="4px"
                      marginLeft="12px"
                    >
                      {salary}
                    </Body2>
                  )}

                  {state === "mobile" && (
                    <Body3
                      color={Colors.secondary.highlight_green}
                      marginTop="6px"
                      marginLeft="12px"
                    >
                      {salary}
                    </Body3>
                  )}
                </>
              )}
              {skeleton ? (
                <div style={{ width: `100%`, paddingLeft: `12px` }}>
                  <Skeleton width="100%" animation="wave" />
                </div>
              ) : (
                <>
                  {state === "default" && (
                    <Body2
                      color={Colors.neutral.brown_grey}
                      marginLeft="12px"
                      style={{
                        height: 20,
                        overflow: `hidden`,
                        width: `100%`,
                        textOverflow: `ellipsis`,
                        // whiteSpace: `nowrap`,
                      }}
                    >
                      {description}
                    </Body2>
                  )}

                  {state === "mobile" && (
                    <Body3
                      color={Colors.neutral.brown_grey}
                      marginLeft="12px"
                      style={{
                        height: 20,
                        overflow: `hidden`,
                        width: `100%`,
                        textOverflow: `ellipsis`,
                        // whiteSpace: `nowrap`,
                      }}
                    >
                      {description}
                    </Body3>
                  )}
                </>
              )}
            </div>
          )}
          {skeleton ? (
            <Skeleton width={24} height={24} animation="wave" />
          ) : bookmark ? (
            <BookmarkIcon
              style={{
                color: Colors.primary.mid_blue,
                height: 24,
                width: 24,
                cursor: "pointer",
              }}
              onClick={onBookmark}
            />
          ) : (
            <BookmarkBorderIcon
              style={{
                color: Colors.primary.mid_blue,
                height: 24,
                width: 24,
                cursor: "pointer",
              }}
              onClick={onBookmark}
            />
          )}
        </div>

        {variant === `vertical` && (
          <div className="info-company-stack">
            {variant === `vertical` && (
              <>
                {skeleton ? (
                  <Skeleton width="100%" animation="wave" />
                ) : (
                  <Heading4
                    className="text-ellipsis"
                    color={Colors.neutral.greyish_brown}
                  >
                    {title}
                  </Heading4>
                )}
                {skeleton ? (
                  <Skeleton width="100%" animation="wave" />
                ) : (
                  <>
                    {state === "default" && (
                      <Body1
                        className="text-ellipsis"
                        color={Colors.secondary.clear_blue}
                        marginBottom={`38px`}
                      >
                        {company}
                      </Body1>
                    )}

                    {state === "mobile" && (
                      <Body3
                        className="text-ellipsis"
                        color={Colors.secondary.clear_blue}
                        marginBottom={`16px`}
                      >
                        {company}
                      </Body3>
                    )}
                  </>
                )}
                {skeleton ? (
                  <Skeleton width="100%" animation="wave" />
                ) : (
                  <>
                    {state === "default" && (
                      <Body2
                        className="text-ellipsis"
                        color={Colors.secondary.highlight_green}
                      >
                        {salary}
                      </Body2>
                    )}

                    {state === "mobile" && (
                      <Body3
                        className="text-ellipsis"
                        color={Colors.secondary.highlight_green}
                      >
                        {salary}
                      </Body3>
                    )}
                  </>
                )}
                {skeleton ? (
                  <Skeleton width="100%" animation="wave" />
                ) : (
                  <>
                    {state === "default" && (
                      <Body2
                        className="text-ellipsis"
                        color={Colors.neutral.brown_grey}
                      >
                        {description}
                      </Body2>
                    )}

                    {state === "mobile" && (
                      <Small
                        className="text-ellipsis"
                        color={Colors.neutral.brown_grey}
                      >
                        {description}
                      </Small>
                    )}
                  </>
                )}
              </>
            )}
            {skeleton ? (
              <Skeleton width="100%" animation="wave" />
            ) : (
              <Body2 color={Colors.neutral.brown_grey}>{location}</Body2>
            )}
          </div>
        )}

        <Divider />
        <div className="bottom-stack">
          <ProfileMatch
            value={profileMatch}
            variant={state === "mobile" || isTablet ? `micro` : `short`}
            skeleton={skeleton}
          />
          {skeleton ? (
            <Skeleton width="25%" />
          ) : (
            <div style={{ display: `flex`, alignItems: `center` }}>
              <AccessTimeOutlined
                style={{
                  color: Colors.neutral.brown_light_grey,
                  marginRight: 4,
                }}
                fontSize="12px"
              />

              {state === "default" && (
                <Body3 color={Colors.neutral.brown_light_grey}>
                  {moment(timestamp).format("LL")}
                </Body3>
              )}

              {state === "mobile" && (
                <Small color={Colors.neutral.brown_light_grey}>
                  {moment(timestamp).format("LL")}
                </Small>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
