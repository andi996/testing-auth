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
import RadioButton from "../../../components/Atom/Selection Control/Radio";
import TextArea from "../../../components/Atom/Input Field/TextArea";
import InputPasswordField from "../../../components/Atom/Input Field/PasswordField";
import Loader from "../../../components/Atom/Loader";

const options = {
  customOption: [
    {
      question: "Ceritakan kepada kami alasan anda menutup akun",

      answers: [
        "Saya mempunyai 2 Akun",
        "Saya mempunyai alasan pribadi",
        "Saya mendapatkan terlalu banyak email",
        "Saya sudah mempunyai pekerjaan tetap",
        "Lain-lain",
      ],
    },
  ],
};

const styleConfirmationDelete = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 328,
  height: 168,
  bgcolor: "background.paper",
  boxShadow: Elevation.modal,
  borderRadius: Radius.medium,
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "100",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
};

const ModalStylesBackdrop = {
  position: `fixed`,
  zIndex: 1111,
  right: 0,
  top: 0,
  bottom: 0,
  left: 0,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  backgroundColor: "rgb(30, 30, 30, 0.5)",
};

export default function HapusAkunMobile(props) {
  const {
    showHapusAcc,
    handleClose,
    userData,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [formHapusAcc, setFormHapusAcc] = useState(false);
  const [passHapusAcc, setPassHapusAcc] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [bar, setBar] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [valueMasukan, setValueMasukan] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const [inputPassword, setInputPassword] = useState("");
  const [password, setPassword] = useState("123456");
  const [showDialogLoading, setShowDialogLoading] = useState(false);

  const handleDialogHapusAkun = (val) => {
    if (val === "form") {
      setFormHapusAcc(true);
    } else if (val === "password") {
      setPassHapusAcc(true);
    }
  };

  const handleSelectAnswer = (e, index) => {
    let answers = [...selectedAnswer];
    answers[index] = e.target.value;
    setSelectedAnswer(answers);
  };

  const handleChangeMasukan = (e) => {
    e.preventDefault();
    setValueMasukan(e.target.value);
  };

  const handlePassword = (value) => {
    setInputPassword(value);
    if (inputPassword !== value) {
      setIsPasswordError(false);
    }
  };

  const handleButton = (val) => {
    if (val === "continue") {
      const maxBar = 1;

      if (bar + 1 <= maxBar) {
        setBar(bar + 1);
        return;
      }

      if (password !== inputPassword) {
        setIsPasswordError(true);
        return;
      }

      //jika password benar

      setSelectedAnswer([]);
      setValueMasukan("");
      setConfirmation(true);
      return;
    }

    if (val === "cancel") {
      if (bar > 0) {
        setBar((prevBar) => prevBar - 1);
        return;
      } else {
        setFormHapusAcc(false);
        setSelectedAnswer([]);
        setValueMasukan("");
        return;
      }
    }
  };

  const handleHapusAkun = () => {
    setShowDialogLoading(true);
    setTimeout(() => {
      //   router.push("/");
      setBar(0);
      setConfirmation(false);
      setFormHapusAcc(false);
      handleClose();
      setShowDialogLoading(false);
    }, 3000);
  };

  const handleArrowBack = () => {
    if (bar > 0) {
      setBar((prevBar) => prevBar - 1);
      return;
    }
    if (!formHapusAcc) {
      handleClose();
      return;
    }
    setFormHapusAcc(false);
    setSelectedAnswer([]);
    setValueMasukan("");
    return;
  };

  useEffect(() => {
    if (selectedAnswer.length !== 0 && valueMasukan.length >= 30) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [selectedAnswer, valueMasukan]);

  return (
    <>
      <Dialog fullScreen open={showDialogLoading}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px solid #EEEEEE",
          }}
          elevation={0}
        >
          <Toolbar style={{ background: "white", backgroundColor: "white" }}>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.secondary.red,
                }}
              >
                Hapus Akun
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div>
          <Box sx={style}>
            <img
              src="/images/Principle/Illustration/success-delete-account.png"
              alt="image-success-delete-account"
            />
            <Heading4 color={Colors.neutral.greyish_brown} mt="8px" mb="4px">
              Akun berhasil dihapus
            </Heading4>
            <Body2 color={Colors.neutral.brown_grey} mb="24px">
              Terima kasih telah menggunakan layanan kami!
            </Body2>
            <Loader />
          </Box>
        </div>
      </Dialog>
      {/* END MODAL SUCCESS HAPUS AKUN */}

      <Dialog fullScreen open={showHapusAcc}>
        <AppBar
          sx={{
            position: "sticky",
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
                  color: Colors.secondary.red,
                }}
              >
                Hapus Akun
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "16px 16px" }}>
          {formHapusAcc ? (
            <Box mb="16px">
              <Box
              // padding={
              //   isPasswordError ? "6px 16px 6px 16px" : "6px 16px 24px 16px"
              // }
              >
                <Box>
                  {bar === 0 ? (
                    <Box>
                      {options?.customOption?.map((item, index) => {
                        return (
                          <>
                            <Box mb="24px">
                              <Body3
                                style={{ color: Colors.neutral.greyish_brown }}
                              >
                                {item?.question}
                              </Body3>
                            </Box>
                            <Box ml="4px">
                              <RadioButton
                                value={selectedAnswer[index] ?? ""}
                                defaultValue={item.answers.map((answer) => {
                                  return selectedAnswer == answer;
                                })}
                                onChange={(e) => handleSelectAnswer(e, index)}
                                options={item.answers.map((answer) => {
                                  return { label: answer, value: answer };
                                })}
                                variant="left"
                                type="mobile"
                              />
                            </Box>
                            <Body3 mt="30px">
                              Kami sangat menghargai keputusan Anda, kritik dan
                              masukan Anda sangat penting bagi Karir.com untuk
                              mengembangkan sistem yang lebih baik lagi, agar
                              kami dapat terus memberikan pelayanan yang terbaik
                              untuk kenyamanan anda.
                            </Body3>
                          </>
                        );
                      })}

                      <Box mt="20px">
                        <TextArea
                          label="Tulis Masukan Anda"
                          handleChange={handleChangeMasukan}
                          inputValue={valueMasukan}
                          fullWidth={true}
                        />
                      </Box>
                    </Box>
                  ) : (
                    bar === 1 && (
                      <Box
                        mt="16px"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // alignItems: "center",
                          // justifyContent: "center",
                        }}
                      >
                        <Body3 style={{ marginBottom: 20 }}>
                          Masukan Password untuk menghapus Akun
                        </Body3>
                        <div style={{ width: "100%" }}>
                          <InputPasswordField
                            label="Password"
                            handleChange={handlePassword}
                            fullWidth={true}
                            error={isPasswordError}
                            helperText={
                              isPasswordError
                                ? "Password yang anda masukkan salah!"
                                : null
                            }
                          />
                        </div>
                      </Box>
                    )
                  )}
                </Box>
                <div
                  style={{
                    // display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    gap: 24,
                    marginTop: 24,
                  }}
                >
                  <RectangleButton
                    // size="large"
                    customStyle={{ width: "100%" }}
                    onClick={() => handleButton("cancel")}
                  >
                    <Heading5>Batal</Heading5>
                  </RectangleButton>
                  {bar === 1 ? (
                    <RectangleButton
                      // size="large"
                      customStyle={{ width: "100%" }}
                      onClick={() => handleButton("continue")}
                      variant="text"
                      disable={!inputPassword}
                    >
                      <Heading5>Lanjutkan</Heading5>
                    </RectangleButton>
                  ) : (
                    <RectangleButton
                      // size="large"
                      customStyle={{ width: "100%" }}
                      onClick={() => handleButton("continue")}
                      variant="text"
                      disable={isDisable}
                    >
                      <Heading5>Lanjutkan</Heading5>
                    </RectangleButton>
                  )}
                </div>
              </Box>
            </Box>
          ) : (
            <div>
              <Box style={{ width: "100%", fontSize: "12px" }}>
                Akun Anda akan hilang permanen dan data Anda tidak akan kembali
                lagi.
              </Box>

              <div style={{ marginTop: 24 }}>
                <RectangleButton
                  // size="large"
                  customStyle={{
                    width: "100%",
                    color: Colors.secondary.red,
                    borderColor: Colors.secondary.red,
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                  variant="ghost"
                  onClick={() => handleDialogHapusAkun("form")}
                >
                  Hapus Akun
                </RectangleButton>
              </div>
            </div>
          )}
          {confirmation ? (
            <div style={ModalStylesBackdrop}>
              <Box sx={styleConfirmationDelete}>
                {/* header */}
                <Box style={{ width: "100%", textAlign: "center" }}>
                  <Heading3 style={{ color: Colors.secondary.red }}>
                    Hapus Akun
                  </Heading3>
                </Box>
                {/* content */}
                <Box style={{ marginBottom: 16, marginTop: 12 }}>
                  <Box style={{ width: 304, textAlign: "center" }}>
                    <Body3>
                      Akun Anda akan hilang secara permanen dan data Anda tidak
                      akan kembali lagi. Apakah anda yakin akan menghapus akun?
                    </Body3>
                  </Box>
                </Box>
                {/* footer */}
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: 8,
                  }}
                >
                  <RectangleButton
                    onClick={() => {
                      setConfirmation(false);
                    }}
                    customStyle={{
                      width: 148,
                      backgroundColor: Colors.secondary.red,
                    }}
                  >
                    <Heading5>Batal</Heading5>
                  </RectangleButton>
                  <RectangleButton
                    onClick={handleHapusAkun}
                    variant="text"
                    customStyle={{ width: 148, color: Colors.secondary.red }}
                  >
                    <Heading5>Lanjutkan</Heading5>
                  </RectangleButton>
                </Box>
              </Box>
            </div>
          ) : null}
        </div>
      </Dialog>
    </>
  );
}
