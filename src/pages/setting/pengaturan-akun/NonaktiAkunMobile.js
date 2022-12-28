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

const options2 = {
  customOption: [
    {
      question: "Ceritakan kepada kami alasan anda me-nonaktif-kan akun",

      answers: [
        "Saya mempunyai alasan pribadi",
        "Saya mendapatkan terlalu banyak email",
        "Saya sudah mempunyai pekerjaan tetap",
        "Lain-lain",
      ],
    },
  ],
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

export default function NonaktiAkunMobile(props) {
  const {
    showNonaktifAkun,
    handleClose,
    userData,
    setVariantToaster,
    setLabelToaster,
    setOpenToaster,
  } = props;

  const [formNonaktifAcc, setFormNonaktifAcc] = useState(false);

  const [password, setPassword] = useState("123456");
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [bar, setBar] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [valueMasukan, setValueMasukan] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [showDialogLoadingNonaktif, setShowDialogLoadingNonaktif] = useState(
    false
  );
  const [passHapusAcc, setPassHapusAcc] = useState(false);

  const handleDialogNonaktifAkun = (val) => {
    if (val === "form") {
      setFormNonaktifAcc(true);
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

  const handleButtonNonaktif = (val) => {
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
      handleNonaktifAkun();
      return;
    }

    if (val === "cancel") {
      if (bar > 0) {
        setBar((prevBar) => prevBar - 1);
        return;
      } else {
        setFormNonaktifAcc(false);
        setSelectedAnswer([]);
        setValueMasukan("");
        return;
      }
    }
  };

  const handleArrowBack = () => {
    if (bar > 0) {
      setBar((prevBar) => prevBar - 1);
      return;
    }
    if (!formNonaktifAcc) {
      handleClose();
      return;
    }
    setFormNonaktifAcc(false);
    setSelectedAnswer([]);
    setValueMasukan("");
    return;
  };

  const handleNonaktifAkun = () => {
    setShowDialogLoadingNonaktif(true);
    setTimeout(() => {
      //   router.push("/");
      setBar(0);
      setFormNonaktifAcc(false);
      handleClose();
      setShowDialogLoadingNonaktif(false);
    }, 3000);
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
      {/* MODAL SUCCESS NONAKTIF AKUN */}
      <Dialog fullScreen open={showDialogLoadingNonaktif}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            // borderBottom: "1px solid #EEEEEE",
          }}
          elevation={0}
        >
          <Toolbar style={{ background: "white" }}>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Nonaktif Akun
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div>
          <Box sx={style}>
            <img
              src="/images/Principle/Illustration/success-delete-account.png"
              alt="image-success-nonaktif-account"
            />
            <Heading4 color={Colors.neutral.greyish_brown} mt="8px" mb="4px">
              Akun berhasil dinonaktifkan
            </Heading4>
            <Body2 color={Colors.neutral.brown_grey} mb="24px">
              Terima kasih telah menggunakan layanan kami!
            </Body2>
            <Loader />
          </Box>
        </div>
      </Dialog>
      {/* END MODAL SUCCESS NONAKTIF AKUN */}

      <Dialog fullScreen open={showNonaktifAkun}>
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
                Nonaktif Akun
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "16px 16px" }}>
          {formNonaktifAcc ? (
            <Box mb="16px">
              <Box
                padding={
                  isPasswordError ? "6px 16px 6px 16px" : "6px 16px 24px 16px"
                }
              >
                {bar === 0 && (
                  <Box>
                    {options2?.customOption?.map((item, index) => {
                      return (
                        <>
                          <Box mb="24px">
                            <Heading4
                              style={{ color: Colors.neutral.greyish_brown }}
                            >
                              {item?.question}
                            </Heading4>
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
                          <Box mt="30px">
                            <Body3 style={{ color: Colors.neutral.brown_grey }}>
                              Kami sangat merhargai pendapat Anda, kirim masukan
                              Anda ke karircom, agar kami bisa melayani lebih
                              baik
                            </Body3>
                          </Box>
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
                )}

                {bar === 1 && (
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
                      Masukan Password untuk nonaktif akun
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
                )}

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
                    onClick={() => handleButtonNonaktif("cancel")}
                  >
                    <Heading5>Batal</Heading5>
                  </RectangleButton>
                  {bar === 1 ? (
                    <RectangleButton
                      // size="large"
                      customStyle={{ width: "100%" }}
                      onClick={() => handleButtonNonaktif("continue")}
                      variant="text"
                      disable={!inputPassword}
                    >
                      <Heading5>Nonaktif Akun</Heading5>
                    </RectangleButton>
                  ) : (
                    <RectangleButton
                      // size="large"
                      customStyle={{ width: "100%" }}
                      onClick={() => handleButtonNonaktif("continue")}
                      variant="text"
                      disable={isDisable}
                    >
                      <Heading5>Nonaktif Akun</Heading5>
                    </RectangleButton>
                  )}
                </div>
              </Box>
            </Box>
          ) : (
            <div>
              <div>
                <Box style={{ width: "100%", fontSize: "12px" }}>
                  Akun Anda akan hilang untuk sementara dan Anda dapat
                  mengaktifikan kembali akun anda saat anda kembali login.
                </Box>

                <div style={{ marginTop: 24, marginLeft: -4 }}>
                  <RectangleButton
                    // size="large"
                    customStyle={{ width: "100%" }}
                    variant="ghost"
                    onClick={() => handleDialogNonaktifAkun("form")}
                  >
                    Nonaktif Akun
                  </RectangleButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}
