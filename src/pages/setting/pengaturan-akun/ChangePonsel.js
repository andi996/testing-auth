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

export default function ChangePonsel(props) {
  const {
    userData,
    isOpenNoTlp,
    ClickEdit,
    state,
    setIsOpenNoTlp,
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
    }

    if (val == "nomor ponsel") {
      setVariantToaster("success");
      setLabelToaster("Kode berhasil dikirim.");
      setOpenToaster(true);
      setIsKirimKodeTlp(true);
      setValueGenerateOtp(OTP);
      console.log(OTP);
      setCounter(30);
    }
  };

  const clickVerifikasi = (val) => {
    if (val == "nomor ponsel") {
      if (valueGenerateOtp !== inputOtp) {
        setErrorOTP(true);
      } else {
        setErrorOTP(false);

        setIsKirimKodeTlp(false);
        setIsOpenNoTlp(false);

        setOpenToaster(false);

        setVariantToaster("success");
        setLabelToaster("Nomor Ponsel berhasil diganti.");
        setOpenToaster(true);
        setCounter(0);
      }
    }
  };

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        console.log(counter);
        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

  console.log(userData);

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
            margin-bottom: 16px;
          }
          .m-wrapper {
            padding: 0px 16px 0px 16px;
            width: 100%;
          }
        `}
      </style>
      <div className="box-card">
        <div className="wrap-content">
          <div className="wrap-edit">
            <Heading3>Nomor Ponsel</Heading3>
            <RectangleButton
              onClick={() => ClickEdit("nomor ponsel")}
              variant="text"
              size="small"
              customStyle={{ width: 42, height: 24, minWidth: "unset" }}
            >
              {isOpenNoTlp ? "Tutup" : "Edit"}
            </RectangleButton>
          </div>
          <div style={{ marginTop: "8px" }}>
            {!isOpenNoTlp && <Body1>{state?.ponsel}</Body1>}

            {/* STEP 1 // MASUKKAN PONSEL BARU */}
            {isOpenNoTlp && !isKirimKodeTlp && (
              <div style={{ marginTop: "24px" }}>
                <Box>
                  Masukkan nomor ponsel baru, jika Anda ingin mengganti nomor
                  ponsel Anda. <br />
                  Nomor ponsel di profil Anda akan sesuai dengan akun Anda.
                  Pastikan nomor ponsel yang didaftar terhubung dengan Whatsapp
                </Box>
                <div style={{ marginTop: 24 }}>
                  <InputTextField
                    label="Nomor Ponsel Saat Ini"
                    disable={true}
                    defaultValue={state?.ponsel}
                  />
                </div>
                <div style={{ marginTop: 24, marginBottom: 24 }}>
                  <InputTextField
                    label="Nomor Ponsel Baru"
                    handleChange={handleInputPonsel}
                    error={error?.phone?.status && true}
                    helperText={
                      error?.phone?.status ? error?.phone?.text : null
                    }
                  />
                </div>
                <RectangleButton
                  size="large"
                  customStyle={{ width: 240 }}
                  disable={
                    nomorPonsel &&
                    nomorPonsel !== state?.ponsel &&
                    !error?.phone?.status
                      ? false
                      : true
                  }
                  onClick={() => kirimKodeVerifikasi("nomor ponsel")}
                >
                  Kirim Kode Verifikasi
                </RectangleButton>
              </div>
            )}
            {/* END STEP 1 // MASUKKAN PONSEL BARU */}

            {/* STEP 2 // VERIFIKASI KODE OTP */}
            {isOpenNoTlp && isKirimKodeTlp && (
              <div>
                <Box style={{ width: "90%" }}>
                  Masukkan Kode verifikasi, Cek Whatsapp Anda
                </Box>
                <div
                  style={{
                    marginTop: 24,
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
                <div style={{ marginTop: 24 }}>
                  <RectangleButton
                    size="large"
                    customStyle={{ width: 240 }}
                    onClick={() => clickVerifikasi("nomor ponsel")}
                    disable={inputOtp?.length == 6 ? false : true}
                    //   disable={true}
                  >
                    Verifikasi
                  </RectangleButton>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    fontSize: "14px",
                    fontWeight: 400,
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
                    onClick={() =>
                      counter == 0 && kirimKodeVerifikasi("resend")
                    }
                  >
                    {counter > 0 ? `${counter} detik` : "Kirim Ulang"}
                  </span>
                </div>
              </div>
            )}
            {/* END STEP 2 // VERIFIKASI OTP */}
          </div>
        </div>
      </div>
    </>
  );
}
