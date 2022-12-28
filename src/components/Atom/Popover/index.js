import React from "react";
import { Body2, Heading4 } from "../Typography";

export default function Popover(props) {
  const { variant = `up`, state = `left`, title, description } = props;
  return (
    <>
      <style jsx>
        {`
          .popover-content {
            // opacity: 0;
            // visibility: hidden;
            position: absolute;
            left: -150px;
            transform: translate(0, 10px);
            background-color: white;
            padding: 1.5rem;
            box-shadow: 0px 1px 6px rgba(29, 98, 174, 0.12);
            width: auto;
            height: auto;
          }
          .popover-content:before {
            // background-color: rgba(29, 98, 174, 0.1);
            border-radius: 8px;
            position: absolute;
            z-index: -1;
            content: "";
            right: 10%;
            top: -7px;
            border-style: solid;
            border-width: 0 4px 8px 4px;
            color: white;
            border-color: transparent transparent white transparent;
            transition-duration: 0.3s;
            transition-property: transform;
          }
        `}
      </style>
      <div className="popover-content">
        <Heading4>{title}</Heading4>
        <Body2>{description}</Body2>
        {/* <p>Joseph Francis "Joey" Tribbiani, Jr.</p> */}
        {/* <img
          alt="Joseph Francis Joey Tribbiani, Jr."
          src="https://media.giphy.com/media/11SIBu3s72Co8w/giphy.gif"
        /> */}
      </div>
    </>
  );
}
