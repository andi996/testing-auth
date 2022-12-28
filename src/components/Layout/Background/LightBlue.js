import React from "react";

export default function LightBlueBackground({ children, size }) {
  const image = {
    desktop: "/images/Principle/Background/Light Blue Desktop.png",
    mobile: "/images/Principle/Background/Light Blue Mobile.png",
  };

  return (
    <>
      <style jsx>{`
        .light-blue {
          background: url("${image[size]}");
          background-size: cover;
        }
      `}</style>
      <div className="light-blue">{children}</div>
    </>
  );
}
