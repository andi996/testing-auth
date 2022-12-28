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

export default function ChangePasswordMobile(props) {
  const {
    showPassword,
    handleClose,
    userData,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [disableGantiPass, setDisableGantiPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const handleCurrentPassword = (val) => {
    setCurrentPassword(val);
  };

  const handleNewPassword = (key, val) => {
    const formKey = key === "password" ? "confirmPassword" : "password";
    const newError = {
      password: { status: false, text: "" },
      confirmPassword: { status: false, text: "" },
    };

    if (key === "password" || key === "confirmPassword") {
      if (key === "password") {
        if (!val?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
          newError.password.status = true;
          newError.password.text =
            "Minimal 8 karakter, huruf kapital, dan angka.";
        } else {
          setNewPassword1(val);
        }
        if (val == "") {
          newError.password.text = "";
        }
      }

      if (key === "confirmPassword") {
        if (form?.hasOwnProperty("password")) {
          if (!form?.password?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
            newError.password.status = true;
          } else {
            setNewPassword2(val);
          }
        }
      }

      if (val !== form[formKey]) {
        if (form.hasOwnProperty(formKey) && form[formKey] !== "") {
          newError.confirmPassword.status = true;
          newError.confirmPassword.text = "Password tidak sama";
        }
      }
    } else {
      if (form?.password !== form?.confirmPassword) {
        newError.confirmPassword.status = true;
        newError.confirmPassword.text = "Password tidak sama";
      }
    }

    setError({ ...error, ...newError });

    setForm({
      ...form,
      [key]: val,
    });
  };

  const saveNewPassword = async () => {
    setIsLoading(true);
    let submitForm = {
      id: userData?.source_id,
      old_password: currentPassword,
      password: newPassword2,
    };

    await API({
      method: `POST`,
      url: endpoints.SaveNewPassword,
      data: submitForm,
    })
      .then(() => {
        setVariantToaster("success");
        setOpenToaster(true);
        setLabelToaster("Password berhasil diganti.");
        setIsLoading(false);
        handleClose();
      })
      .catch((err) => {
        setOpenToaster(true);
        setVariantToaster("error");
        setIsLoading(false);
        if (err?.response?.status >= 500) {
          setLabelToaster("Server error!");
          return;
        }
        if (err?.response?.data?.message) {
          setLabelToaster(err?.response?.data?.message[0]);
          return;
        }
        setLabelToaster("Gagal mengubah password.");
      });
  };

  useEffect(() => {
    currentPassword && newPassword1 && newPassword2
      ? newPassword1 === newPassword2
        ? setDisableGantiPass(false)
        : setDisableGantiPass(true)
      : setDisableGantiPass(true);
  }, [newPassword1, newPassword2, currentPassword]);

  return (
    <Dialog fullScreen open={showPassword} onClose={handleClose}>
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
            onClick={handleClose}
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
              Password
            </Heading4>
          </Box>
        </Toolbar>
      </AppBar>
      {/* MOBILE PASSWORD */}
      <div style={{ margin: "16px 16px" }}>
        <div>
          <Box style={{ width: "100%", fontSize: "12px" }}>
            Masukkan password sekarang dan password baru.
          </Box>
          <div style={{ marginTop: 16, maxWidth: 500 }}>
            <InputPasswordField
              label="Password Saat Ini"
              // defaultValue={state.password}
              handleChange={(val) => handleCurrentPassword(val)}
              fullWidth
            />
          </div>
          <div style={{ marginTop: 16, marginBottom: 16, maxWidth: 500 }}>
            <InputPasswordField
              label="Password Baru"
              helperText="Minimal 8 karakter, huruf kapital, dan angka."
              passwordStrength={true}
              handleChange={(val) => handleNewPassword("password", val)}
              error={error?.password?.status && true}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: 16, maxWidth: 500 }}>
            <InputPasswordField
              label="Konfirmasi Password Baru"
              handleChange={(val) => handleNewPassword("confirmPassword", val)}
              error={error?.confirmPassword?.status && true}
              helperText={
                error?.confirmPassword?.status && error?.confirmPassword?.text
              }
              fullWidth
            />
          </div>
          <RectangleButton
            // size="large"
            customStyle={{ width: "100%" }}
            disable={disableGantiPass}
            onClick={saveNewPassword}
            loading={isLoading}
          >
            Ganti Password
          </RectangleButton>
        </div>
      </div>
    </Dialog>
  );
}
