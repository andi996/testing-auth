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

export default function ChangeEmail(props) {
  const {
    isOpen,
    userData,
    ClickEdit,
    setIsOpen,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [email, setEmail] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const [isKirimKodeEmail, setIsKirimKodeEmail] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleChangeEmail = (val) => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!val || regex.test(val) === false) {
      return false;
    }
    return setEmail(val);
  };

  const getInputOTP = (val) => {
    setErrorOTP(false);
    setInputOtp(val);
  };

  //SEND OTP TO EMAIL
  const sendEmailOTP = async (val) => {
    val != "resend" && setIsLoading(true);
    setErrorOTP(false);
    await API2({
      method: `POST`,
      url: endpoints.SendEmailOTP,
      data: {
        name: userData?.first_name,
        email: email,
      },
    })
      .then(() => {
        setVariantToaster("success");
        val == "resend"
          ? setLabelToaster("Kode berhasil dikirim ulang.")
          : setLabelToaster("Kode OTP berhasil dikirim.");
        setOpenToaster(true);
        setIsKirimKodeEmail(true);
        setIsLoading(false);
        setCounter(30);
      })
      .catch((err) => {
        setVariantToaster("error");
        setLabelToaster("Gagal mendapatkan kode OTP.");
        setOpenToaster(true);
        setIsLoading(false);
      });
  };

  const verifyEmailOTP = async () => {
    setErrorOTP(false);
    setIsLoading(true);
    await API2({
      method: `POST`,
      url: endpoints.VerifikasiEmailOTP,
      data: {
        email: email,
        otp: inputOtp,
      },
    })
      .then(() => {
        updateNewEmail();
      })
      .catch((err) => {
        setVariantToaster("error");
        setOpenToaster(true);
        setIsLoading(false);
        if (err?.response?.status >= 500) {
          setLabelToaster("Server error!");
          setErrorOTP(false);
        } else {
          setLabelToaster(err?.response?.data?.message[0]);
          setErrorOTP(true);
        }
      });
  };

  const updateNewEmail = async () => {
    setIsLoading(true);
    await API({
      method: `POST`,
      url: endpoints.SaveNewEmail,
      data: {
        id: userData?.source_id,
        email: email,
      },
    })
      .then(() => {
        setVariantToaster("success");
        setLabelToaster("Email berhasil diganti.");
        setOpenToaster(true);
        setIsKirimKodeEmail(false);
        setIsOpen(false);
        setIsLoading(false);
        setErrorOTP(false);
      })
      .catch((err) => {
        setVariantToaster("error");
        setOpenToaster(true);
        setIsLoading(false);
        if (err?.response?.status >= 500) {
          setLabelToaster("Server error!");
        } else {
          setLabelToaster(err?.response?.data?.message[0]);
        }
      });
  };

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        console.log(counter);
        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

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
            <Heading3>Email</Heading3>
            <RectangleButton
              onClick={() => ClickEdit("email")}
              variant="text"
              size="small"
              customStyle={{ width: 42, height: 24, minWidth: "unset" }}
            >
              {isOpen ? "Tutup" : "Edit"}
            </RectangleButton>
          </div>
          <div style={{ marginTop: "8px" }}>
            {!isOpen && <Body1>{userData?.email}</Body1>}

            {/* STEP 1 // MASUKKAN EMAIL BARU */}
            {isOpen && !isKirimKodeEmail && (
              <div style={{ marginTop: "24px" }}>
                <Box style={{ width: "90%" }}>
                  Masukkan email baru, jika Anda ingin mengganti email Anda.
                  <br />
                  Email di profil Anda akan sesuai dengan akun Anda. Pastikan
                  email Anda bisa dihubungi HR.
                </Box>
                <div style={{ marginTop: 24 }}>
                  <InputTextField
                    label="Email Saat Ini"
                    disable={true}
                    defaultValue={userData?.email}
                  />
                </div>
                <div style={{ marginTop: 24, marginBottom: 24 }}>
                  <InputTextField
                    label="Email Baru"
                    handleChange={handleChangeEmail}
                    error={email == userData?.email}
                    helperText={
                      email == userData?.email &&
                      "Tidak boleh sama dengan email sebelumnya."
                    }
                  />
                </div>
                <RectangleButton
                  size="large"
                  customStyle={{ padding: 0, width: 240 }}
                  disable={
                    email && email !== userData?.email && email !== false
                      ? false
                      : true
                  }
                  onClick={() => !isLoading && sendEmailOTP("kirim pertama")}
                  loading={isLoading}
                >
                  Kirim Kode Verifikasi
                </RectangleButton>
              </div>
            )}
            {/* END STEP 1 // MASUKKAN EMAIL BARU */}

            {/* STEP 2 // VERIFIKASI KODE OTP */}
            {isOpen && isKirimKodeEmail && (
              <div>
                <Box style={{ width: "90%" }}>
                  Masukan kode verifikasi, cek email{" "}
                  <span
                    style={{
                      color: Colors.secondary.clear_blue,
                    }}
                  >
                    {email}
                  </span>
                </Box>
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
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
                    // onClick={() => alert("verifikasi")}
                    onClick={!isLoading && verifyEmailOTP}
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
                    onClick={() => counter == 0 && sendEmailOTP("resend")}
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
