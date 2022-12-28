import React from "react";

const state = {
  appstore: {
    default: {
      path: "/images/Principle/Logo/Button/Appstore-Default.png",
    },
    alternate: {
      path: "/images/Principle/Logo/Button/Appstore-Alternate.png",
    },
  },
  playstore: {
    default: {
      path: "/images/Principle/Logo/Button/Playstore-Default.png",
    },
    alternate: {
      path: "/images/Principle/Logo/Button/Playstore-Alternate.png",
    },
  },
};

export default function DownloadButton(props) {
  return (
    <>
      <style jsx>
        {`
          img {
            margin: 4px;
            cursor: pointer;
          }
        `}
      </style>
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        <img
          alt=""
          src={state[props.variant][props.state].path}
          onClick={props.onClick}
        />
      </a>
    </>
  );
}
