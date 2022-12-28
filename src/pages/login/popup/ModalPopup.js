import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Colors, Radius, Elevation } from "../../../themes";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../../../components/Atom/Typography";
import styled from "@emotion/styled/base";
import { Box } from "@mui/system";
import Toaster from "../../../components/Molecul/Toaster";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import Modal from "../modal/index2";

// MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";

import InputPrefixRp from "../../../components/Atom/Input Field/Prefix/PrefixRp";

export default function ModalPopupNotif({
  show,
  setShowModal,
  inputEmailOrPonsel,
  inputIsNumber,
}) {
  const router = useRouter();

  const [openToaster, setOpenToaster] = useState(false);
  const [removedCV, setRemovedCV] = useState("");
  const [showConfirmRemovePopup, setShowConfirmRemovePopup] = useState(false);
  const [showPopupCancel, setShowPopupCancel] = useState(false);

  const [isDone, setIsDone] = useState(false);

  const [valueGaji, setValueGaji] = useState();

  const handleButton = (val) => {
    if (val === "continue") {
      setIsDone(true);
      setShowModal(false);
    } else if (val === "cancel") {
      setShowPopupCancel(false);
      setShowModal(false);
    }
  };

  // styles

  const borderBox = {
    border: `1px solid ${Colors.neutral.light_grey}`,
    borderRadius: Radius.small,
    padding: `16px`,
  };

  const dflex = {
    display: `flex`,
    alignItems: `center`,
  };

  // component

  const BackdropContent = styled("div")`
    display: ${showPopupCancel ? "block" : "none"};
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: ${Radius.medium};
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
  `;

  return (
    <div>
      <Toaster
        open={openToaster}
        variant={`undo`}
        label={` berhasil dihapus`}
        setOpen={() => setOpenToaster(false)}
      />

      <Modal show={show}>
        <BackdropContent />

        <Box
          m="24px"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Heading3>
            {inputIsNumber ? "Nomor" : "Email"} Belum Terdaftar
          </Heading3>
          <Box mt="12px">
            <Body1>
              Lanjut daftar dengan {inputIsNumber ? "nomor" : "email"}{" "}
              {inputEmailOrPonsel}?
            </Body1>
          </Box>
          <Box
            mt="16px"
            style={{ display: "flex", flexDirection: "row", gap: "8px" }}
          >
            <div style={{ width: 163 }}>
              <RectangleButton
                variant="ghost"
                customStyle={{ padding: 0 }}
                fullWidth
                onClick={() => handleButton("cancel")}
              >
                Ubah
              </RectangleButton>
            </div>
            <div style={{ width: 163 }}>
              <RectangleButton
                customStyle={{ padding: 0 }}
                fullWidth
                onClick={() => router.push("/register")}
              >
                Buat Akun
              </RectangleButton>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
