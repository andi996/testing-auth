import React, { useEffect, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Images from "../../components/Atom/Image";
import {
  Body1,
  Body2,
  Heading2,
  Heading3,
  Heading4,
  Font,
} from "../../components/Atom/Typography";
import { Colors } from "../../themes";
import { useRouter } from "next/router";
import { isMobile } from "../../utils/useMediaQuery";

const EmptyState = () => {
  const Mobile = isMobile();
  const router = useRouter();

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
          padding: "24px 16px",
        }}
      >
        <img src="/images/Principle/Illustration/empty-search-vacancy.png" />

        <Font
          type={Mobile ? `Heading5` : `Heading4`}
          style={{
            maxWidth: Mobile ? `100%` : `288px`,
            marginTop: "12px",
            marginBottom: "8px",
          }}
        >
          Lowongan dan Perusahaan tidak ditemukan
        </Font>

        <Font
          type={Mobile ? `Body3` : `Body2`}
          style={{ color: Colors.neutral.brown_grey, marginBottom: "16px" }}
        >
          Segera cari lamaran Anda di Karir.com
        </Font>

        <RectangleButton
          size={Mobile ? `medium` : `large`}
          customStyle={{ margin: 0, width: Mobile ? `100%` : 192 }}
          onClick={() => router.push("/search-lowongan")}
        >
          Cari Lowongan
        </RectangleButton>
      </div>
    </>
  );
};

export default EmptyState;
