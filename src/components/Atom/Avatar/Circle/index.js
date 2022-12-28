import React from "react";

const states = {
  language: {
    indonesia: {
      path: "/images/Principle/Logo/Karir/Avatar/Indonesia@1x.png",
    },
    inggris: {
      path: "/images/Principle/Logo/Karir/Avatar/Inggris@1x.png",
    },
  },
  people: {
    boy: {
      path: "/images/Principle/Logo/Karir/Avatar/State=Boy.png",
    },
    girl: {
      path: "/images/Principle/Logo/Karir/Avatar/State=Girl.png",
    },
    avatar: {
      path: "/images/Principle/Logo/Karir/Avatar/State=Avatar.png",
    },
  },
  browser: {
    chrome: {
      path: "/images/Principle/Logo/Karir/Avatar/40x40@1x chrome.png",
    },
    safari: {
      path: "/images/Principle/Logo/Karir/Avatar/40x40@1x safari.png",
    },
  },
  karir: {
    gradient: {
      path: "/images/Principle/Logo/Karir/Avatar/40x40@1x karir_gradient.png",
    },
    blue: {
      path: "/images/Principle/Logo/Karir/Avatar/40x40@1x karir_blue.png",
    },
    white: {
      path: "/images/Principle/Logo/Karir/Avatar/40x40@1x karir_white.png",
    },
  },
};

export default function CircleAvatar(props) {
  const { state = `karir`, type = `gradient`, size = "64px", style } = props;
  return (
    <>
      <style jsx>
        {`
          img {
            margin: 4px;
            height: ${size};
            width: ${size};
          }
        `}
      </style>
      <img alt="" src={states[state][type].path} style={style} />
    </>
  );
}
