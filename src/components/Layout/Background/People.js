import React from "react";

export default function PeopleBackground({ children }) {
  return (
    <>
      <style jsx>{`
        .people {
          background: url("/images/Principle/Background/People Mobile.png");
          background-size: cover;
        }
      `}</style>
      <div className="people">{children}</div>
    </>
  );
}
