import React from "react";

const state = {
  default: {
    path: "/images/Principle/Logo/Karir/default.png",
  },
  white: {
    path: "/images/Principle/Logo/Karir/WhiteLogo.png",
  },
  appstore: {
    path: "/images/Principle/Logo/Karir/appstore.png",
  },
  playstore: {
    path: "/images/Principle/Logo/Karir/playstore.png",
  },
};

export default function Logo({
  type = `default`,
  width,
  height,
  margin,
  onClick,
}) {
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
      <img
        alt=""
        src={state[type].path}
        style={{ height: height, width: width, margin: margin }}
        onClick={onClick}
      />
    </>
  );
}
