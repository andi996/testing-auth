import * as React from "react";
import { useState, useEffect } from "react";
import Modal from "../modal";
import {
  Body1,
  Body3,
  Heading2,
  Heading3,
  Heading4,
} from "../../../components/Atom/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Colors, Radius, Elevation } from "../../../themes";
import styled from "@emotion/styled/base";
import Box from "@mui/material/Box";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import InputPasswordField from "../../../components/Atom/Input Field/PasswordField";
import Toaster from "../../../components/Molecul/Toaster";

export default function ModalPopupLogoutAll({
  isOpen,
  onClick,
  handleChange,
  state,
  namaDevice,
  data,
}) {
  const [showPopupCancel, setShowPopupCancel] = useState(false);

  //   ====================================================
  const [openToaster, setOpenToaster] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  //   ====================================================

  const Flex = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

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

  const Header = ({ children }) => {
    return (
      <Flex>
        <Flex>{children}</Flex>
        <CloseIcon
          style={{ cursor: `pointer` }}
          onClick={() => {
            onClick();
          }}
        />
      </Flex>
    );
  };

  //   =========================
  useEffect(() => {
    setPassword(state?.password);
  }, [state]);

  const handleButton = (val) => {
    if (val === "continue") {
      if (password == inputPassword) {
        setIsDone(true);
        onClick();
        setOpenToaster(false);
        setTimeout(() => {
          setOpenToaster(true);
        }, 100);
      } else {
        // alert("password salah");
        setIsPasswordError(true);
      }
    } else if (val === "cancel") {
      setShowPopupCancel(false);
    }
  };

  useEffect(() => {
    handleChange(isDone, namaDevice);
    setIsDone(false);
  });

  const handlePassword = (value) => {
    setInputPassword(value);
    if (inputPassword !== value) {
      setIsPasswordError(false);
    }
  };
  //   ================ HANDLE ===========

  return (
    <>
      <Toaster
        open={openToaster}
        variant="success"
        label={`Device berhasil di-logout`}
        setOpen={() => setOpenToaster(false)}
      />
      <Modal show={isOpen}>
        <BackdropContent />

        <Box m="24px" mb={isPasswordError ? "4px" : "24px"}>
          <Modal.Header>
            <Header>
              <Heading3 style={{ textTransform: "capitalize" }}>
                Logout dari Semua Device
              </Heading3>
            </Header>
          </Modal.Header>

          <Modal.Body variant="logout">
            <Box mb="32px" mt="32px">
              <Box style={{ color: Colors.neutral.greyish_brown }}>
                <Body1>Masukan Password Anda untuk me-logout device</Body1>
              </Box>
            </Box>
          </Modal.Body>

          <Modal.Footer variant="logout">
            <Box>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  gap: 24,
                }}
              >
                <div style={{ width: 220 }}>
                  <InputPasswordField
                    label="Password"
                    handleChange={handlePassword}
                    fullWidth={true}
                    error={isPasswordError}
                    helperText={isPasswordError ? "Password anda salah!" : null}
                  />
                </div>

                <RectangleButton
                  size="large"
                  customStyle={{
                    width: 240,
                    marginBottom: isPasswordError ? "20px" : null,
                  }}
                  onClick={() => handleButton("continue")}
                  // variant="text"
                  disable={!inputPassword}
                >
                  Logout Device
                </RectangleButton>
              </div>
            </Box>
          </Modal.Footer>
        </Box>
      </Modal>
    </>
  );
}
