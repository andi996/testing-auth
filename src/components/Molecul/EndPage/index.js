import React from "react";
import { Colors } from "../../../themes";
import Divider from "../../Atom/Divider";
import { Body3 } from "../../Atom/Typography";
import RectangleButton from "../../Atom/Button/RectangleButton";

export default function EndPage({ variant }) {
  // console.log(variant);
  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            // margin: 16px;
            gap: 4px;
          }
        `}
      </style>
      <div className="container">
        <img src="/images/Principle/Logo/Checklist.png" />
        <Divider variant="text" state={variant}>
          Halaman Akhir
        </Divider>
        <Body3 color={Colors.neutral.brown_grey}>
          Anda sudah melihat semua Lowongan pada laman ini
        </Body3>
        <RectangleButton variant="text">
          Kembali ke Halaman Utama
        </RectangleButton>
      </div>
    </>
  );
}
