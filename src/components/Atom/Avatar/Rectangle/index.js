import React from "react";

const state = {
  karir: {
    blue: {
      path: "/images/Principle/Logo/Karir/Avatar/Karir=Blue.png",
    },
    white: {
      path: "/images/Principle/Logo/Karir/Avatar/Karir=White.png",
    },
  },
};

export default function RectangleAvatar(props) {
  return (
    <>
      <style jsx>
        {`
          img {
            // margin: 4px;
            height: 64px;
            width: 64px;
          }
        `}
      </style>
      <img alt="" src={state[props.state][props.type].path} />
    </>
  );
}
