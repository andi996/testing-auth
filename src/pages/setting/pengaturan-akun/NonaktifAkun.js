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
import ModalPopupNonaktifAkun from "../popup/ModalPopupNonaktifAkun";

export default function NonaktifAkun(props) {
  const {
    userData,
    isOpenNonaktifAkun,
    setIsOpenNonaktifAkun,
    ClickEdit,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [show, setShow] = useState(false);

  const state = {
    id: 1,
    name: "Maudy",
    email: "maudy123456789@gmail.com",
    password: "123456",
    ponsel: "081345678910",
  };

  const handleModalPopup = (val) => {
    if (val === "open") {
      setShow(true);
    } else if (val === "close") {
      setShow(false);
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
            margin-bottom: ${isOpenNonaktifAkun ? "16px" : "0px"};
          }
          .m-wrapper {
            padding: 0px 16px 0px 16px;
            width: 100%;
          }
        `}
      </style>
      <ModalPopupNonaktifAkun
        isOpen={show}
        onClick={() => handleModalPopup("close")}
        state={state}
      />
      <div className="box-card">
        <div className="wrap-content">
          <div className="wrap-edit">
            <Heading3>Nonaktif Akun</Heading3>
            <RectangleButton
              onClick={() => ClickEdit("nonaktif akun")}
              variant="text"
              size="small"
              customStyle={{ width: 42, height: 24, minWidth: "unset" }}
            >
              {isOpenNonaktifAkun ? "Tutup" : "Edit"}
            </RectangleButton>
          </div>
          {isOpenNonaktifAkun && (
            <div style={{ marginTop: "24px" }}>
              <div>
                <Box style={{ width: "90%" }}>
                  Akun Anda akan hilang untuk sementara dan Anda dapat
                  mengaktifikan kembali akun anda saat anda kembali login.
                </Box>

                <div style={{ marginTop: 24, marginLeft: -4 }}>
                  <RectangleButton
                    size="large"
                    customStyle={{ width: 240 }}
                    variant="ghost"
                    onClick={() => handleModalPopup("open")}
                  >
                    Nonaktif Akun
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
