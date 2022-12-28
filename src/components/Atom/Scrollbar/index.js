import React from "react";

export default function ScrollbarExample(props) {
  return (
    <>
      <style jsx>
        {`
          .container {
            height: 100px;
            width: 100px;
            overflow: scroll;
            display: flex;
            flex-direction: ${props.variant == "horizontal" && "column"};
          }
          .box {
            height: 200px;
            width: 200px;
            background-color: aliceblue;
            padding: 4px;
          }
          /* Track */
          ::-webkit-scrollbar-track {
            background: ${props.color == "blue" && "#d2d2d2"};
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: ${props.color == "blue" && "#1d62ae"};
            border-radius: 2px;
          }
        `}
      </style>
      <div className="container">
        <span className="box" />
      </div>
    </>
  );
}
