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
import TextArea from "../../../components/Atom/Input Field/TextArea";
import RadioButton from "../../../components/Atom/Selection Control/Radio";
import InputPasswordField from "../../../components/Atom/Input Field/PasswordField";
import Loader from "../../../components/Atom/Loader";
import Images from "../../../components/Atom/Image";
import Modal2 from "@mui/material/Modal";
import { useRouter } from "next/router";

export default function ModalPopupNonaktifAkun({ isOpen, onClick, state }) {
  const [showPopupCancel, setShowPopupCancel] = useState(false);

  const [isDisable, setIsDisable] = useState(true);

  //   ====================================================
  const [bar, setBar] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [valueMasukan, setValueMasukan] = useState("");
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [openModalLoading, setOpenModalLoading] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const router = useRouter();
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
            setBar(0);
            setSelectedAnswer([]);
            setValueMasukan("");
          }}
        />
      </Flex>
    );
  };

  //   =========================
  useEffect(() => {
    setPassword(state?.password);
  }, [state]);

  useEffect(() => {
    if (selectedAnswer.length !== 0 && valueMasukan.length >= 100) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [selectedAnswer, valueMasukan]);

  const options = {
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

  const handleSelectAnswer = (e, index) => {
    let answers = [...selectedAnswer];
    answers[index] = e.target.value;
    setSelectedAnswer(answers);
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
      setIsDone(true);
      setBar(0);
      setSelectedAnswer([]);
      setValueMasukan("");
      onClick();
      setOpenModalLoading(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);

      return;
    }

    if (val === "cancel") {
      onClick();
      setBar(0);
      setSelectedAnswer([]);
      setValueMasukan("");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValueMasukan(e.target.value);
  };

  const handlePassword = (value) => {
    setInputPassword(value);
    if (inputPassword !== value) {
      setIsPasswordError(false);
    }
  };
  //   ================ HANDLE ===========

  // =============================
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 792,
    height: 392,
    bgcolor: "background.paper",
    boxShadow: Elevation.modal,
    borderRadius: Radius.medium,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const ModalLoading = () => {
    return (
      <div>
        <Modal2
          open={openModalLoading}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src="/images/Principle/Illustration/success-delete-account.png" />
            <Heading2 color={Colors.neutral.greyish_brown} mt="8px" mb="4px">
              Akun berhasil dinonaktifkan
            </Heading2>
            <Body1 color={Colors.neutral.brown_grey} mb="24px">
              Terima kasih telah menggunakan layanan kami!
            </Body1>
            <Loader />
          </Box>
        </Modal2>
      </div>
    );
  };

  return (
    <>
      <ModalLoading />
      <Modal show={isOpen}>
        <BackdropContent />

        <Box m="24px" mb={isDone ? 0 : "24px"}>
          <Modal.Header>
            <Header>
              <Heading3 style={{ textTransform: "capitalize" }}>
                Nonaktif Akun
              </Heading3>
            </Header>
          </Modal.Header>

          <Modal.Body>
            <Box mb="16px">
              <Box
                padding={
                  isPasswordError ? "6px 40px 6px 40px" : "6px 40px 24px 40px"
                }
              >
                {/* MODAL MASUKKAN PENDAPAT */}
                {bar === 0 && (
                  <Box>
                    {options?.customOption?.map((item, index) => {
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
                            />
                          </Box>
                          <Box mt="30px">
                            <Body1 style={{ color: Colors.neutral.brown_grey }}>
                              Kami sangat merhargai pendapat Anda, kirim masukan
                              Anda ke karircom, agar kami bisa melayani lebih
                              baik
                            </Body1>
                          </Box>
                        </>
                      );
                    })}

                    <Box mt="20px">
                      <TextArea
                        label="Tulis Masukan Anda"
                        handleChange={handleChange}
                        inputValue={valueMasukan}
                        fullWidth={true}
                      />
                    </Box>
                  </Box>
                )}
                {/* CONFIRMATION NONAKTIF AKUN (MASUKKAN PASSWORD) */}
                {bar === 1 && (
                  <Box
                    mt="16px"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Body1 style={{ marginBottom: 20 }}>
                      Masukan Password untuk nonaktif Akun
                    </Body1>
                    <div style={{ width: 285 }}>
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
                {/* END CONFIRMATION MODAL */}
              </Box>
            </Box>
          </Modal.Body>

          <Modal.Footer>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                gap: 24,
              }}
            >
              <RectangleButton
                size="large"
                customStyle={{ width: 240 }}
                onClick={() => handleButton("cancel")}
              >
                Batal
              </RectangleButton>
              {bar === 1 ? (
                <RectangleButton
                  size="large"
                  customStyle={{ width: 240 }}
                  onClick={() => handleButton("continue")}
                  variant="text"
                  disable={!inputPassword}
                >
                  Nonaktif Akun
                </RectangleButton>
              ) : (
                <RectangleButton
                  size="large"
                  customStyle={{ width: 240 }}
                  onClick={() => handleButton("continue")}
                  variant="text"
                  disable={isDisable}
                >
                  Lanjutkan
                </RectangleButton>
              )}
            </div>
          </Modal.Footer>
        </Box>
      </Modal>
    </>
  );
}
