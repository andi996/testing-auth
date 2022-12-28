import React from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import { Body3 } from "../Typography";

export default function Pagination({ shadow }) {
  const [width, setWidth] = React.useState(0);
  return (
    <>
      <style jsx>
        {`
          .container {
            background: white;
            border-radius: ${Radius.medium};
            box-shadow: ${shadow && Elevation.card};
            padding: 8px;
            width: 100%;
            max-width: 610px;
            margin-bottom: 64px;
          }
          .pagination {
            display: flex;
            width: 100%;
            margin: 8px;
          }
          .active {
            color: white;
            background: ${Colors.primary.mid_blue};
            display: flex;
            width: 36px;
            height: 36px;
            justify-content: center;
            align-items: center;
            border-radius: ${Radius.circle};
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          }
          .inactive {
            color: ${Colors.neutral.brown_light_grey};
            display: flex;
            width: 36px;
            height: 36px;
            justify-content: center;
            align-items: center;
            border-radius: ${Radius.circle};
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
          }
          .info {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            padding-right: 4px;
          }
        `}
      </style>
      <div className="container">
        <div
          ref={(node) => node && setWidth(node.offsetWidth)}
          className="pagination"
          style={{
            justifyContent: width <= 380 ? "center" : "flex-end",
          }}
        >
          <div className="active">1</div>
          <div className="inactive">2</div>
          <div className="inactive">3</div>
          <div className="inactive">4</div>
          <div className="inactive">5</div>
          <div className="inactive">6</div>
          {width > 292 && <div className="inactive">7</div>}
          {width >= 380 && <div className="inactive">8</div>}
          <div className="inactive">...</div>
          <div className="inactive">21</div>
        </div>
        <div className="info">
          <Body3 color={Colors.neutral.brown_light_grey}>20 dari 420</Body3>
        </div>
      </div>
    </>
  );
}
