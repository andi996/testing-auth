import React from "react";

export default function Favicon(props) {
  const type = {
    blue: {
      path: "/images/Principle/Logo/Karir/FavIcon/logo blue.png",
    },
    white: {
      path: "/images/Principle/Logo/Karir/FavIcon/logo white.png",
    },
  };
  return (
    <div style={{ padding: 8, height: props.size, width: props.size }}>
      <img alt="" src={type[props.type].path} />
    </div>
  );
}
