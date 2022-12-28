import React, { useEffect, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Images from "../../components/Atom/Image";
import {
  Body1,
  Body2,
  Heading2,
  Heading3,
  Heading4,
} from "../../components/Atom/Typography";
import { Colors } from "../../themes";
import { useRouter } from "next/router";

import useMediaQuery from "../../utils/useMediaQuery";

const EmptyState = () => {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          textAlign: "center",
          padding: isMobile ? "0" : "0 24px",
        }}
      >
        <div style={{ marginTop: "20px", marginBottom: "12px" }}>
          <img
            alt=""
            src="/images/Principle/Illustration/empty-search-vacancy.png"
          />
        </div>

        <Heading4
          style={{
            marginTop: "12px",
            marginBottom: "8px",
            width: "288px",
            height: "18px",
          }}
        >
          Yang Anda Cari tidak ditemukan
        </Heading4>

        <Body2
          style={{
            color: Colors.neutral.brown_grey,
            marginBottom: "16px",
            width: "288px",
            height: "36px",
          }}
        >
          Segera cari lamaran Anda di Karir.com melalui rekomendasi/preferensi
          Anda
        </Body2>

        <RectangleButton
          size="large"
          customStyle={{
            width: isMobile ? "100%" : 192,
            maxWidth: isMobile && "288px",
          }}
          onClick={() => router.push("/search-lowongan")}
        >
          Cari Lamaran
        </RectangleButton>
      </div>
    </>
  );
};

export default EmptyState;
