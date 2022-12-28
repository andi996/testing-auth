import React from "react";
import { Colors, Elevation } from "../../../themes";
import { Skeleton } from "@mui/material";
import { isMobile } from "../../../utils/useMediaQuery";

export default function Images(props) {
  const {
    radius = "8px",
    image,
    variant = `1:1`,
    size = `small`,
    skeleton,
    onClick,
    pointer,
    onFocus,
  } = props;
  const Mobile = isMobile();

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={
        variant === `1:1` && Mobile && size !== `large`
          ? `328px`
          : variant === `1:1` && size == `small`
          ? `100px`
          : variant === `1:1` && size == `medium`
          ? `120px`
          : variant === `1:1` && Mobile
          ? `360px`
          : variant === `1:1` && size == `large`
          ? `580px`
          : variant === `1:1` && size == `semi large`
          ? `460px`
          : variant === `2:1` && Mobile
          ? `164px`
          : variant === `2:1` && size == `small`
          ? `94px`
          : variant === `2:1` && size == `large`
          ? `300px`
          : variant === `3:1` && Mobile
          ? `120px`
          : variant === `3:1` && size == `small`
          ? `94px`
          : variant === `3:1` && size == `medium`
          ? `128px`
          : variant === `3:1` && size == `large`
          ? `300px`
          : variant === `4:1` && Mobile
          ? `90px`
          : variant === `4:1` && size == `small`
          ? `94px`
          : variant === `4:1` && size == `medium`
          ? `198px`
          : variant === `4:1` && size == `large`
          ? `300px`
          : null
      }
      width={
        variant === `1:1` && Mobile && size !== `large`
          ? `328px`
          : variant === `1:1` && size == `small`
          ? `100px`
          : variant === `1:1` && size == `medium`
          ? `120px`
          : variant === `1:1` && Mobile
          ? `360px`
          : variant === `1:1` && size == `large`
          ? `580px`
          : variant === `1:1` && size == `semi large`
          ? `460px`
          : variant === `2:1` && Mobile
          ? `100%`
          : variant === `2:1` && size == `small`
          ? `188px`
          : variant === `2:1` && size == `large`
          ? `600px`
          : variant === `3:1` && Mobile
          ? `100%`
          : variant === `3:1` && size == `small`
          ? `100%`
          : variant === `3:1` && size == `medium`
          ? `100%`
          : variant === `3:1` && size == `large`
          ? `900px`
          : variant === `4:1` && Mobile
          ? `100%`
          : variant === `4:1` && size == `small`
          ? `376px`
          : variant === `4:1` && size == `medium`
          ? `100%`
          : variant === `4:1` && size == `large`
          ? `100%`
          : null
      }
      style={{
        borderRadius: variant === `4:1` && Mobile ? 0 : "8px",
        maxWidth: 1200,
      }}
    />
  ) : (
    <>
      <style jsx>{`
        .container {
          width: ${variant === `1:1` && Mobile && size !== `large`
            ? `328px`
            : variant === `1:1` && size == `small`
            ? `100px`
            : variant === `1:1` && size == `medium`
            ? `120px`
            : variant === `1:1` && Mobile
            ? `360px`
            : variant === `1:1` && size == `large`
            ? `580px`
            : variant === `1:1` && size == `semi large`
            ? `460px`
            : variant === `2:1` && Mobile
            ? `100%`
            : variant === `2:1` && size == `small`
            ? `188px`
            : variant === `2:1` && size == `large`
            ? `100%`
            : variant === `3:1` && Mobile
            ? `100%`
            : variant === `3:1` && size == `small`
            ? `100%`
            : variant === `3:1` && size == `medium`
            ? `100%`
            : variant === `3:1` && size == `large`
            ? `900px`
            : variant === `4:1` && Mobile
            ? `100%`
            : variant === `4:1` && size == `small`
            ? `376px`
            : variant === `4:1` && size == `medium`
            ? `100%`
            : variant === `4:1` && size == `large`
            ? `100%`
            : null};
          height: ${variant === `1:1` && Mobile && size !== `large`
            ? `328px`
            : variant === `1:1` && size == `small`
            ? `100px`
            : variant === `1:1` && size == `medium`
            ? `120px`
            : variant === `1:1` && Mobile
            ? `360px`
            : variant === `1:1` && size == `large`
            ? `580px`
            : variant === `1:1` && size == `semi large`
            ? `460px`
            : variant === `2:1` && Mobile
            ? `164px`
            : variant === `2:1` && size == `small`
            ? `94px`
            : variant === `2:1` && size == `large`
            ? `300px`
            : variant === `3:1` && Mobile
            ? `128px`
            : variant === `3:1` && size == `small`
            ? `94px`
            : variant === `3:1` && size == `medium`
            ? `128px`
            : variant === `3:1` && size == `large`
            ? `300px`
            : variant === `4:1` && Mobile
            ? `90px`
            : variant === `4:1` && size == `small`
            ? `94px`
            : variant === `4:1` && size == `medium`
            ? `198px`
            : variant === `4:1` && size == `large`
            ? `300px`
            : null};
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: ${Elevation.card};
          position: relative;
          border-radius: ${variant === `4:1` && Mobile ? 0 : radius};
          cursor: ${pointer && `pointer`};
          max-width: 1200px;
        }

        .cover {
          object-fit: cover;
          left: 0;
          right: 0;
          border-radius: ${variant === `4:1` && Mobile ? 0 : radius};
          max-width: 1200px;
          width: ${variant === `1:1` && Mobile && size !== `large`
            ? `328px`
            : variant === `1:1` && size == `small`
            ? `100px`
            : variant === `1:1` && size == `medium`
            ? `120px`
            : variant === `1:1` && Mobile
            ? `360px`
            : variant === `1:1` && size == `large`
            ? `580px`
            : variant === `1:1` && size == `semi large`
            ? `460px`
            : variant === `2:1` && Mobile
            ? `100%`
            : variant === `2:1` && size == `small`
            ? `188px`
            : variant === `2:1` && size == `large`
            ? `100%`
            : variant === `3:1` && Mobile
            ? `100%`
            : variant === `3:1` && size == `small`
            ? `100%`
            : variant === `3:1` && size == `medium`
            ? `100%`
            : variant === `3:1` && size == `large`
            ? `900px`
            : variant === `4:1` && Mobile
            ? `100%`
            : variant === `4:1` && size == `small`
            ? `376px`
            : variant === `4:1` && size == `medium`
            ? `100%`
            : variant === `4:1` && size == `large`
            ? `100%`
            : null};
          height: ${variant === `1:1` && Mobile && size !== `large`
            ? `328px`
            : variant === `1:1` && size == `small`
            ? `100px`
            : variant === `1:1` && size == `medium`
            ? `120px`
            : variant === `1:1` && Mobile
            ? `360px`
            : variant === `1:1` && size == `large`
            ? `580px`
            : variant === `1:1` && size == `semi large`
            ? `460px`
            : variant === `2:1` && Mobile
            ? `164px`
            : variant === `2:1` && size == `small`
            ? `94px`
            : variant === `2:1` && size == `large`
            ? `300px`
            : variant === `3:1` && Mobile
            ? `128px`
            : variant === `3:1` && size == `small`
            ? `94px`
            : variant === `3:1` && size == `medium`
            ? `128px`
            : variant === `3:1` && size == `large`
            ? `300px`
            : variant === `4:1` && Mobile
            ? `90px`
            : variant === `4:1` && size == `small`
            ? `94px`
            : variant === `4:1` && size == `medium`
            ? `198px`
            : variant === `4:1` && size == `large`
            ? `300px`
            : null};
          border: ${onFocus && `3px solid ` + Colors.secondary.clear_blue};
        }
      `}</style>
      <div className="container" onClick={onClick}>
        <img alt="" src={image} className="cover" />
      </div>
    </>
  );
}
