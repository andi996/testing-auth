import React, { useState } from "react";
import Tooltip from "react-power-tooltip";
import { Body2, Heading4 } from "../../Atom/Typography";

export default function PopoverTooltip(props) {
  const { variant = `up`, state = `right`, title, description } = props;
  const [Show, setShow] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img alt="" src="/images/Principle/Logo/Tooltip.png" />
      <Tooltip
        show={Show}
        arrowAlign={
          ((state === `left` || state === `up`) && `start`) ||
          ((state === `right` || state === `down`) && `end`)
        }
        position={
          (variant === `up` && `bottom center`) ||
          (variant === `right` && `left center`) ||
          (variant === `down` && `top center`)
        }
      >
        <Heading4>
          {title}
          <Body2 marginTop={`8px`}>{description}</Body2>
        </Heading4>
      </Tooltip>
    </div>
  );
}
