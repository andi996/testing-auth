import React from "react";
import { Colors, Radius } from "../../../themes";
import Link from "../../Atom/Link";
import { Small, Body3, Heading5 } from "../../Atom/Typography";

export default function Ticker(props) {
  const {
    type = "dekstop",
    variant,
    children,
    link,
    width,
    height,
    radius = true,
  } = props;
  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            padding: ${type === "dekstop" ? "12px 16px" : "8px 16px"};
            background: ${Colors.primary.very_light_blue};
            border-radius: ${radius ? Radius.medium : 0};
            width: ${width ? width : "100%"};
            min-height: ${type === "dekstop" ? "60px" : "48px"};
            height: ${height ? height : "auto"};
          }

          .icon {
            width: 20px;
            height: 20px;
            color: ${Colors.primary.mid_blue};
            margin-right: 8px;
          }
        `}
      </style>
      <div className="container">
        {/* {variant === `icon` && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: 8 }}
          >
            <path
              d="M1 19V4C1 2.343 2.7621 1 4.93471 1H19L15.8549 6.056L19 11.1125H5.92692"
              stroke="#1F96FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )} */}

        <div className="d-flex" style={{ width: `fit-content` }}>
          {type === "dekstop" ? (
            <img
              src="/images/Principle/Logo/flag.svg"
              className="icon"
              alt="flag.svg"
            />
          ) : (
            <img
              src="/images/Principle/Logo/Information.svg"
              className="icon"
              alt="information.svg"
            />
          )}
          <div style={{ width: `100%` }}>
            {type === "dekstop" ? (
              <>
                <Body3
                  color={Colors.neutral.greyish_brown}
                  style={{ display: `inline` }}
                >
                  {children}
                </Body3>{" "}
                <Link to={link} size="small">
                  <Heading5
                    style={{
                      display: `inline`,
                      color: Colors.secondary.clear_blue,
                      fontWeight: 600,
                    }}
                  >
                    Laporkan
                  </Heading5>
                </Link>
              </>
            ) : (
              <>
                <Small
                  color={Colors.neutral.greyish_brown}
                  style={{ display: `inline` }}
                >
                  {children}
                </Small>{" "}
                <Link to={link} size="small">
                  <Small
                    style={{
                      display: `inline`,
                      color: Colors.secondary.clear_blue,
                    }}
                  >
                    Mengerti
                  </Small>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* {type === "dekstop" && variant === "icon" && (
          <Link to={link} size="small">
            <Heading5 color={Colors.primary.mid_blue}>Label</Heading5>
          </Link>
        )} */}

        {type === "mobile" && variant === "icon" && (
          <img
            src="/images/Principle/Logo/Close.svg"
            alt="close.svg"
            width="18px"
            height="18px"
            onClick={() => alert("clicked")}
          />
        )}
      </div>
    </>
  );
}
