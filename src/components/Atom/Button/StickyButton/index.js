import React from "react";
import { Body1, Heading5 } from "../../Typography";
import { Elevation, Colors } from "../../../../themes";
import { Button } from "@mui/material";
// import { Skeleton } from "@mui/material";

export default function StickyButton(props) {
  const {
    radius = "8px",
    state = `Profile Complete`,
    variant = `Apply Process`,
  } = props;

  return (
    <>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          align-content: center;
          box-shadow: ${Elevation.card};
          position: relative;
          // border-radius: ${radius};
          padding: 16px 120px 16px 120px;
          width: 1440px;
          background-color: ${state == `Profile Complete`
            ? Colors.secondary.clear_blue_light
            : Colors.secondary.red_light};
        }
        .wrapper-text {
          width: 624px;
          margin-top: auto;
          margin-bottom: auto;
        }
        .wrapper-Btn {
          display: flex;
          flex-direction: row;
          text-align: center;
        }
        .buttonBatal {
          width: 240px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid #1d62ae;
          color: #1d62ae;
          margin-right: 16px;
          margin-left: 80px;
          background-color: transparent;
        }
        .buttonKirim {
          width: 240px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid #1d62ae;
          background-color: #1d62ae;
          color: white;
        }
      `}</style>
      <div className="container">
        <div className="wrapper-text">
          {state == `Profile Complete` ? (
            <Body1>
              Anda Melamar Posisi
              <span style={{ color: Colors.secondary.clear_blue }}>
                {" "}
                UI/UX Designer
              </span>{" "}
              di
              <span style={{ color: Colors.secondary.clear_blue }}>
                {" "}
                Microsoft
              </span>
            </Body1>
          ) : (
            <Body1>
              Lengkapi Profil Anda Hingga{" "}
              <span style={{ color: Colors.secondary.highlight_green }}>
                {" "}
                Intermediate
              </span>{" "}
              untuk dapat melamar posisi
              <span style={{ color: Colors.secondary.clear_blue }}>
                {" "}
                UI/UX Designer
              </span>{" "}
              di{" "}
              <span style={{ color: Colors.secondary.clear_blue }}>
                Microsoft
              </span>
              .
            </Body1>
          )}
        </div>
        <div className="wrapper-Btn">
          <Button
            className="buttonBatal"
            variant="outlined"
            style={{
              width: "240px",
              height: "40px",
              borderRadius: "8px",
              marginRight: "16px",
              marginLeft: "80px",
              textTransform: "none",
            }}
          >
            <Heading5>Batal</Heading5>
          </Button>
          {state == `Profile Not Complete` ? (
            <Button
              className="buttonKirim"
              variant="contained"
              disabled
              style={{
                width: "240px",
                height: "40px",
                borderRadius: "8px",
                color: "#888888",
                backgroundColor: "#EEEEEE",
                textTransform: "none",
              }}
            >
              <Heading5>Kirim Profil</Heading5>
            </Button>
          ) : (
            <Button
              className="buttonKirim"
              variant="contained"
              style={{
                width: "240px",
                height: "40px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              <Heading5>Kirim Profil</Heading5>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
