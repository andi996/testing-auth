import { Person } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors, Elevation } from "../../../themes";
import RectangleAvatar from "../../Atom/Avatar/Rectangle";
import Divider from "../../Atom/Divider";
import {
  Small,
  Body2,
  Body3,
  Heading4,
  Heading5,
  Heading6,
} from "../../Atom/Typography";
import RectangleButton from "../../Atom/Button/RectangleButton";
import { isMobile, isTablet } from "../../../utils/useMediaQuery";

export default function CompanyCard(props) {
  const [Selected, setSelected] = useState(false);
  const {
    title,
    category,
    location,
    description,
    count,
    subscriber,
    skeleton,
    onClick,
    onChange,
    fullWidth,
  } = props;

  const Mobile = isMobile();

  useEffect(() => {
    onchange;
  }, [Selected]);

  return (
    <>
      <style jsx>
        {`
          .container {
            background: white;
            cursor: pointer;
            width: 100%;
            min-height: ${Mobile ? `167px` : `171px`};
            max-height: ${Mobile ? `167px` : `171px`};
            max-width: ${fullWidth ? "610px;" : Mobile ? "328px" : "382px"};
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: 0px 1px 6px rgba(29, 98, 174, 0.12);
            position: relative;
            border-radius: 8px;
            padding: ${Mobile ? "8px" : "12px"};
            //hilangkan
            // margin: 8px 0px;
            :hover {
              background: ${Colors.primary.pale_gray};
            }
            :active {
              background: ${Colors.primary.very_light_blue} !important;
            }
          }
          .info-company-button-stack {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            align-self: stretch;
            gap: 12px;
          }
          .info-company-stack {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
            width: 120px;
          }
          .bottom-stack {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
            // margin: 8px 0px;
          }
        `}
      </style>
      <div className="container" onClick={onClick}>
        <div className="info-company-button-stack">
          {skeleton ? (
            <Skeleton
              variant="rectangular"
              width={64}
              height={64}
              animation="wave"
              style={{ borderRadius: 12 }}
            />
          ) : (
            <RectangleAvatar state="karir" type="blue" />
          )}
          <div className="info-company-stack">
            {skeleton ? (
              <Skeleton width="100%" animation="wave" />
            ) : Mobile ? (
              <Heading5
                color={Colors.neutral.greyish_brown}
                style={{
                  // height: 20,
                  width: `100%`,
                  // overflow: `hidden`,
                  // textOverflow: `ellipsis`,
                  // whiteSpace: `nowrap`,
                }}
              >
                {title}
              </Heading5>
            ) : (
              <Heading4
                color={Colors.neutral.greyish_brown}
                style={{
                  height: 20,
                  width: `100%`,
                  overflow: `hidden`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                }}
              >
                {title}
              </Heading4>
            )}
            {skeleton ? (
              <Skeleton width="100%" animation="wave" />
            ) : Mobile ? (
              <Body3
                color={Colors.secondary.clear_blue}
                style={{
                  height: 20,
                  overflow: `hidden`,
                  width: `100%`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                }}
              >
                {category}
              </Body3>
            ) : (
              <Body2
                color={Colors.secondary.clear_blue}
                style={{
                  height: 20,
                  overflow: `hidden`,
                  width: `100%`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                }}
              >
                {category}
              </Body2>
            )}

            {skeleton ? (
              <Skeleton width="50%" animation="wave" />
            ) : Mobile ? (
              <Body3 color={Colors.neutral.brown_grey}>{location}</Body3>
            ) : (
              <Body2 color={Colors.neutral.brown_grey}>{location}</Body2>
            )}
          </div>
          {skeleton ? (
            <Skeleton
              width={76}
              height={48}
              animation="wave"
              sx={{ mt: `-10px`, mb: `-10px` }}
            />
          ) : (
            <RectangleButton
              zIndex={2}
              variant="ghost"
              size="small"
              skeleton={skeleton}
              selected={Selected}
              customStyle={{ borderRadius: `4px` }}
              onClick={() => setSelected(!Selected)}
            >
              {Selected ? `Disubscribe` : `Subscribe`}
            </RectangleButton>
          )}
        </div>
        {skeleton ? (
          <>
            <Skeleton width="100%" animation="wave" sx={{ mt: `8px` }} />
            <Skeleton width="100%" animation="wave" />
          </>
        ) : Mobile ? (
          <Body3
            marginTop="8px"
            color={Colors.neutral.brown_grey}
            style={{
              height: 40,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
            }}
          >
            {description}
          </Body3>
        ) : (
          <Body2
            marginTop="8px"
            color={Colors.neutral.brown_grey}
            style={{
              height: 40,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
            }}
          >
            {description}
          </Body2>
        )}
        <Divider />
        <div className="bottom-stack">
          {skeleton ? (
            <Skeleton width="25%" animation="wave" />
          ) : (
            <Heading6 color={Colors.secondary.highlight_green}>
              {count} Lowongan Tersedia
            </Heading6>
          )}
          {skeleton ? (
            <Skeleton width="25%" />
          ) : (
            <div style={{ display: `flex`, alignItems: `center` }}>
              <Person
                style={{ color: Colors.neutral.brown_light_grey }}
                fontSize="12px"
              />
              {Mobile ? (
                <Small color={Colors.neutral.brown_light_grey}>
                  {subscriber} subscriber
                </Small>
              ) : (
                <Heading6 color={Colors.neutral.brown_light_grey}>
                  {subscriber} subscriber
                </Heading6>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
