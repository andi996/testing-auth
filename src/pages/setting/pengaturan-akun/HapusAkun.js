import React, { useEffect, useState } from "react";
import { Box, fontWeight } from "@mui/system";
import OTPField from "../../../components/Atom/Input Field/OTPField";
import { Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Colors, Elevation, Radius } from "../../../themes";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Label,
} from "../../../components/Atom/Typography";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import InputTextField from "../../../components/Atom/Input Field/TextField";
import { API2 } from "../../../api/service";
import { endpoints } from "../../../api/endpoint";
import ModalPopupHapusAkun from "../popup/ModalPopupHapusAkun";

export default function HapusAkun(props) {
  const {
    userData,
    isOpenHapusAkun,
    setIsOpenHapusAkun,
    ClickEdit,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [showHapusAkun, setShowHapusAkun] = useState(false);

  const state = {
    id: 1,
    name: "Maudy",
    email: "maudy123456789@gmail.com",
    password: "123456",
    ponsel: "081345678910",
  };

  const handleModalPopupHapusAkun = (val) => {
    if (val === "open") {
      setShowHapusAkun(true);
    } else if (val === "close") {
      setShowHapusAkun(false);
    }
  };

  return (
    <>
      <style jsx>
        {`
          .box-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 24px;
            // margin-bottom: 16px;
            background-color: white;
            border-radius: 8px;
            box-shadow: ${Elevation.card};
            :not(:last-child) {
              margin-bottom: 16px;
            }
          }
          .wrap-content {
            width: 100%;
          }
          .wrap-edit {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: ${isOpenHapusAkun ? "16px" : "0px"};
          }
          .m-wrapper {
            padding: 0px 16px 0px 16px;
            width: 100%;
          }
        `}
      </style>

      <ModalPopupHapusAkun
        isOpen={showHapusAkun}
        onClick={() => handleModalPopupHapusAkun("close")}
        state={state}
      />

      <div className="box-card">
        <div className="wrap-content">
          <div className="wrap-edit">
            <Heading3
              style={{ color: isOpenHapusAkun && Colors.secondary.red }}
            >
              Hapus Akun
            </Heading3>
            <RectangleButton
              onClick={() => ClickEdit("hapus akun")}
              variant="text"
              size="small"
              customStyle={{ width: 42, height: 24, minWidth: "unset" }}
            >
              {isOpenHapusAkun ? "Tutup" : "Edit"}
            </RectangleButton>
          </div>
          {isOpenHapusAkun && (
            <div style={{ marginTop: "24px" }}>
              <div>
                <Box style={{ width: "90%" }}>
                  Akun Anda akan hilang permanen dan data Anda tidak akan
                  kembali lagi.
                </Box>

                <div style={{ marginTop: 24 }}>
                  <RectangleButton
                    size="large"
                    customStyle={{
                      width: 240,
                      color: Colors.secondary.red,
                      borderColor: Colors.secondary.red,
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                    variant="ghost"
                    onClick={() => handleModalPopupHapusAkun("open")}
                  >
                    Hapus Akun
                  </RectangleButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
