import { Box, width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import { Colors, Radius } from "../../../themes";
import Column from "../../Layout/Grid/Column";
import { Small, Body2, Heading3, Heading6, Font } from "../Typography";
import {
  isMobile,
  isTablet,
  isSmallScreen,
} from "../../../utils/useMediaQuery";

export default function ProfileStrength(props) {
  const { state = 0 } = props;
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();

  const Circle1 = () => (
    <span
      style={{
        filter: `drop-shadow(0px 2px 4px rgba(40, 41, 61, 0.04)) drop-shadow(0px 8px 16px rgba(29, 98, 174, 0.16))`,
        background: Colors.secondary.highlight_green,
        border: `${Mobile ? "4px" : "8px"} solid #FFFFFF`,
        boxSizing: `border-box`,
        position: `absolute`,
        // left: `10px`,
        // top: `70px`,
        width: Mobile ? 24 : Tablet ? 32 : 40,
        height: Mobile ? 24 : Tablet ? 32 : 40,
        borderRadius: Radius.circle,
      }}
    />
  );

  const Circle2 = ({ index }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `#FFFFFF`,
        border: `4px solid ${
          index < state
            ? Colors.secondary.highlight_green
            : Colors.neutral.light_grey
        }`,
        boxSizing: `border-box`,
        position: `absolute`,
        // left: `500px`,
        left: `60%`,

        // top: `70px`,
        width: Mobile ? 24 : Tablet ? 32 : 40,
        height: Mobile ? 24 : Tablet ? 32 : 40,
        borderRadius: Radius.circle,
      }}
    >
      <img
        alt=""
        style={{
          width: Mobile ? "10px" : "auto",
          height: Mobile ? "10px" : "auto",
        }}
        src={
          index < state
            ? "/images/Principle/Logo/Medal.png"
            : "/images/Principle/Logo/Medal Gray.png"
        }
      />
    </div>
  );

  const Circle3 = ({ index }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `#FFFFFF`,
        border: `4px solid ${
          index < state
            ? Colors.secondary.highlight_green
            : Colors.neutral.light_grey
        }`,
        boxSizing: `border-box`,
        position: `absolute`,
        // left: `823px`,
        // left: `100%`,
        right: 0,
        // left: "760px",

        // top: `70px`,
        width: Mobile ? 24 : Tablet ? 32 : 40,
        height: Mobile ? 24 : Tablet ? 32 : 40,
        borderRadius: Radius.circle,
      }}
    >
      <img
        alt=""
        style={{
          width: Mobile ? "10px" : "auto",
          height: Mobile ? "10px" : "auto",
        }}
        src={
          index < state
            ? "/images/Principle/Logo/Cup.png"
            : "/images/Principle/Logo/Cup Gray.png"
        }
      />
    </div>
  );

  const ShowBars = ({ index }) => (
    <span
      style={{
        // minWidth: 93,
        width: `100%`,
        // maxWidth: 96,
        height: Mobile ? 8 : 16,
        background:
          index < state
            ? Colors.secondary.highlight_green
            : Colors.neutral.light_grey,
        borderRadius: Radius.medium,
      }}
    />
  );

  return (
    <>
      <Row style={{ margin: `0 0` }}>
        <Col xs={3} sm={6} lg={5} style={{ padding: 0 }}>
          <Font
            type={
              Mobile
                ? `Heading6`
                : Tablet || SmallScreen
                ? `Heading4`
                : `Heading3`
            }
            color={Colors.secondary.highlight_green}
            mt="10px"
          >
            Pemula
          </Font>
        </Col>
        <Col xs={2} sm={3} lg={5} style={{ padding: 0 }}>
          <Font
            className="center"
            type={
              Mobile
                ? `Heading6`
                : Tablet || SmallScreen
                ? `Heading4`
                : `Heading3`
            }
            mt="10px"
            color={
              state < 5
                ? Colors.neutral.brown_light_grey
                : Colors.secondary.highlight_green
            }
          >
            Medium
            {!Mobile && !Tablet && !SmallScreen && (
              <Font type="Body2" color={Colors.neutral.greyish_brown}>
                syarat untuk bisa lamar lowongan
              </Font>
            )}
          </Font>
        </Col>
        <Col xs={1} sm={3} lg={2} style={{ padding: 0 }}>
          <Font
            className="center"
            type={
              Mobile
                ? `Heading6`
                : Tablet || SmallScreen
                ? `Heading4`
                : `Heading3`
            }
            mt="10px"
            color={
              state < 8
                ? Colors.neutral.brown_light_grey
                : Colors.secondary.highlight_green
            }
          >
            Profesional
          </Font>
        </Col>
      </Row>

      <div
        className="d-flex-fullwidth"
        style={{ position: "relative", gap: 4, marginTop: Mobile ? 12 : 20 }}
      >
        <ShowBars index={0} />
        <ShowBars index={1} />
        <ShowBars index={2} />
        <ShowBars index={3} />
        <ShowBars index={4} />
        <ShowBars index={5} />
        <ShowBars index={6} />
        <ShowBars index={7} />
        <Circle1 />
        <Circle2 index={4} />
        <Circle3 index={7} />
      </div>

      {Mobile && (
        <Box textAlign="right" mt="12px">
          <Small>
            {state >= 5
              ? state == 8
                ? `Selamat Profil Anda sudah lengkap, Amazing, sekarang
              Anda siap mencari Lowongan`
                : `${state - 4}/3 yang wajib diisi untuk ke Profesional`
              : `${state + 1}/5 yang wajib diisi`}
          </Small>
        </Box>
      )}
    </>
  );
}
