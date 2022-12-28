import React, { useState } from "react";
import { Body3, Heading5, Heading6 } from "../../../components/Atom/Typography";
import { Colors } from "../../../themes";
import { Box, styled } from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";

export default function CoachMark({
  active,
  handleBack,
  handleNext,
  handleClose,
}) {
  const title = [
    "Semua",
    "Lamaran Terkirim",
    "Diproses",
    "Undangan Interview",
    "Berhasil",
    "Gagal",
  ];
  const desc = [
    "Anda dapat mengecek semua status lamaran Anda di sini.",
    "Semua lamaran yang belum diproses oleh HR akan berada di menu lamaran terkirim.",
    `Shortlist -> Jika lamaran Anda dishortlist.<br/>TLD -> Tes Logika Dasar.<br/>MCU -> Medical Checkup.`,
    `Lamaran Anda akan berada di menu ini, jika sudah sampai tahap proses interview.<br/>
    ORVI -> Online Recording Video Interview
    Interview 1, 2, 3 -> Interview (Online / Offline)`,
    `Offering -> Tahap Offering.<br/>Berhasil  -> Offering sudah diterima.`,
    `Lamaran tidak cocok oleh HR akan masuk ke "Gagal".`,
  ];

  const Backdrop = styled("div")`
    z-index: 999;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  return (
    <Box>
      <Box onClick={handleClose}>
        <Backdrop />
      </Box>

      <Box
        sx={{
          position: `fixed`,
          background: `#fff`,
          padding: `8px`,
          borderRadius: `4px`,
          width: `calc(100% - 32px)`,
          top: 100,
          left: 0,
          right: 0,
          margin: `auto`,
          zIndex: 1000,
        }}
      >
        <Heading6 mb="8px">{title[active]}</Heading6>

        <Body3 mb="8px">
          <div
            dangerouslySetInnerHTML={{
              __html: desc[active],
            }}
          />
        </Body3>
        <Box className="d-flex-fullwidth">
          <Box className="d-flex" gap="4px">
            {title.map((item, index) => {
              return (
                <CircleIcon
                  key={index}
                  sx={{
                    width: `8px`,
                    height: `8px`,
                    color:
                      index === active
                        ? Colors.primary.mid_blue
                        : Colors.primary.very_light_blue,
                  }}
                />
              );
            })}
          </Box>
          <Box className="d-flex" gap="8px" width="fit-content !important">
            {active > 0 && (
              <RectangleButton
                state="alternate"
                size="micro"
                customStyle={{ borderRadius: 4, margin: 0 }}
                onClick={handleBack}
              >
                Kembali
              </RectangleButton>
            )}

            <RectangleButton
              size="micro"
              customStyle={{ borderRadius: 4, margin: 0 }}
              onClick={handleNext}
            >
              {active < title?.length - 1 ? `Lanjutkan` : `Tutup`}
            </RectangleButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
