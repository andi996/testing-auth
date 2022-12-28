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

export default function ChangePonselMobile(props) {
  const {
    showPonsel,
    handleClose,
    userData,
    state,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [nomorPonsel, setNomorPonsel] = useState("");

  const [inputOtp, setInputOtp] = useState("");
  const [valueGenerateOtp, setValueGenerateOtp] = useState("");
  const [errorOTP, setErrorOTP] = useState(false);

  const [isKirimKodeTlp, setIsKirimKodeTlp] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const [error, setError] = useState({});

  const handleInputPonsel = (val) => {
    const newError = {
      phone: { status: false, text: "" },
    };
    // Validasi Angka
    if (!val?.match(`^[0-9]*$`)) {
      newError.phone.status = true;
      newError.phone.text = "Hanya boleh diisi angka";
    } else {
      if (val?.length < 10) {
        newError.phone.status = true;
        newError.phone.text = "Minimal 10 digit";
      }

      if (val?.length > 13) {
        newError.phone.status = true;
        newError.phone.text = "Maksimal 13 digit";
      }
    }

    if (!val) {
      setError({ phone: { status: false, text: "" } });
    } else {
      setError(newError);
    }
    setNomorPonsel(val);
  };

  const getInputOTP = (val) => {
    setErrorOTP(false);
    setInputOtp(val);
  };

  const kirimKodeVerifikasi = (val) => {
    setIsLoading(true);
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    //====================

    if (val == "resend") {
      setVariantToaster("success");
      setLabelToaster("Kode berhasil dikirim ulang.");
      setOpenToaster(true);
      setIsKirimKodeTlp(true);
      setValueGenerateOtp(OTP);
      console.log(OTP);
      setCounter(30);
      setIsLoading(false);
    }

    if (val == "nomor ponsel") {
      setVariantToaster("success");
      setLabelToaster("Kode berhasil dikirim.");
      setOpenToaster(true);
      setIsKirimKodeTlp(true);
      setValueGenerateOtp(OTP);
      console.log(OTP);
      setCounter(30);
      setIsLoading(false);
    }
  };

  const clickVerifikasi = (val) => {
    setIsLoading(true);
    if (val == "nomor ponsel") {
      if (valueGenerateOtp !== inputOtp) {
        setErrorOTP(true);
        setIsLoading(false);
      } else {
        setErrorOTP(false);

        setIsKirimKodeTlp(false);

        setOpenToaster(false);

        setVariantToaster("success");
        setLabelToaster("Nomor Ponsel berhasil diganti.");
        setOpenToaster(true);
        setCounter(0);
        setIsLoading(false);
        handleClose();
      }
    }
  };

  const handleArrowBack = () => {
    if (!isKirimKodeTlp) {
      handleClose();
      return;
    }
    setIsKirimKodeTlp(false);
  };

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        console.log(counter);
        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

  return (
    <Dialog fullScreen open={showPonsel}>
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "white",
          borderBottom: "1px solid #EEEEEE",
        }}
        elevation={0}
      >
        <Toolbar style={{ background: "white" }}>
          <IconButton
            edge="start"
            onClick={handleArrowBack}
            aria-label="close"
            backgroundColor={Colors.neutral.brown_grey}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box m="auto">
            <Heading4
              style={{
                color: Colors.primary.mid_blue,
              }}
            >
              Nomor Ponsel
            </Heading4>
          </Box>
        </Toolbar>
      </AppBar>

      {/* STEP 1 // MASUKKAN PONSEL BARU */}
      {!isKirimKodeTlp && (
        <div style={{ margin: "16px 16px 16px 16px" }}>
          <Box
            style={{ fontSize: "12px", color: Colors.neutral.greyish_brown }}
          >
            Masukkan nomor ponsel baru, jika Anda ingin mengganti nomor ponsel
            Anda. <br />
            Nomor ponsel di profil Anda akan sesuai dengan akun Anda. Pastikan
            nomor ponsel yang didaftar terhubung dengan Whatsapp
          </Box>
          <div style={{ marginTop: 16 }}>
            <InputTextField
              label="Nomor Ponsel Saat Ini"
              disable={true}
              defaultValue={state?.ponsel}
              minWidth="0px"
              fullWidth
            />
          </div>
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <InputTextField
              label="Nomor Ponsel Baru"
              handleChange={handleInputPonsel}
              error={error?.phone?.status && true}
              helperText={error?.phone?.status ? error?.phone?.text : null}
              minWidth="0px"
              fullWidth
            />
          </div>
          <RectangleButton
            // size="large"
            customStyle={{ width: "100%" }}
            disable={
              nomorPonsel &&
              nomorPonsel !== state?.ponsel &&
              !error?.phone?.status
                ? false
                : true
            }
            loading={isLoading}
            onClick={() => !isLoading && kirimKodeVerifikasi("nomor ponsel")}
          >
            Kirim Kode Verifikasi
          </RectangleButton>
        </div>
      )}

      {/* END STEP 1 // MASUKKAN PONSEL BARU */}

      {/* STEP 2 // VERIFIKASI KODE OTP */}
      {isKirimKodeTlp && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "16px 16px 16px 16px" }}>
            <Box
              style={{
                width: "90%",
                fontSize: "12px",
                color: Colors.neutral.greyish_brown,
              }}
            >
              Masukkan Kode verifikasi, Cek Whatsapp Anda
            </Box>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
              }}
            >
              <OTPField
                error={errorOTP}
                numInputs={6}
                getInputOTP={getInputOTP}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <RectangleButton
                // size="large"
                customStyle={{ width: "100%", maxWidth: "316px" }}
                onClick={() => !isLoading && clickVerifikasi("nomor ponsel")}
                disable={inputOtp?.length == 6 ? false : true}
                loading={isLoading}
              >
                Verifikasi
              </RectangleButton>
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: "14px",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              {counter > 0
                ? "Kirim ulang kode? Mohon tunggu dalam "
                : "Tidak menerima kode? "}
              <span
                className="link pointer"
                style={{
                  color: Colors.primary.mid_blue,
                  cursor: counter == 0 ? "pointer" : "default",
                }}
                onClick={() => counter == 0 && kirimKodeVerifikasi("resend")}
              >
                {counter > 0 ? `${counter} detik` : "Kirim Ulang"}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* END STEP 2 // VERIFIKASI OTP */}
    </Dialog>
  );
}
