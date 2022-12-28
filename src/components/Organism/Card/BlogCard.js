import { AccessTimeOutlined, SellOutlined } from "@mui/icons-material";
import React from "react";
import { Colors, Elevation } from "../../../themes";
import { Body3, Heading4, Heading5 } from "../../Atom/Typography";
import Images from "../../Atom/Image";
import { isMobile } from "../../../utils/useMediaQuery";
import { Skeleton } from "@mui/material";
import moment from "moment/moment";
import "moment/locale/id";

export default function BlogCard(props) {
  const { title, image, category, date, onClick, skeleton } = props;
  const Mobile = isMobile();
  moment.locale("id");
  return (
    <>
      <style jsx>
        {`
          .container {
            width: 100%;
            max-width: ${Mobile ? "328px" : "384px"};
            min-width: 278px;
            height: 238px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: 8px;
            cursor: pointer;
          }
          .thumbnail {
            background: ${Colors.overlay.blue_dark};
            mix-blend-mode: normal;
            opacity: 0.7;
            border-radius: 8px 8px 0px 0px;
            width: 100%;
            max-width: 384px;
            min-width: 278px;
            height: 128px;
            z-index: 2;
            :hover {
              background: none;
            }
          }
          .cover {
            object-fit: cover;
            position: absolute;
            left: 0;
            right: 0;
            border-radius: 8px 8px 0px 0px;
            width: 100%;
            max-width: 384px;
            min-width: 278px;
            height: 128px;
          }
          .blog-info-stack {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 12px 16px;
            width: 100%;
            max-width: 382px;
            min-width: 276px;
            height: 110px;
            background: #ffffff;
            border-radius: 0px 0px 8px 8px;
          }
          .title {
            height: 44px;
          }
          .kategori-tanggal {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 24px 0px;
            width: 100%;
            span {
              min-width: 72px;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
          }
        `}
      </style>
      <div className="container" onClick={onClick}>
        {skeleton ? (
          <Skeleton
            width="100%"
            height={Mobile ? 230 : 238}
            animation="wave"
            style={{ transform: "unset" }}
          />
        ) : (
          <>
            <span className="thumbnail" />
            <div className="cover">
              <Images
                variant="3:1"
                size="medium"
                radius="8px 8px 0px 0px"
                image={image}
              />
            </div>
          </>
        )}

        <div className="blog-info-stack">
          {skeleton ? (
            <>
              <Skeleton width="100%" animation="wave" />
              <Skeleton width="100%" animation="wave" />
            </>
          ) : (
            <div className="title">
              {Mobile ? (
                <Heading5>{title}</Heading5>
              ) : (
                <Heading4>{title}</Heading4>
              )}
            </div>
          )}
          {skeleton ? (
            <div className="kategori-tanggal">
              <span>
                <Skeleton
                  variant="circular"
                  width={12}
                  height={12}
                  animation="wave"
                />
                <Skeleton width="100%" animation="wave" />
              </span>
              <span>
                <Skeleton
                  variant="circular"
                  width={12}
                  height={12}
                  animation="wave"
                />
                <Skeleton width="100%" animation="wave" />
              </span>
            </div>
          ) : (
            <div className="kategori-tanggal">
              <span>
                <SellOutlined
                  fontSize="12px"
                  color={Colors.neutral.brown_grey}
                />
                <Body3 color={Colors.primary.mid_blue}>{category}</Body3>
              </span>
              <span>
                <AccessTimeOutlined
                  fontSize="12px"
                  color={Colors.neutral.brown_grey}
                />
                <Body3 color={Colors.neutral.brown_grey}>
                  {moment(date).format("LL")}
                </Body3>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
