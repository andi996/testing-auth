import React, { useEffect, useState } from "react";
import { Colors } from "../../themes";
import RectangleButton from "../Atom/Button/RectangleButton";
import ProfileStrengthAtom from "../Atom/ProgressBar/ProfileStrength";
import { Body1, Body2 } from "../Atom/Typography";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { Elevation } from "../../../src/themes";
import { isMobile, isTablet } from "../../utils/useMediaQuery";

export default function ProfileStrength(props) {
  const Mobile = isMobile();
  const Tablet = isTablet();

  const { state = 0, textButton, profileGuide, onClick } = props;
  var [step, setStep] = useState(state);

  const Rectangle = styled(Button)({
    margin: 8,
    minWidth: 40,
    width: 40,
    padding: 8,
    color: Colors.neutral.greyish_brown,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "unset",
      color: Colors.secondary.clear_blue,
    },
  });

  const prev = () => {
    if (step >= 1) {
      setStep(step - 1);
    }
  };

  const next = () => {
    if (step <= 7) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    setStep(state);
  }, [state]);

  return (
    <>
      <style jsx>{`
        .container {
          width: 100%;
          height: ${Mobile ? `fit-content` : `278px`};
          padding: ${Mobile || Tablet ? `16px` : `24px`};
          padding-top: ${Mobile ? 0 : Tablet ? `16px` : `24px`};
          padding-bottom: ${Mobile ? `8px` : Tablet ? `16px` : `24px`};
          background-color: white;
          position: relative;
          border-radius: ${Mobile ? 0 : `8px`};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: ${Elevation.card};
        }
        .wrapper-proggressbar {
          margin: 0 6px;
          margin-bottom: ${Mobile ? 0 : Tablet ? `16px` : `32px`};
        }
        .question {
          color: ${Colors.neutral.greyish_brown};
        }
        .footer-text {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 40px;
        }
      `}</style>
      <div className="container">
        <div
          className="wrapper-proggressbar"
          // style={{ display: "flex", justifyContent: "center" }}
        >
          <ProfileStrengthAtom state={step} />
        </div>

        {!Mobile && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Body1
                className="question"
                style={{
                  maxWidth: 500,
                  marginRight: "105px",
                }}
              >
                {profileGuide
                  ? profileGuide
                  : `Tulis Biodata diri agar HR kenal dan bisa menghubungi Anda.`}
              </Body1>

              <RectangleButton
                size={Tablet ? `medium` : `large`}
                customStyle={{ margin: 0 }}
                onClick={onClick}
              >
                {textButton}
              </RectangleButton>
            </div>
            <div className="footer-text">
              <Body2 className="question" color={Colors.neutral.brown_grey}>
                {step >= 5
                  ? step == 8
                    ? `Selamat Profil Anda sudah lengkap, Amazing, sekarang
              Anda siap mencari Lowongan`
                    : `${step - 4}/3 yang wajib diisi untuk ke Profesional`
                  : `${step + 1}/5 yang wajib diisi`}
              </Body2>
              <div className="wrapBtn">
                <Rectangle>
                  <ArrowBackIos onClick={prev} />
                </Rectangle>
                <Rectangle>
                  <ArrowForwardIos onClick={next} />
                </Rectangle>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
