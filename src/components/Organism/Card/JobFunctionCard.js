import { AccessTimeOutlined, SellOutlined } from "@mui/icons-material";
import React from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import { Body3, Heading4, Heading5, Heading6 } from "../../Atom/Typography";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { isMobile, isTablet } from "../../../utils/useMediaQuery";

export default function vJobFunctionCard(props) {
  const { title, image, count, onClick, skeleton } = props;
  const Mobile = isMobile();
  const Tablet = isTablet();

  return (
    <>
      <style jsx>
        {`
          .container {
            max-width: ${Tablet ? "209px" : "282px"};
            min-width: ${Mobile ? "188px" : Tablet ? "0" : "218px"};
            width: 100%;
            height: 94px;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: ${Radius.medium};
            cursor: pointer;
            background: white;
            margin-bottom: ${!Mobile && "16px"};
          }
          .thumbnail {
            background: ${Colors.overlay.blue_dark};
            mix-blend-mode: normal;
            border-radius: ${Radius.medium};
            max-width: ${Mobile ? "188px" : Tablet ? "209px" : "282px"};
            min-width: ${Mobile || Tablet ? "0" : "218px"};
            width: 100%;
            height: 94px;
            position: absolute;
            left: 0;
            right: 0;
            z-index: 2;
            :hover {
              background: ${Colors.overlay.dark} !important;
            }
          }
          .cover {
            position: absolute;
            left: 0;
            right: 0;
            border-radius: ${Radius.medium};
            max-width: ${Mobile ? "188px" : Tablet ? "209px" : "282px"};
            min-width: ${Mobile || Tablet ? "0" : "218px"};
            width: 100%;
            height: 94px;
            z-index: 1;
          }
          .content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            padding: 16px;
            height: 100%;
            width: 100%;
          }
        `}
      </style>
      {skeleton ? (
        <Skeleton
          variant="rectangular"
          width={Mobile ? "188px" : Tablet ? "209px" : "282px"}
          height={94}
          animation="wave"
          sx={{ borderRadius: Radius.medium }}
        />
      ) : (
        <div className="container" onClick={onClick}>
          <span className="thumbnail" />
          <div className="cover">
            <img
              src={image}
              width={Mobile ? "188px" : Tablet ? "209px" : "100%"}
              alt=""
              height="94px"
              style={{ borderRadius: Radius.medium }}
            />
          </div>
          <div className="content">
            <>
              {Mobile ? (
                <Heading5 color={`white`} zIndex={3}>
                  {title}
                </Heading5>
              ) : (
                <Heading4 color={`white`} zIndex={3}>
                  {title}
                </Heading4>
              )}
            </>

            {Mobile ? (
              <Heading6 color={`white`} zIndex={3}>
                {count} Lowongan
              </Heading6>
            ) : (
              <Heading5 color={`white`} zIndex={3}>
                {count} Lowongan
              </Heading5>
            )}
          </div>
        </div>
      )}
    </>
  );
}
