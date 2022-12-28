import React, { useEffect, useState } from "react";
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
import Modal from "../modal";

// MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";

import InputPrefixRp from "../../../components/Atom/Input Field/Prefix/PrefixRp";

export default function ModalPopupNotifLoker({ show, setShow }) {
  const [openToaster, setOpenToaster] = useState(false);
  const [removedCV, setRemovedCV] = useState("");
  const [showConfirmRemovePopup, setShowConfirmRemovePopup] = useState(false);
  const [showPopupCancel, setShowPopupCancel] = useState(false);

  const [isDone, setIsDone] = useState(false);

  const [valueGaji, setValueGaji] = useState();

  const [form, setForm] = useState({
    posisi_pekerjaan: ``,
    fungsi_pekerjaan: ``,
    tipe_pekerjaan: ``,
    lokasi: ``,
    gaji: 0,
  });

  const handleButton = (val) => {
    if (val === "continue") {
      setIsDone(true);
      setShow(false);
    } else if (val === "cancel") {
      setShowPopupCancel(false);
      setShow(false);
    }
  };

  const options = [
    {
      label: "Saya mempunyai alasan pribadi",
      value: "Saya mempunyai alasan pribadi",
    },
    {
      label: "Saya mendapatkan terlalu banyak email",
      value: "Saya mendapatkan terlalu banyak email",
    },
    {
      label: "Saya sudah mempunyai pekerjaan tetap",
      value: "Saya sudah mempunyai pekerjaan tetap",
    },
    { label: "Lain-lain", value: "Lain-lain" },
  ];

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

      <Modal show={show} variant="notifLoker">
        <BackdropContent />

        <Box m="24px">
          <Box>
            <Modal.Header variant="notifLoker">
              <Box sx={dflex} justifyContent="space-between">
                <Box
                  sx={dflex}
                  style={{
                    cursor: "pointer",
                    color: Colors.primary.mid_blue,
                    gap: "4px",
                  }}
                  onClick={() => handleButton("cancel")}
                >
                  <ArrowBackIcon
                    style={{
                      width: "16px",
                    }}
                  />
                  <Heading5>Kembali</Heading5>
                </Box>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: Colors.primary.mid_blue,
                    gap: "4px",
                  }}
                >
                  <HelpOutlineIcon
                    style={{
                      width: "16px",
                    }}
                  />
                  <Heading5>Bantuan</Heading5>
                </div>
              </Box>
            </Modal.Header>
          </Box>

          <Box>
            <Modal.Body minHeight="444px" variant="notifLoker">
              <Box>
                <Box>
                  <Heading2>Preferensi Pekerjaan</Heading2>
                  <Body1 mt="4px" color={Colors.neutral.brown_grey}>
                    Temukan lowongan sesuai Preferensi Anda! Jangan khawatir
                    preferensi dapat Anda perbaharui kapanpun.
                  </Body1>
                </Box>

                <Box
                  mt="20px"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "22px",
                  }}
                >
                  <InputSelectField
                    label="Posisi Pekerjaan*"
                    fullWidth={true}
                    defaultValue={form.posisi_pekerjaan}
                    options={[
                      {
                        label: "Product Designer",
                        value: "Product Designer",
                      },
                      { label: "DesignOps", value: "DesignOps" },
                    ]}
                    handleChange={(value) =>
                      setForm({ ...form, posisi_pekerjaan: value })
                    }
                  />
                  <InputSelectField
                    label="Fungsi Pekerjaan*"
                    fullWidth={true}
                    defaultValue={form.fungsi_pekerjaan}
                    options={[
                      { label: "Kreatif", value: "Kreatif" },
                      { label: "Administration", value: "Administration" },
                      {
                        label: "Engineer, Agricultural",
                        value: "Engineer, Agricultural",
                      },
                      { label: "Arsitek", value: "Arsitek" },
                      { label: "Chemist", value: "Chemist" },
                      {
                        label: "Banking Operations",
                        value: "Banking Operations",
                      },
                      { label: "General Affairs", value: "General Affairs" },
                      {
                        label: "Product Development",
                        value: "Product Development",
                      },
                    ]}
                    handleChange={(value) =>
                      setForm({ ...form, fungsi_pekerjaan: value })
                    }
                  />
                  <InputSelectField
                    label="Tipe Pekerjaan*"
                    fullWidth={true}
                    defaultValue={form.tipe_pekerjaan}
                    options={[
                      { label: "Designer", value: "Designer" },
                      { label: "Full-time", value: "Full-time" },
                      { label: "Internship", value: "Internship" },
                      { label: "Temporary", value: "Temporary" },
                      { label: "Contract", value: "Contract" },
                    ]}
                    handleChange={(value) =>
                      setForm({ ...form, tipe_pekerjaan: value })
                    }
                  />
                  <InputSelectField
                    label="Lokasi*"
                    fullWidth={true}
                    defaultValue={form.lokasi}
                    options={[
                      { label: "Jakarta", value: "Jakarta" },
                      { label: "Bogor", value: "Bogor" },
                      { label: "Tangerang", value: "Tangerang" },
                      { label: "Bekasi", value: "Bekasi" },
                      { label: "Depok", value: "Depok" },
                      { label: "Bandung", value: "Bandung" },
                    ]}
                    handleChange={(value) =>
                      setForm({ ...form, lokasi: value })
                    }
                  />
                  <InputPrefixRp
                    label={`Gaji Diinginkan`}
                    defaultValue={form.gaji}
                    helperText={`Masukan gaji Anda inginkan untuk meningkatkan pengalaman Anda dalam mencari lowongan.`}
                    handleChange={(value) => setForm({ ...form, gaji: value })}
                  />
                </Box>
              </Box>
            </Modal.Body>
          </Box>

          {/* MODAL FOOTER */}
          <Box>
            <Modal.Footer variant="notifLoker">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  gap: "16px",
                  marginTop: "24px",
                }}
              >
                <RectangleButton
                  size="large"
                  customStyle={{ width: "100%" }}
                  onClick={() => handleButton("continue")}
                  disable={
                    form.fungsi_pekerjaan.length == 0 ||
                    form.tipe_pekerjaan.length == 0 ||
                    form.lokasi.length == 0 ||
                    form.posisi_pekerjaan.length == 0 ||
                    form.gaji == 0 ||
                    form.gaji == ""
                  }
                >
                  Simpan
                </RectangleButton>

                <RectangleButton
                  size="large"
                  customStyle={{ width: "100%" }}
                  onClick={() => handleButton("cancel")}
                  variant="ghost"
                >
                  Batal
                </RectangleButton>
              </div>
            </Modal.Footer>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
