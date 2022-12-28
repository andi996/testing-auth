import React from "react";
import { Colors, Radius } from "../../../themes";
import { Label } from "../Typography";
export default function Notification(props) {
  const { variant = `primary`, state, value = 1, width, height } = props;
  return (
    <>
      <style jsx>{`
        .notification {
          background: ${(variant === `primary` && Colors.secondary.red) ||
          (variant === `secondary` && Colors.primary.mid_blue)};
          width: ${(state === `counter` && `fit-content`) ||
          (state === `dot` && width ? width : `16px`)};
          height: ${height ? height : `16px`};
          border-radius: ${Radius.circle};
          margin: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .counter {
          padding: 1px 5px;
          font-family: MuseoSans;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 0;
          color: white;
          line-height: 14px;
        }
      `}</style>
      <div className="notification ">
        <span className="counter">
          {state === "counter" && (value > 99 ? `99+` : value)}
        </span>
      </div>
    </>
  );
}
