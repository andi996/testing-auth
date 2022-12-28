import { Box, fontWeight } from "@mui/system";
import { useEffect, useState } from "react";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import OTPField from "../../../components/Atom/Input Field/OTPField";
import InputPasswordField from "../../../components/Atom/Input Field/PasswordField";
import InputTextField from "../../../components/Atom/Input Field/TextField";
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
import Toaster from "../../../components/Molecul/Toaster";
import { Colors, Elevation, Radius } from "../../../themes";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModalPopupNonaktifAkun from "../popup/ModalPopupNonaktifAkun";
import ModalPopupHapusAkun from "../popup/ModalPopupHapusAkun";
import { API, API2 } from "../../../api/service";
import { endpoints } from "../../../api/endpoint";

// const PengaturanAkun = ({ onClick, userData }) => {
import useMediaQuery from "../../../utils/useMediaQuery";
import { Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import Loader from "../../../components/Atom/Loader";
import RadioButton from "../../../components/Atom/Selection Control/Radio";
import TextArea from "../../../components/Atom/Input Field/TextArea";
import { useRouter } from "next/router";
import Divider from "../../../components/Atom/Divider";
import ChangeEmail from "./ChangeEmail";
import ChangePonsel from "./ChangePonsel";

export default function ChangeEmailMobile(props) {
  const {
    userData,
    showEmail,
    handleClose,
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
        setIsLoading(false);
        setErrorOTP(false);
        handleClose();
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

  const handleArrowBack = () => {
    if (!isKirimKodeEmail) {
      handleClose();
      return;
    }
    setIsKirimKodeEmail(false);
  };

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => {
        console.log(counter);
        setCounter(counter - 1);
      }, 1000);
  }, [counter]);

  return (
    <Dialog fullScreen open={showEmail}>
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
              Email
            </Heading4>
          </Box>
        </Toolbar>
      </AppBar>

      {/* STEP 1 // MASUKKAN EMAIL BARU */}
      {!isKirimKodeEmail && (
        <div style={{ margin: "16px 16px 16px 16px" }}>
          <Box
            style={{ fontSize: "12px", color: Colors.neutral.greyish_brown }}
          >
            Masukkan email baru, jika Anda ingin mengganti email Anda.
            <br />
            Email di profil Anda akan sesuai dengan akun Anda. Pastikan email
            Anda bisa dihubungi HR.
          </Box>
          <div style={{ marginTop: 24 }}>
            <InputTextField
              label="Email Saat Ini"
              disable={true}
              defaultValue={userData?.email}
              minWidth="0px"
              fullWidth
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
              minWidth="0px"
              fullWidth
            />
          </div>
          <RectangleButton
            // size="large"
            customStyle={{ width: "100%" }}
            disable={
              email && email !== userData?.email && email !== false
                ? false
                : true
            }
            onClick={() => !isLoading && sendEmailOTP("kirim pertama")}
            loading={isLoading}
          >
            <span style={{ fontSize: "14px" }}>Kirim Kode Verifikasi</span>
          </RectangleButton>
        </div>
      )}
      {/* END STEP 1 // MASUKKAN EMAIL BARU */}

      {/* STEP 2 // VERIFIKASI KODE OTP */}
      {isKirimKodeEmail && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "16px 16px 16px 16px" }}>
            <Box
              style={{
                width: "90%",
                fontSize: "12px",
                color: Colors.neutral.greyish_brown,
              }}
            >
              Masukan kode verifikasi, cek email
            </Box>
            <Box
              style={{ fontSize: "12px", color: Colors.secondary.clear_blue }}
            >
              {email}
            </Box>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                width: "100%",
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
                onClick={() => counter == 0 && sendEmailOTP("resend")}
              >
                {counter > 0 ? `${counter} detik` : "Kirim Ulang"}
              </span>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
