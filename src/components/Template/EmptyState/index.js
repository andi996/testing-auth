import { useRouter } from "next/router";
import React from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";
import RectangleButton from "../../Atom/Button/RectangleButton";
import Images from "../../Atom/Image";
import { Body2, Body3, Heading4, Heading5 } from "../../Atom/Typography";

export default function EmptyState({ variant = "vertical", button }) {
  const Mobile = isMobile();
  const router = useRouter;
  return (
    <>
      <style jsx>
        {`
          .container-right {
            width: ${variant == "vertical" ? "288px" : "100%"};
            display: flex;
            flex-direction: column;
            align-items: ${(variant == "horizontal" && "flex-start") ||
            (variant == "vertical" && "center")};
            margin-left: 16px;
            gap: 8px;
          }
          .horizontal {
            display: flex;
            flex-direction: row;
            align-items: flex-start;

            padding: 16px;
            // margin: 0 16px 16px 16px;
            width: 100%;
            height: 150px;
            // box-shadow: ${Elevation.card};
            // border-radius: ${Radius.medium};
          }
          .vertical {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-right: 16px;
            gap: 12px;
            width: 100%;
            height: auto;
            // box-shadow: ${Elevation.card};
          }
          .cover {
            object-fit: cover;
            left: 0;
            right: 0;
            width: 130px;
            height: 130px;
          }
        `}
      </style>
      <div className={variant}>
        <img
          alt=""
          src="/images/Principle/Illustration/empty-search-vacancy.png"
          className="cover"
        />
        <div className="container-right">
          {Mobile ? (
            <Heading5 colors={Colors.neutral.greyish_brown}>
              Anda Belum Memiliki Lamaran{" "}
            </Heading5>
          ) : (
            <Heading4 colors={Colors.neutral.greyish_brown}>
              Anda Belum Memiliki Lamaran{" "}
            </Heading4>
          )}
          {Mobile ? (
            <Body3
              align={
                (variant == "horizontal" && "left") ||
                (variant == "vertical" && "center")
              }
            >
              Segera cari lamaran Anda di Karir.com melalui
              rekomendasi/preferensi Anda
            </Body3>
          ) : (
            <Body2
              align={
                (variant == "horizontal" && "left") ||
                (variant == "vertical" && "center")
              }
            >
              Segera cari lamaran Anda di Karir.com melalui
              rekomendasi/preferensi Anda
            </Body2>
          )}
          {button && (
            <RectangleButton
              fullWidth
              onClick={() => router.push("/status-lamaran")}
            >
              Cari Lamaran
            </RectangleButton>
          )}
        </div>
      </div>
    </>
  );
}
