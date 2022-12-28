import React from "react";

export default function DarkBlueBackground({ children, size }) {
  const image = {
    desktop: "/images/Principle/Background/Dark Blue Desktop.png",
    mobile: "/images/Principle/Background/Dark Blue Mobile.png",
  };

  return (
    <>
      <style jsx>{`
        .dark-blue {
          background: url("${image[size]}");
          background-size: cover;
        }
      `}</style>
      <div className="dark-blue">{children}</div>
    </>
  );
}
