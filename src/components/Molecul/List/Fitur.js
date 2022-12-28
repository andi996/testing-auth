import React, { useState } from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";
import { Body2, Body3, Heading5 } from "../../Atom/Typography";

export default function ListFitur(props) {
  const { lists, selected, setSelected } = props;
  // const [Selected, setSelected] = useState(null);
  const Mobile = isMobile();

  return (
    <>
      <style jsx>
        {`
          .container {
            cursor: pointer;
            box-shadow: ${Elevation.card};
            border-radius: ${Radius.medium};
            height: 70px;
            width: 100%;
            padding: ${Mobile ? "8px" : "16px"};
            margin: 8px;
            display: flex;
            align-items: center;
            background: white;
            max-width: 641px;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: ${Radius.circle};
              background: ${Colors.secondary.clear_blue};
              min-height: 32px;
              min-width: 32px;
            }
          }
          .selected {
            background: ${Colors.secondary.clear_blue} !important;
            span {
              background: white !important;
            }
          }
          .lists {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            padding: ${Mobile && "0 16px"};
          }
        `}
      </style>
      <div className="lists">
        {lists.map((el, idx) => (
          <div
            className={"container " + (selected == idx && "selected")}
            onClick={() => setSelected(idx)}
            key={`fitur-` + idx}
          >
            <span>
              <Heading5
                color={selected == idx ? Colors.secondary.clear_blue : `white`}
              >
                {idx + 1}
              </Heading5>
            </span>
            <div style={{ marginLeft: 8 }}>
              <Heading5
                color={selected == idx ? `white` : Colors.neutral.greyish_brown}
                style={{
                  height: 20,
                  overflow: `hidden`,
                  width: `100%`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                }}
              >
                {el.title}
              </Heading5>
              {Mobile ? (
                <Body3
                  color={
                    selected == idx ? `white` : Colors.neutral.greyish_brown
                  }
                  style={{
                    maxHeight: 40,
                    overflow: `hidden`,
                    textOverflow: `ellipsis`,
                  }}
                >
                  {el.desc}
                </Body3>
              ) : (
                <Body2
                  color={
                    selected == idx ? `white` : Colors.neutral.greyish_brown
                  }
                  style={{
                    maxHeight: 40,
                    overflow: `hidden`,
                    textOverflow: `ellipsis`,
                  }}
                >
                  {el.desc}
                </Body2>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
