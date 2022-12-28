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
import InputPasswordField from "../../../components/Atom/Input Field/PasswordField";
import { endpoints } from "../../../api/endpoint";
import { API } from "../../../api/service";

export default function ChangePassword(props) {
  const {
    userData,
    isOpenPassword,
    setIsOpenPassword,
    ClickEdit,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [disableGantiPass, setDisableGantiPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

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
        setIsOpenPassword(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setOpenToaster(true);
        setVariantToaster("error");
        setIsLoading(false);
        if (err?.response?.status >= 500) {
          setLabelToaster("Server error!");
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
            margin-bottom: ${isOpenPassword ? "16px" : "0px"};
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
            <Heading3>Password</Heading3>
            <RectangleButton
              onClick={() => ClickEdit("password")}
              variant="text"
              size="small"
              customStyle={{ width: 42, height: 24, minWidth: "unset" }}
            >
              {isOpenPassword ? "Tutup" : "Edit"}
            </RectangleButton>
          </div>
          {isOpenPassword && (
            <div style={{ marginTop: 24 }}>
              <div>
                <Box style={{ width: "90%" }}>
                  Masukkan password sekarang dan password baru.
                </Box>
                <div style={{ marginTop: 24, maxWidth: 500 }}>
                  <InputPasswordField
                    label="Password Saat Ini"
                    // defaultValue={state.password}
                    handleChange={(val) => handleCurrentPassword(val)}
                    fullWidth
                  />
                </div>
                <div style={{ marginTop: 24, marginBottom: 24, maxWidth: 500 }}>
                  <InputPasswordField
                    label="Password Baru"
                    helperText="Minimal 8 karakter, huruf kapital, dan angka."
                    passwordStrength={true}
                    handleChange={(val) => handleNewPassword("password", val)}
                    error={error?.password?.status && true}
                    fullWidth
                  />
                </div>
                <div style={{ marginBottom: 24, maxWidth: 500 }}>
                  <InputPasswordField
                    label="Konfirmasi Password Baru"
                    handleChange={(val) =>
                      handleNewPassword("confirmPassword", val)
                    }
                    error={error?.confirmPassword?.status && true}
                    helperText={
                      error?.confirmPassword?.status &&
                      error?.confirmPassword?.text
                    }
                    fullWidth
                  />
                </div>
                <RectangleButton
                  size="large"
                  customStyle={{ width: 240 }}
                  disable={disableGantiPass}
                  onClick={saveNewPassword}
                  loading={isLoading}
                >
                  Ganti Password
                </RectangleButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
